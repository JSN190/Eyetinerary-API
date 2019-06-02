import { Controller, Get, Param, HttpException, HttpStatus, Post, Body, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { ItineraryService } from './itinerary.service';
import { Itinerary } from './itinerary.entity';
import { CreateItineraryDto } from './dto/createItineraryDto.dto';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';

@Controller('itinerary')
export class ItineraryController {
    constructor(
        private readonly itineraryService: ItineraryService,
        private readonly userService: UserService,
    ) {}

    @Get(':id')
    async getItinerary(@Param() params) {
       const item: Itinerary = await this.itineraryService.findOne(params.id);
       if (!item) {
            throw new NotFoundException(`Itinerary ${params.id} not found`, 'Not Found');
       } else {
            return {
               success: true,
               ...item,
           };
       }
    }

    // TODO: complete implementation and test
    // TODO: validation
    @Post()
    async createItinerary(@Body() body: CreateItineraryDto) {
        const user: User = null; // TODO: get user based on token
        const id: number = await this.itineraryService.createNew(body.title, user);
        const itinerary: Itinerary = await this.itineraryService.findOne(id);
        return {
            success: true,
            ...itinerary,
        };
    }
}
