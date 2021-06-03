import { Module } from '@nestjs/common';
import { TypeOrmModule} from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_PG_HOST'),
                port: configService.get('DB_PG_PORT'),
                username: configService.get('DB_PG_USER'),
                password: configService.get('DB_PG_PASSWORD'),
                database: configService.get('DB_PG_DATABASE'),
                entities: [ `${__dirname}/../**/*.entity.{js,ts}` ],
                migrationsTableName: 'migration',
                migrations: ['migrations/*.js'],
                cli: {
                    migrationsDir: 'migrations'
                }
            })
        })
    ]
})
export class DatabaseModule {}
