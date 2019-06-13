import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Page } from './page.entity';
import { Itinerary } from '../itineraries/itinerary.entity';

@Injectable()
export class PageService {
    constructor(
        @Inject('PAGE_REPOSITORY') private readonly repository: Repository<Page>,
    ) {}

    async findOne(id: number): Promise<Page> {
        return await this.repository.findOne({ id }, { relations: ['items'] });
    }

    async createNew(title: string, itinerary: Itinerary): Promise<number> {
        const inserted = await this.repository
        .createQueryBuilder()
        .insert()
        .values({ title, itinerary })
        .execute();
        return inserted.identifiers[0].id;
    }

    async deleteOne(id: number): Promise<Page> {
        const page: Page = await this.findOne(id);
        if (page) {
            this.repository.remove(page);
        }
        return page;
    }
}
