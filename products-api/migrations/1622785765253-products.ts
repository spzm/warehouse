import {MigrationInterface, QueryRunner} from "typeorm";

export class products1622785765253 implements MigrationInterface {
    name = 'products1622785765253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_articles" ("product_id" integer NOT NULL, "art_id" integer NOT NULL, "amount_of" integer NOT NULL, CONSTRAINT "PK_1fb3e7f6f5095a5630980713b03" PRIMARY KEY ("product_id", "art_id"))`);
        await queryRunner.query(`ALTER TABLE "product_articles" ADD CONSTRAINT "FK_bed82896640aa8473fa98cb2d57" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_articles" ADD CONSTRAINT "FK_cf5c730b2a56408d19e0c89f138" FOREIGN KEY ("art_id") REFERENCES "inventory"("art_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_articles" DROP CONSTRAINT "FK_cf5c730b2a56408d19e0c89f138"`);
        await queryRunner.query(`ALTER TABLE "product_articles" DROP CONSTRAINT "FK_bed82896640aa8473fa98cb2d57"`);
        await queryRunner.query(`DROP TABLE "product_articles"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
