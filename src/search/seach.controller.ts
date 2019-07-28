import {
  Controller,
  Get,
  Param,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  async searchItinerary(@Query() query) {
    if (query.name) {
      const itineraries = await this.searchService.search(query.name);
      return {
        success: true,
        matches: itineraries,
      };
    }
    throw new BadRequestException('Name parameter missing', 'Name Missing');
  }
}
