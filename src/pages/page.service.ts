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
        return await this.repository.findOne({ id });
    }

    async createNew(title: string, itinerary: Itinerary) {
        const inserted = await this.repository
        .createQueryBuilder()
        .insert()
        .values({ title, itinerary })
        .execute();
        return inserted.identifiers[0].id;
    }
}
