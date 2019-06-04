import { Controller, Get, Param, NotFoundException, Post, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RegisterUserDto } from './dto/registerUserDto.dto';
import { Itinerary } from '../itineraries/itinerary.entity';
import { DeleteUserDto } from '../users/dto/deleteUserDto.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get(':id')
    async getUser(@Param() params) {
        const user: User = await this.userService.findOne(params.id);
        if (user) {
            return {
                success: true,
                ...user,
            };
        } else {
            throw new NotFoundException(`User ${params.id} not found`, 'Not Found');
        }
    }

    @Post()
    async registerUser(@Body() body: RegisterUserDto) {
        const id: number = await this.userService.createNew(body.username, body.password,
            body.email, body.location, body.countryCode);
        const user: User = await this.userService.findOne(id);
        return {
            success: true,
            ...user,
        };
    }

    @Delete(':id')
    async deleteUser(@Param() params, @Body() body: DeleteUserDto) {
        const deleted: User = body.deleteItineraries
        ? await this.userService.deleteOneWithItineraries(params.id)
        : await this.userService.deleteOne(params.id);
        if (deleted) {
            return {
                success: true,
                deleted: deleted.id,
            };
        } else {
            throw new NotFoundException(`User ${params.id} not found`, 'Not Found');
        }
    }

    @Get(':id/itineraries')
    async getItineraries(@Param() params) {
        const itineraries: Itinerary[] = await this.userService.getItineraries(params.id);
        if (itineraries) {
            return {
                success: true,
                itineraries: itineraries.length >= 1 ? itineraries : [],
            };
        } else {
            throw new NotFoundException(`User ${params.id} not found`, 'Not Found');
        }
    }
}
