import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExcludePassword1715785559793 implements MigrationInterface {
  name = 'ExcludePassword1715785559793';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Temporarily allow NULL values for the email column
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`);

    // Add the email constraint
    await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);

    // Update existing records to set a default value for the email column if necessary
    // Example: await queryRunner.query(`UPDATE "users" SET "email" = 'default@example.com' WHERE "email" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the email constraint
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);

    // If necessary, revert the changes made in the up method
    // Example: await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`);
  }
}
