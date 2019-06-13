import { Controller, Get, Param, Body, NotFoundException, BadRequestException, Post, Delete, UnauthorizedException, Req } from '@nestjs/common';
import { PageService } from './page.service';
import { Page } from './page.entity';
import { ItineraryService } from '../itineraries/itinerary.service';
import { Itinerary } from '../itineraries/itinerary.entity';
import { CreatePageDto } from './dto/createPage.dto';
import { IntineraryAuth } from '../itineraries/itinerary.auth';
import { DeletePageDto } from './dto/deletePageDto.dto';

@Controller('page')
export class PageController {
    constructor(
        private readonly pageService: PageService,
        private readonly itineraryService: ItineraryService,
        private readonly itineraryAuth: IntineraryAuth,
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
            throw new NotFoundException(`Page ${params.id} not found`, 'Page Not Found');
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

    @Delete(':id')
    async deletePage(@Param() params, @Body() body: DeletePageDto, @Req() req) {
        const page: Page = await this.pageService.findOne(params.id);
        if (!page) {
            throw new NotFoundException(`Page ${params.id} not found`, 'Page Not Found');
        }

        if (body.editToken) {
            await this.itineraryAuth.verifyEditToken(body.editToken, page.itinerary);
        } else if (req.token) {
            await this.itineraryAuth.verifyOwnership(req.token, page.itinerary);
        } else {
            throw new UnauthorizedException('No Token Supplied', 'No Token Supplied');
        }

        const deleted = await this.pageService.deleteOne(params.id);
        return {
            success: true,
            deleted,
        };
    }
}
