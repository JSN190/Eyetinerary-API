import { config } from 'dotenv';
import { createConnection } from 'typeorm';
import DatabaseConfig from '../db.config';
import { Itinerary } from '../itineraries/itinerary.entity';
import Axios from 'axios';
config();

async function run() {
  const connection = await createConnection(DatabaseConfig);
  const repo = connection.getRepository(Itinerary);

  let done = 0;
  let offset = 0;
  let buffer: Itinerary[] = [];

  do {
    buffer = await repo.find({
      order: {
        created: 'ASC',
      },
      skip: offset,
      take: 1000,
    });

    for (const itinerary of buffer) {
      try {
        console.log(`Copying itinerary ${itinerary.id} to Elasticsearch...`);
        await Axios.put(
          `${process.env.EYET_ELASTIC}/itinerary/_doc/${itinerary.id}`,
          {
            id: itinerary.id,
            name: itinerary.title,
            created: itinerary.created,
            updated: itinerary.updated,
          },
        );
        done++;
      } catch (e) {
        console.error(e);
      } finally {
        offset++;
      }
    }
  } while (buffer.length >= 1000);
  console.log(`${done} of ${offset} items copied to Elasticsearch.`);
  console.log('Script terminated.');
}

run();
