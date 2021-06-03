## Description


[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Database init

- create database
- run application with next environment variables

| ENV variable   |Description      | Default Value |
|----------------|-----------------|:-------------:|
| DB_PG_HOST     | Postgre host    |               |
| DB_PG_PORT     | Postgre port    |               |
| DB_PG_DATABASE | Posgre database |               |
| DB_PG_USER     | Posgre user     |               |   
| DB_PG_PASSWORD | Posgre password |               |
| PORT           | Server port     | 3000          |

## Database migration

To create new migration:
```shell
NODE_ENV=development npm run typeorm:migration:create <migration name>
```

To run migrations:
```shell
NODE_ENV=development npm run typeorm:migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
