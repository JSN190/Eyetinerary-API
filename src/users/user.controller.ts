import { Controller, Get, Param, NotFoundException, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RegisterUserDto } from './dto/registerUserDto.dto';

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
}
