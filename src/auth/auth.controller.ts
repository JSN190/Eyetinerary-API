import { Body, Controller, HttpCode, Post, Res, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginDto) {
    const user: User = await this.authService.authenticateByPassword(
      body.username.toLowerCase(),
      body.password,
    );
    if (user) {
      return {
        success: true,
        user: {
          id: user.id,
          username: user.username,
        },
        token: await this.authService.grantJwtToken(user.id),
      };
    } else {
      throw new UnauthorizedException('Invalid Login', 'Invalid Login');
    }
  }
}
