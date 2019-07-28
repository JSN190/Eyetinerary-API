import { Injectable } from '@nestjs/common';
import { ItineraryService } from '../itineraries/itinerary.service';
import { Itinerary } from '../itineraries/itinerary.entity';
import Axios from 'axios';

@Injectable()
export class SearchService {
  constructor(private itineraryService: ItineraryService) {}

  async search(name?: string): Promise<Itinerary[]> {
    const criteria = [];
    if (name) {
      const words = name.split(' ');
      words.forEach(word => criteria.push(this.nameWildcard(word)));
    }
    try {
      const result = await Axios.get(
        `${process.env.EYET_ELASTIC}/itinerary/_search`,
        {
          data: {
            query: {
              bool: {
                should: criteria,
              },
            },
            sort: [
              {
                _score: {
                  order: 'desc',
                },
              },
              {
                updated: {
                  order: 'desc',
                },
              },
              {
                created: {
                  order: 'desc',
                },
              },
            ],
          },
        },
      );
      if (result.data.hits.total.value > 0) {
        const itineraries = [];
        const hits = result.data.hits.hits as Array<{
          _id: string;
          _score: number;
        }>;
        for (const hit of hits) {
          const itinerary = await this.itineraryService.findOne(
            Number(hit._id),
          );
          if (itinerary) {
            itineraries.push({
              _score: hit._score,
              ...itinerary,
            });
          }
        }
        return itineraries;
      }
    } catch (e) {
      console.error('Failed to query Elasticsearch.');
    }
    return null;
  }

  private nameWildcard(name: string) {
    return [
      {
        wildcard: {
          name: {
            value: `${name}`,
            boost: 4,
          },
        },
      },
      {
        wildcard: {
          name: {
            value: `${name}*`,
            boost: 3,
          },
        },
      },
      {
        wildcard: {
          name: {
            value: `*${name}`,
            boost: 2,
          },
        },
      },
      {
        wildcard: {
          name: {
            value: `*${name}*`,
            boost: 1,
          },
        },
      },
    ];
  }
}
