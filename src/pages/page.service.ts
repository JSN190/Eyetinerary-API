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
        return await this.repository
        .createQueryBuilder('page')
        .addSelect(['itinerary.id', 'owner.id'])
        .leftJoin('page.itinerary', 'itinerary')
        .leftJoin('itinerary.owner', 'owner')
        .where('page.id = :pageId', { pageId: id })
        .getOne();
    }

    async createNew(title: string, itinerary: Itinerary): Promise<Page> {
        const inserted = await this.repository
        .createQueryBuilder()
        .insert()
        .values({ title, itinerary })
        .execute();
        return await this.findOne(inserted.identifiers[0].id);
    }

    async updateOne(id: number, title: string): Promise<Page> {
        const page: Page = await this.findOne(id);
        if (page) {
            page.title = title;
            this.repository.save(page);
        }
        return page;
    }

    async deleteOne(id: number): Promise<Page> {
        const page: Page = await this.findOne(id);
        if (page) {
            this.repository.remove(page);
        }
        return page;
    }
}
