import {MigrationInterface, QueryRunner} from "typeorm";

export class intenvtoryArticles1622680679105 implements MigrationInterface {
    name = 'intenvtoryArticles1622680679105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "name" character varying(300) NOT NULL, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("id" SERIAL NOT NULL, "stock" integer NOT NULL, "articleId" integer, CONSTRAINT "REL_f252dab5fff9c31d3febaf1ec0" UNIQUE ("articleId"), CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_f252dab5fff9c31d3febaf1ec08" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_f252dab5fff9c31d3febaf1ec08"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
