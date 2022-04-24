import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { validate } from './env.validation';
import { KeyModule } from './key/key.module';
import { LanguageModule } from './language/language.module';
import { ProjectModule } from './project/project.module';
import { RoleModule } from './role/role.module';
import { TranslationModule } from './translation/translation.module';
import { User } from './user/User';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], validate }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User],
      synchronize: true,
    }),
    ConfigModule,
    UserModule,
    RoleModule,
    ProjectModule,
    TranslationModule,
    LanguageModule,
    KeyModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
