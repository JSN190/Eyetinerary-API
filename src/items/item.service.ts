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
        .addSelect(['page.id', 'itinerary.id', 'itinerary.ownerId'])
        .leftJoin('item.page', 'page')
        .leftJoin('page.itinerary', 'itinerary')
        .where('item.id = :itemId', { itemId: id })
        .getOne();
    }

    async createNew(title: string, body: string, page: Page, timeStart: Date, timeEnd?: Date)
    : Promise<number> {
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
        return inserted.identifiers[0].id;
    }

    async deleteOne(id: number): Promise<Item> {
        const item: Item = await this.findOne(id);
        if (item) {
            await this.repository.remove(item);
        }
        return item;
    }
}
