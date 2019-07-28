import { SearchService } from './search.service';
import { Module } from '@nestjs/common';
import { ItineraryModule } from '../itineraries/itinerary.module';
import { SearchController } from './seach.controller';
import { ItineraryService } from '../itineraries/itinerary.service';

@Module({
  imports: [ItineraryModule],
  providers: [ItineraryService, SearchService],
  controllers: [SearchController],
  exports: [SearchService],
})
export class SearchModule {}
