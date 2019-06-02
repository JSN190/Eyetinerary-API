import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { itineraryProviders } from './itinerary.providers';
import { ItineraryService } from './itinerary.service';
import { ItineraryController } from './itinerary.controller';
import { UserModule } from '../users/user.module';

@Module({
    imports: [DatabaseModule, UserModule],
    providers: [
        ...itineraryProviders,
        ItineraryService,
    ],
    exports: [
        ...itineraryProviders,
        ItineraryService,
    ],
    controllers: [ ItineraryController ],
})

export class ItineraryModule {}
