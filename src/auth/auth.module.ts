import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        JwtModule.register({
          secretOrPrivateKey: 'changeToEnv',
          signOptions: {
            expiresIn: 259200,
          },
        }),
        UserModule,
    ],
    providers: [
        AuthService,
    ],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
