import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          validationSchema: Joi.object({
              NODE_ENV: Joi.string()
                  .valid('development', 'production')
                  .default('development'),
              PORT: Joi.number().default(3000),
              DB_PG_HOST: Joi.string().required(),
              DB_PG_PORT: Joi.string().required(),
              DB_PG_USER: Joi.string().required(),
              DB_PG_PASSWORD: Joi.string().required(),
              DB_PG_DATABASE: Joi.string().required()
          }),
          validationOptions: {
              abortEarly: true
          }
      }),
      DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
