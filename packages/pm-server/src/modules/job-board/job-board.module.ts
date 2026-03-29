import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkspaceDomainsModule } from 'src/engine/core-modules/domain/workspace-domains/workspace-domains.module';
import { EmailModule } from 'src/engine/core-modules/email/email.module';
import { UserWorkspaceEntity } from 'src/engine/core-modules/user-workspace/user-workspace.entity';
import { UserEntity } from 'src/engine/core-modules/user/user.entity';
import { JobBoardController } from 'src/modules/job-board/job-board.controller';
import { JobBoardService } from 'src/modules/job-board/job-board.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserWorkspaceEntity, UserEntity]),
    WorkspaceDomainsModule,
    EmailModule,
  ],
  controllers: [JobBoardController],
  providers: [JobBoardService],
})
export class JobBoardModule {}
