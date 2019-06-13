import { Controller, Get, Param, Post, Body, NotFoundException, Delete, Req, UnauthorizedException } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { Itinerary } from './itinerary.entity';
import { CreateItineraryDto } from './dto/createItineraryDto.dto';
import { User } from '../users/user.entity';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';

@Controller('itinerary')
export class ItineraryController {
    constructor(
        private readonly itineraryService: ItineraryService,
        private readonly authService: AuthService,
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
    async createItinerary(@Body() body: CreateItineraryDto, @Req() req: Request) {
        const user: User = req.token ? await this.authService.authenticateByJwt(req.token) : null;
        if (!user && req.token) {
            throw new UnauthorizedException(`Token Invalid`, 'Token Invalid');
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
