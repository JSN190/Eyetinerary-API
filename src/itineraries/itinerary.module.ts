import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { itineraryProviders } from './itinerary.providers';
import { ItineraryService } from './itinerary.service';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...itineraryProviders,
        ItineraryService,
    ],
})

export class ItineraryModule {}
