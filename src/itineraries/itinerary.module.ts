import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { itineraryProviders } from './itinerary.providers';
import { ItineraryService } from './itinerary.service';
import { ItineraryController } from './itinerary.controller';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...itineraryProviders,
        ItineraryService,
    ],
    controllers: [ ItineraryController ],
})

export class ItineraryModule {}
