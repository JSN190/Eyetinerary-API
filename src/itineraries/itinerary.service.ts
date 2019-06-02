import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Itinerary } from './itinerary.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ItineraryService {
    constructor(
        @Inject('ITINERARY_REPOSITORY') private readonly repository: Repository<Itinerary>,
    ) {}

    async findOne(id: number): Promise<Itinerary> {
        return await this.repository.findOneOrFail(id);
    }

    async createNew(title: string, owner?: User) {
        const inserted = await this.repository
        .createQueryBuilder()
        .insert()
        .values({ title, editToken: 'test', owner })
        .execute();
        return inserted.generatedMaps[0];
    }
}
