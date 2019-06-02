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
        return await this.repository.findOne({ id });
    }

    async createNew(title: string, body: string, page: Page, timeStart: Date, timeEnd?: Date) {
        const inserted = await this.repository
        .createQueryBuilder()
        .insert()
        .values({
            title,
            body,
            page,
            timeStart: timeStart.valueOf(),
            timeEnd: timeEnd ? timeEnd.valueOf() : null,
         })
        .execute();
        return inserted.identifiers[0].id;
    }
}
