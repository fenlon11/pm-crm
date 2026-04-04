import { MigrationInterface, QueryRunner } from 'typeorm';

// Fix object icons to match Persistent Recruiter design spec:
// - candidate: IconUser → IconUserSearch
// - company: IconBuildingSkyscraper → IconBuilding
// - video: IconVideo → IconVideoPlus
//
// Deactivate empty duplicate objects:
// - person (id 3bf04756): replaced by candidate, 0 records
// - job (id 99dbc17c): legacy duplicate, 0 records; opportunity (id 73cdb739) is the active job object
export class FixObjectIconsAndDeactivateDuplicates1774500000000
  implements MigrationInterface
{
  name = 'FixObjectIconsAndDeactivateDuplicates1774500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "core"."objectMetadata" SET "icon" = 'IconUserSearch' WHERE "nameSingular" = 'candidate'`,
    );
    await queryRunner.query(
      `UPDATE "core"."objectMetadata" SET "icon" = 'IconBuilding' WHERE "nameSingular" = 'company'`,
    );
    await queryRunner.query(
      `UPDATE "core"."objectMetadata" SET "icon" = 'IconVideoPlus' WHERE "nameSingular" = 'video'`,
    );
    await queryRunner.query(
      `UPDATE "core"."objectMetadata" SET "isActive" = false WHERE "id" = '3bf04756-b368-4189-ac21-11a9f625e9d5'`,
    );
    await queryRunner.query(
      `UPDATE "core"."objectMetadata" SET "isActive" = false WHERE "id" = '99dbc17c-4d69-4d2e-b97b-6c310a3d25e2'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "core"."objectMetadata" SET "icon" = 'IconUser' WHERE "nameSingular" = 'candidate'`,
    );
    await queryRunner.query(
      `UPDATE "core"."objectMetadata" SET "icon" = 'IconBuildingSkyscraper' WHERE "nameSingular" = 'company'`,
    );
    await queryRunner.query(
      `UPDATE "core"."objectMetadata" SET "icon" = 'IconVideo' WHERE "nameSingular" = 'video'`,
    );
    await queryRunner.query(
      `UPDATE "core"."objectMetadata" SET "isActive" = true WHERE "id" = '3bf04756-b368-4189-ac21-11a9f625e9d5'`,
    );
    await queryRunner.query(
      `UPDATE "core"."objectMetadata" SET "isActive" = true WHERE "id" = '99dbc17c-4d69-4d2e-b97b-6c310a3d25e2'`,
    );
  }
}
