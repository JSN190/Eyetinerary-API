import { Controller, Get, Param, Body, NotFoundException, BadRequestException, Post } from '@nestjs/common';
import { PageService } from './page.service';
import { Page } from './page.entity';
import { ItineraryService } from '../itineraries/itinerary.service';
import { Itinerary } from '../itineraries/itinerary.entity';
import { CreatePageDto } from './dto/createPage.dto';

@Controller('page')
export class PageController {
    constructor(
        private readonly pageService: PageService,
        private readonly itineraryService: ItineraryService,
    ) {}

    @Get(':id')
    async getPage(@Param() params) {
        const page: Page = await this.pageService.findOne(params.id);
        if (page) {
            return {
                success: true,
                ...page,
            };
        } else {
            throw new NotFoundException(`Page ${params.id} not found`, 'Not Found');
        }
    }

    @Post()
    async createPage(@Body() body: CreatePageDto) {
        const itinerary: Itinerary = await this.itineraryService.findOne(body.itinerary);
        if (itinerary) {
            const id: number = await this.pageService.createNew(body.title, itinerary);
            const page: Page = await this.pageService.findOne(id);
            return {
                success: true,
                ...page,
            };
        } else {
            throw new BadRequestException(`Itinerary ${body.itinerary} not found`,
            'Itinerary Not Found');
        }
    }
}
