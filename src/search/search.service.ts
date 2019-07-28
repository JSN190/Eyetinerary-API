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
            track_scores: true,
            query: {
              bool: {
                should: criteria,
              },
            },
            sort: [
              {
                _script: {
                  // Note: Ensure that fieldata is enabled on Elasticsearch
                  script: 'doc[\'name\'].value.length()',
                  type: 'number',
                  order: 'asc',
                },
              },
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
            const nameDiffPenalty = name
              ? itinerary.title.length > name.length
                ? itinerary.title.length - name.length
                : name.length > itinerary.title.length
                ? name.length - itinerary.title.length
                : 1
              : 1;
            itineraries.push({
              ...itinerary,
              _relevance: hit._score / nameDiffPenalty,
            });
          }
        }

        return itineraries;
      }
    } catch (e) {
      console.log(e.response.data.error.failed_shards[0].reason);
      console.error('Failed to query Elasticsearch.');
    }
    return null;
  }

  private nameWildcard(name: string) {
    const boostFactor = 3;
    return [
      {
        wildcard: {
          name: {
            value: `${name}`,
            boost: 4 * boostFactor,
          },
        },
      },
      {
        wildcard: {
          name: {
            value: `${name}*`,
            boost: 3 * boostFactor,
          },
        },
      },
      {
        wildcard: {
          name: {
            value: `*${name}`,
            boost: 2 * boostFactor,
          },
        },
      },
      {
        wildcard: {
          name: {
            value: `*${name}*`,
            boost: 1 + boostFactor,
          },
        },
      },
    ];
  }
}
