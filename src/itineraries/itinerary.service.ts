import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Itinerary } from './itinerary.entity';
import { User } from '../users/user.entity';
import * as crypto from 'crypto';

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
    return await this.findOne(inserted.identifiers[0].id);
  }

  async updateOne(id: number, title: string): Promise<Itinerary> {
    const itinerary = await this.findOne(id);
    if (itinerary) {
      itinerary.title = title;
      this.repository.save(itinerary);
    }
    return itinerary;
  }

  async deleteOne(id: number): Promise<Itinerary> {
    const itinerary: Itinerary = await this.findOne(id);
    if (itinerary) {
      this.repository.remove(itinerary);
    }
    return itinerary;
  }

  private generateEditToken(): string {
    const tokenStringLength = 140;
    const bytes = tokenStringLength / 2;
    return crypto.randomBytes(bytes).toString('hex');
  }
}
