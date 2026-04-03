import { MigrationInterface, QueryRunner } from 'typeorm';

// The candidate "byStatus" kanban view was named "Pipeline" which showed as
// "Pipeline · Candidate" in the sidebar. Renamed to "Candidate Pipeline".
// universalIdentifier: '20202020-a008-4a08-8a08-ba5cba51aba5'
export class RenameCandidatePipelineView1774400000000
  implements MigrationInterface
{
  name = 'RenameCandidatePipelineView1774400000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "core"."view" SET "name" = 'Candidate Pipeline' WHERE "universalIdentifier" = '20202020-a008-4a08-8a08-ba5cba51aba5' AND "name" = 'Pipeline'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "core"."view" SET "name" = 'Pipeline' WHERE "universalIdentifier" = '20202020-a008-4a08-8a08-ba5cba51aba5' AND "name" = 'Candidate Pipeline'`,
    );
  }
}
