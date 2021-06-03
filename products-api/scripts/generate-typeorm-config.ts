import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.development'});

export default {
    type: 'postgres',
    host: process.env['DB_PG_HOST'],
    port: process.env['DB_PG_PORT'],
    username: process.env['DB_PG_USER'],
    password: process.env['DB_PG_PASSWORD'],
    database: process.env['DB_PG_DATABASE'],
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
    migrationsTableName: 'migration',
    migrations: ['migrations/*.ts'],
    cli: {
        migrationsDir: 'migrations'
    },
    synchronize: true
};