import { Controller, Get, Param, HttpException, HttpStatus, Post, Body } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { ItineraryService } from './itinerary.service';
import { Itinerary } from './itinerary.entity';
import { CreateItineraryDto } from './dto/createItineraryDto.dto';

@Controller('itinerary')
export class ItineraryController {
    constructor(private readonly itineraryService: ItineraryService) {}

    @Get(':id')
    async getItinerary(@Param() params) {
        try {
            const item: Itinerary = await this.itineraryService.findOne(params.id);
            return {
                success: true,
                ...item,
            };
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new HttpException('Itinerary Not Found',
                HttpStatus.NOT_FOUND);
            } else {
                throw new HttpException('Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    // TODO: complete implementation and test
    // TODO: validation
    @Post()
    async createItinerary(@Body() body: CreateItineraryDto) {
        try {
            // TODO: get user entity by user id
            const insert = await this.itineraryService.createNew(body.title, body.owner);
            return {
                success: true,
                id: insert.id,
            };
        } catch (e) {
            throw new HttpException('Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
