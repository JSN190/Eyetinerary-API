import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { pageProviders } from './page.providers';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { ItineraryModule } from '../itineraries/itinerary.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [DatabaseModule, ItineraryModule],
    providers: [
        ...pageProviders,
        PageService,
    ],
    exports: [
        ...pageProviders,
        PageService,
    ],
    controllers: [ PageController ],
})

export class PageModule {}
