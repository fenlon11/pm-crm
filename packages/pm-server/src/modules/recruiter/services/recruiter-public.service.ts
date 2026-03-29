import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { v4 as uuidv4 } from 'uuid';
import { render } from '@react-email/render';
import { Repository } from 'typeorm';

import { EmailService } from 'src/engine/core-modules/email/email.service';
import { FileStorageDriverFactory } from 'src/engine/core-modules/file-storage/file-storage-driver.factory';
import { UserWorkspaceEntity } from 'src/engine/core-modules/user-workspace/user-workspace.entity';
import { UserEntity } from 'src/engine/core-modules/user/user.entity';
import { GlobalWorkspaceOrmManager } from 'src/engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager';
import { buildSystemAuthContext } from 'src/engine/twenty-orm/utils/build-system-auth-context.util';
import { CandidateWorkspaceEntity } from 'src/modules/candidate/standard-objects/candidate.workspace-entity';
import { JobWorkspaceEntity } from 'src/modules/job/standard-objects/job.workspace-entity';
import { TimelineActivityWorkspaceEntity } from 'src/modules/timeline/standard-objects/timeline-activity.workspace-entity';
import { ApplicationReceivedEmail } from 'pm-emails';

export type JobPublicView = {
  id: string;
  title: string;
  description: string | null;
  requirements: string | null;
  location: string;
  salaryRange: string | null;
  department: string | null;
  companyName: string | null;
};

export type ApplyToJobInput = {
  name: string;
  email: string;
  phone?: string;
  coverLetter?: string;
};

@Injectable()
export class RecruiterPublicService {
  private readonly logger = new Logger(RecruiterPublicService.name);

  constructor(
    private readonly globalWorkspaceOrmManager: GlobalWorkspaceOrmManager,
    private readonly emailService: EmailService,
    private readonly fileStorageDriverFactory: FileStorageDriverFactory,
    @InjectRepository(UserWorkspaceEntity)
    private readonly userWorkspaceRepository: Repository<UserWorkspaceEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getJob(workspaceId: string, jobId: string): Promise<JobPublicView> {
    const authContext = buildSystemAuthContext(workspaceId);

    return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async () => {
      const jobRepository = await this.globalWorkspaceOrmManager.getRepository(
        workspaceId,
        JobWorkspaceEntity,
        { shouldBypassPermissionChecks: true },
      );

      const job = await jobRepository.findOne({
        where: { id: jobId },
        relations: ['company'],
      });

      if (!job) {
        throw new NotFoundException(`Job ${jobId} not found in workspace ${workspaceId}`);
      }

      if (job.status !== 'Active') {
        throw new NotFoundException('This job posting is not currently active');
      }

      return {
        id: job.id,
        title: job.title,
        description: job.description,
        requirements: job.requirements,
        location: job.location,
        salaryRange: job.salaryRange,
        department: job.department,
        companyName: (job.company as any)?.name ?? null,
      };
    }, authContext);
  }

  async applyToJob(
    workspaceId: string,
    jobId: string,
    input: ApplyToJobInput,
    resumeFile?: Express.Multer.File,
  ): Promise<{ candidateId: string }> {
    const authContext = buildSystemAuthContext(workspaceId);

    let resumeUrl: string | null = null;

    if (resumeFile) {
      resumeUrl = await this.uploadResume(workspaceId, resumeFile);
    }

    const candidateId = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async () => {
      const candidateRepository = await this.globalWorkspaceOrmManager.getRepository(
        workspaceId,
        CandidateWorkspaceEntity,
        { shouldBypassPermissionChecks: true },
      );

      const timelineRepository = await this.globalWorkspaceOrmManager.getRepository(
        workspaceId,
        TimelineActivityWorkspaceEntity,
        { shouldBypassPermissionChecks: true },
      );

      const lastPosition = (await candidateRepository.maximum('position', undefined)) ?? 0;

      const result = await candidateRepository.insert(
        [
          {
            name: input.name,
            email: input.email,
            phone: input.phone ?? null,
            resumeUrl,
            notes: input.coverLetter ? `Cover Letter:\n\n${input.coverLetter}` : null,
            status: 'Applied',
            source: 'Job Landing Page',
            jobId,
            position: lastPosition + 1,
            createdBy: { source: 'MANUAL', name: 'Public Application' } as any,
            updatedBy: { source: 'MANUAL', name: 'Public Application' } as any,
          },
        ],
        undefined,
        ['id'],
      );

      const newCandidateId = result.raw?.[0]?.id;

      if (!newCandidateId) {
        throw new Error('Failed to create candidate record');
      }

      // Create timeline activity entry
      await timelineRepository.insert(
        [
          {
            name: 'Applied via job landing page',
            happensAt: new Date(),
            targetCandidateId: newCandidateId,
            targetJobId: jobId,
            properties: { source: 'public_apply' } as any,
            createdBy: { source: 'MANUAL', name: 'Public Application' } as any,
            updatedBy: { source: 'MANUAL', name: 'Public Application' } as any,
          },
        ],
        undefined,
        ['id'],
      );

      return newCandidateId;
    }, authContext);

    // Fire and forget: send notifications
    this.sendNotifications(workspaceId, jobId, input, candidateId).catch((err) => {
      this.logger.error(`Failed to send application notifications: ${err.message}`, err.stack);
    });

    return { candidateId };
  }

  private async uploadResume(
    workspaceId: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const ext = file.originalname.split('.').pop() ?? 'pdf';
    const filename = `${uuidv4()}.${ext}`;
    const filePath = `${workspaceId}/recruiter/resumes/${filename}`;

    const driver = this.fileStorageDriverFactory.getCurrentDriver();

    await driver.writeFile({
      filePath,
      sourceFile: file.buffer,
      mimeType: file.mimetype,
    });

    return filePath;
  }

  private async sendNotifications(
    workspaceId: string,
    jobId: string,
    input: ApplyToJobInput,
    _candidateId: string,
  ): Promise<void> {
    // Get job info for email context
    const authContext = buildSystemAuthContext(workspaceId);

    let jobTitle = 'Unknown Position';
    let companyName = 'Your Company';

    try {
      const jobView = await this.getJobForNotification(workspaceId, jobId, authContext);

      jobTitle = jobView.title;
      companyName = jobView.companyName ?? companyName;
    } catch {
      // Non-fatal: continue with defaults
    }

    // Send acknowledgement to candidate
    try {
      const candidateEmailHtml = await render(
        ApplicationReceivedEmail({
          candidateName: input.name,
          jobTitle,
          companyName,
          locale: 'en',
        }),
      );

      await this.emailService.send({
        to: input.email,
        subject: `Application received — ${jobTitle} at ${companyName}`,
        html: candidateEmailHtml,
      });
    } catch (err) {
      this.logger.warn(`Failed to send candidate confirmation email: ${err.message}`);
    }

    // Send notification to workspace admin
    try {
      const adminEmail = await this.getWorkspaceAdminEmail(workspaceId);

      if (adminEmail) {
        await this.emailService.send({
          to: adminEmail,
          subject: `New application: ${input.name} applied for ${jobTitle}`,
          html: `
            <h2>New Job Application</h2>
            <p><strong>Candidate:</strong> ${input.name}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            ${input.phone ? `<p><strong>Phone:</strong> ${input.phone}</p>` : ''}
            <p><strong>Job:</strong> ${jobTitle}</p>
            <p><strong>Company:</strong> ${companyName}</p>
            <p><strong>Applied at:</strong> ${new Date().toISOString()}</p>
          `,
        });
      }
    } catch (err) {
      this.logger.warn(`Failed to send admin notification email: ${err.message}`);
    }
  }

  private async getJobForNotification(
    workspaceId: string,
    jobId: string,
    authContext: ReturnType<typeof buildSystemAuthContext>,
  ): Promise<{ title: string; companyName: string | null }> {
    return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async () => {
      const jobRepository = await this.globalWorkspaceOrmManager.getRepository(
        workspaceId,
        JobWorkspaceEntity,
        { shouldBypassPermissionChecks: true },
      );

      const job = await jobRepository.findOne({
        where: { id: jobId },
        relations: ['company'],
      });

      return {
        title: job?.title ?? 'Unknown Position',
        companyName: (job?.company as any)?.name ?? null,
      };
    }, authContext);
  }

  private async getWorkspaceAdminEmail(workspaceId: string): Promise<string | null> {
    const userWorkspace = await this.userWorkspaceRepository.findOne({
      where: { workspaceId },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });

    return (userWorkspace?.user as UserEntity)?.email ?? null;
  }
}
