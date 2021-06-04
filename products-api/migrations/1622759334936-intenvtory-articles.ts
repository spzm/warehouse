import {MigrationInterface, QueryRunner} from "typeorm";

export class intenvtoryArticles1622759334936 implements MigrationInterface {
    name = 'intenvtoryArticles1622759334936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "article" ("id" integer NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("art_id" integer NOT NULL, "stock" integer NOT NULL, CONSTRAINT "REL_98a30c8378e4a443bbdcccffd9" UNIQUE ("art_id"), CONSTRAINT "PK_98a30c8378e4a443bbdcccffd96" PRIMARY KEY ("art_id"))`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_98a30c8378e4a443bbdcccffd96" FOREIGN KEY ("art_id") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_98a30c8378e4a443bbdcccffd96"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "article"`);
    }

}
