import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserWorkspaceEntity } from 'src/engine/core-modules/user-workspace/user-workspace.entity';
import { UserEntity } from 'src/engine/core-modules/user/user.entity';
import { RecruiterPublicController } from 'src/modules/recruiter/controllers/recruiter-public.controller';
import { RecruiterPublicService } from 'src/modules/recruiter/services/recruiter-public.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserWorkspaceEntity, UserEntity]),
  ],
  controllers: [RecruiterPublicController],
  providers: [RecruiterPublicService],
})
export class RecruiterModule {}
