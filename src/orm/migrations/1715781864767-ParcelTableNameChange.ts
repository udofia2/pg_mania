import { MigrationInterface, QueryRunner } from "typeorm";

export class ParcelTableNameChange1715781864767 implements MigrationInterface {
    name = 'ParcelTableNameChange1715781864767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "parcels" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "status" character varying NOT NULL DEFAULT 'pending', "pickup_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, CONSTRAINT "PK_47847f79fee8a3926f2b3022a96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "parcels" ADD CONSTRAINT "FK_186944b91290956ec57ef0a9c70" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parcels" DROP CONSTRAINT "FK_186944b91290956ec57ef0a9c70"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(40)`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying(40)`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(100) NOT NULL`);
        await queryRunner.query(`DROP TABLE "parcels"`);
    }

}
