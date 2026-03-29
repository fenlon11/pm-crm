import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { render } from '@react-email/render';
import { FieldActorSource } from 'pm-shared/types';
import { Repository } from 'typeorm';

import { WorkspaceDomainsService } from 'src/engine/core-modules/domain/workspace-domains/services/workspace-domains.service';
import { EmailService } from 'src/engine/core-modules/email/email.service';
import { UserWorkspaceEntity } from 'src/engine/core-modules/user-workspace/user-workspace.entity';
import { UserEntity } from 'src/engine/core-modules/user/user.entity';
import { type SystemWorkspaceAuthContext } from 'src/engine/core-modules/auth/types/workspace-auth-context.type';
import { GlobalWorkspaceOrmManager } from 'src/engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager';
import { CandidateApplicationReceivedEmail } from 'pm-emails';
import { type ApplyToJobDTO } from 'src/modules/job-board/dtos/apply-to-job.dto';
import { type PublicJobDTO } from 'src/modules/job-board/dtos/public-job.dto';
import { JobWorkspaceEntity } from 'src/modules/job/standard-objects/job.workspace-entity';
import { CandidateWorkspaceEntity } from 'src/modules/candidate/standard-objects/candidate.workspace-entity';

@Injectable()
export class JobBoardService {
  constructor(
    private readonly workspaceDomainsService: WorkspaceDomainsService,
    private readonly globalWorkspaceOrmManager: GlobalWorkspaceOrmManager,
    private readonly emailService: EmailService,
    @InjectRepository(UserWorkspaceEntity)
    private readonly userWorkspaceRepository: Repository<UserWorkspaceEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getJob(jobId: string, origin: string): Promise<PublicJobDTO> {
    const workspace =
      await this.workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace(
        origin,
      );

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    const systemAuthContext: SystemWorkspaceAuthContext = {
      type: 'system',
      workspace,
    };

    return this.globalWorkspaceOrmManager.executeInWorkspaceContext(
      async () => {
        const jobRepository =
          await this.globalWorkspaceOrmManager.getRepository<JobWorkspaceEntity>(
            workspace.id,
            JobWorkspaceEntity,
          );

        const job = await jobRepository.findOne({
          where: { id: jobId },
        });

        if (!job || job.status !== 'ACTIVE') {
          throw new NotFoundException('Job not found');
        }

        return {
          id: job.id,
          title: job.title,
          description: job.description,
          requirements: job.requirements,
          location: job.location,
          salaryRange: job.salaryRange,
          department: job.department,
          status: job.status,
          companyName: null,
        };
      },
      systemAuthContext,
      { lite: true },
    );
  }

  async applyToJob(
    jobId: string,
    application: ApplyToJobDTO,
    origin: string,
  ): Promise<{ candidateId: string }> {
    const workspace =
      await this.workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace(
        origin,
      );

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    const systemAuthContext: SystemWorkspaceAuthContext = {
      type: 'system',
      workspace,
    };

    const result = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(
      async () => {
        const jobRepository =
          await this.globalWorkspaceOrmManager.getRepository<JobWorkspaceEntity>(
            workspace.id,
            JobWorkspaceEntity,
          );

        const job = await jobRepository.findOne({
          where: { id: jobId },
        });

        if (!job || job.status !== 'ACTIVE') {
          throw new NotFoundException('Job not found');
        }

        const candidateRepository =
          await this.globalWorkspaceOrmManager.getRepository<CandidateWorkspaceEntity>(
            workspace.id,
            CandidateWorkspaceEntity,
          );

        const candidate = await candidateRepository.save({
          name: application.name,
          email: application.email,
          phone: application.phone ?? null,
          resumeUrl: application.resumeUrl ?? null,
          notes: application.coverLetter
            ? `Cover Letter:\n${application.coverLetter}`
            : null,
          status: 'APPLIED',
          source: 'Job Landing Page',
          jobId: job.id,
          position: 0,
          createdBy: {
            source: FieldActorSource.API,
            name: 'Job Board',
          },
          updatedBy: {
            source: FieldActorSource.API,
            name: 'Job Board',
          },
        } as Partial<CandidateWorkspaceEntity>);

        return { candidateId: candidate.id, job };
      },
      systemAuthContext,
    );

    await this.sendApplicationNotification({
      workspaceId: workspace.id,
      candidateName: application.name,
      candidateEmail: application.email,
      jobTitle: result.job.title,
      workspaceName: workspace.displayName ?? workspace.subdomain ?? 'Workspace',
      serverUrl: origin,
    });

    return { candidateId: result.candidateId };
  }

  private async sendApplicationNotification({
    workspaceId,
    candidateName,
    candidateEmail,
    jobTitle,
    workspaceName,
    serverUrl,
  }: {
    workspaceId: string;
    candidateName: string;
    candidateEmail: string;
    jobTitle: string;
    workspaceName: string;
    serverUrl: string;
  }): Promise<void> {
    const adminUserWorkspace = await this.userWorkspaceRepository.findOne({
      where: { workspaceId },
      order: { createdAt: 'ASC' },
    });

    if (!adminUserWorkspace) {
      return;
    }

    const adminUser = await this.userRepository.findOne({
      where: { id: adminUserWorkspace.userId },
    });

    if (!adminUser?.email) {
      return;
    }

    const emailContent = await render(
      CandidateApplicationReceivedEmail({
        candidateName,
        candidateEmail,
        jobTitle,
        companyName: workspaceName,
        serverUrl,
        locale: 'en',
      }),
    );

    await this.emailService.send({
      to: adminUser.email,
      subject: `New Application: ${candidateName} applied for ${jobTitle}`,
      html: emailContent,
    });
  }
}
