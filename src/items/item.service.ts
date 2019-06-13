import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { Page } from '../pages/page.entity';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_REPOSITORY') private readonly repository: Repository<Item>,
  ) {}

  async findOne(id: number): Promise<Item> {
    return await this.repository
      .createQueryBuilder('item')
      .addSelect(['page.id', 'itinerary.id', 'owner.id'])
      .leftJoin('item.page', 'page')
      .leftJoin('page.itinerary', 'itinerary')
      .leftJoin('itinerary.owner', 'owner')
      .where('item.id = :itemId', { itemId: id })
      .getOne();
  }

  async createNew(
    title: string,
    body: string,
    page: Page,
    timeStart: Date,
    timeEnd?: Date,
  ): Promise<Item> {
    const inserted = await this.repository
      .createQueryBuilder()
      .insert()
      .values({
        title,
        body,
        page,
        timeStart,
        timeEnd,
      })
      .execute();
    return await this.findOne(inserted.identifiers[0].id);
  }

  async updateOne(id: number, payload: { title?: string; body?: string }) {
    const item: Item = await this.findOne(id);
    if (item) {
      if (payload.title) {
        item.title = payload.title;
      }
      if (payload.body) {
        item.body = payload.body;
      }
      this.repository.save(item);
    }
    return item;
  }

  async deleteOne(id: number): Promise<Item> {
    const item: Item = await this.findOne(id);
    if (item) {
      await this.repository.remove(item);
    }
    return item;
  }
}
