import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/User';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStategy,
    ConfigService,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn'),
        },
        secret: configService.get('jwt.secret'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
