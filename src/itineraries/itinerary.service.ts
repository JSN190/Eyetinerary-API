import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Itinerary } from './itinerary.entity';
import { User } from '../users/user.entity';
import * as crypto from 'crypto';
import Axios from 'axios';

@Injectable()
export class ItineraryService {
  constructor(
    @Inject('ITINERARY_REPOSITORY')
    private readonly repository: Repository<Itinerary>,
  ) {}

  async findOne(id: number): Promise<Itinerary> {
    return await this.repository
      .createQueryBuilder('itinerary')
      .addSelect('owner.id')
      .leftJoin('itinerary.owner', 'owner')
      .where('itinerary.id = :itineraryId', { itineraryId: id })
      .leftJoinAndSelect('itinerary.pages', 'page')
      .leftJoinAndSelect('page.items', 'item')
      .getOne();
  }

  async getEditToken(id: number): Promise<string> {
    const queryResult: Itinerary = await this.repository.findOne({
      select: ['editToken'],
      where: { id },
    });
    return queryResult.editToken;
  }

  async createNew(title: string, owner?: User): Promise<Itinerary> {
    const inserted = await this.repository
      .createQueryBuilder()
      .insert()
      .values({ title, editToken: this.generateEditToken(), owner })
      .execute();
    const itinerary = await this.findOne(inserted.identifiers[0].id);
    this.pushToElasticsearch(itinerary);
    return itinerary;
  }

  async updateOne(id: number, title: string): Promise<Itinerary> {
    const itinerary = await this.findOne(id);
    if (itinerary) {
      itinerary.title = title;
      this.repository.save(itinerary);
    }
    this.pushToElasticsearch(itinerary);
    return itinerary;
  }

  async deleteOne(id: number): Promise<Itinerary> {
    const itinerary: Itinerary = await this.findOne(id);
    if (itinerary) {
      this.repository.remove(itinerary);
    }
    this.removeFromElasticSearch(id);
    return itinerary;
  }

  private generateEditToken(): string {
    // TODO: Stronger token
    const tokenStringLength = 140;
    const bytes = tokenStringLength / 2;
    return crypto.randomBytes(bytes).toString('hex');
  }

  private async pushToElasticsearch(itinerary: Itinerary) {
    try {
      if (process.env.EYET_ELASTIC) {
        await Axios.put(
          `${process.env.EYET_ELASTIC}/itinerary/_doc/${itinerary.id}`,
          {
            id: itinerary.id,
            name: itinerary.title,
            created: itinerary.created,
            updated: itinerary.updated,
          },
        );
      }
    } catch (e) {
      console.error('ERROR: Failed to push to Elasticsearch cluster.');
      if (e.response) {
        console.log(e.response);
      } else {
        console.log(e);
      }
    }
  }

  private async removeFromElasticSearch(id: number) {
    try {
      if (process.env.EYET_ELASTIC) {
        await Axios.delete(`${process.env.EYET_ELASTIC}/itinerary/_doc/${id}`);
      }
    } catch (e) {
      console.error('ERROR: Failed to remove from Elasticsearch cluster.');
      if (e.response) {
        console.log(e.response);
      } else {
        console.log(e);
      }
    }
  }
}
