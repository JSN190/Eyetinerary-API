import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        JwtModule.registerAsync({
          useFactory: async () => ({
              secret: process.env.EYET_JWTSECRET,
              signOptions: {
                expiresIn: '3d',
              },
          }),
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
