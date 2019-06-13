import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { User } from '../users/user.entity';
import { JwtPayloadDto } from './dto/JwtPayloadDto.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async authenticateByPassword(username: string, password: string): Promise<User> {
        const user: User = await this.userService.findOneByUsername(username);
        if (user) {
            const hash = await this.userService.getHashedPassword(user.id);
            const passwordMatch = await bcrypt.compare(password, hash);
            if (passwordMatch) {
                return user;
            }
        }
        return null;
    }

    async authenticateByJwtPayload(payload: JwtPayloadDto): Promise<User> {
        return await this.userService.findOne(payload.id);
    }

    async grantJwtToken(id: number): Promise<string> {
        const payload: JwtPayloadDto = { id };
        return await this.jwtService.signAsync(payload);
    }
}
