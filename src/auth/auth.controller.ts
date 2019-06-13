import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { LoginDto } from './dto/loginDto.dto';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('login')
    async login(@Body() body: LoginDto) {
        const user: User = await this.authService.authenticateByPassword(body.username,
            body.password);
        if (user) {
            return {
                success: true,
                token: await this.authService.grantJwtToken(user.id),
            };
        } else {
            throw new UnauthorizedException('Invalid Login', 'Invalid Login');
        }
    }
}
