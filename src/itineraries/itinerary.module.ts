import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { itineraryProviders } from './itinerary.providers';
import { ItineraryService } from './itinerary.service';
import { ItineraryController } from './itinerary.controller';
import { UserModule } from '../users/user.module';
import { AuthModule } from '../auth/auth.module';
import { IntineraryAuth } from './itinerary.auth';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  providers: [...itineraryProviders, ItineraryService, IntineraryAuth],
  exports: [...itineraryProviders, ItineraryService, IntineraryAuth],
  controllers: [ItineraryController],
})
export class ItineraryModule {}
