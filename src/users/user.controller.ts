import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

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
}
