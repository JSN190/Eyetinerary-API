import { Controller, Get, Param, Post, Body, NotFoundException, Delete } from '@nestjs/common';
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
       if (item) {
            return {
                success: true,
                ...item,
            };
       } else {
           throw new NotFoundException(`Itinerary ${params.id} not found`, 'Itinerary Not Found');
       }
    }

    // TODO: complete implementation and test
    // TODO: validation
    @Post()
    async createItinerary(@Body() body: CreateItineraryDto) {
        const user: User = body.owner ? await this.userService.findOne(body.owner) : null;
        if (!user && body.owner) {
            throw new NotFoundException(`User ${body.owner} not found`, 'User Not Found');
        }
        const id: number = await this.itineraryService.createNew(body.title, user);
        const itinerary: Itinerary = await this.itineraryService.findOne(id);
        return {
            success: true,
            ...itinerary,
        };
    }

    @Delete(':id')
    async deleteItinerary(@Param() params) {
        const deleted: Itinerary = await this.itineraryService.deleteOne(params.id);
        if (deleted) {
            return {
                success: true,
                deleted,
            };
        } else {
            throw new NotFoundException(`Itinerary ${params.id} not found`, 'Itinerary Not Found');
        }
    }
}
