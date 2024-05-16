import { MigrationInterface, QueryRunner } from "typeorm";

export class Standard1715786901504 implements MigrationInterface {
    name = 'Standard1715786901504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'STANDARD'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'ADMINISTRATOR'`);
    }

}
