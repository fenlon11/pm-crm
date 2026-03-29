import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { memoryStorage } from 'multer';

import { NoPermissionGuard } from 'src/engine/guards/no-permission.guard';
import { PublicEndpointGuard } from 'src/engine/guards/public-endpoint.guard';
import {
  ApplyToJobInput,
  RecruiterPublicService,
} from 'src/modules/recruiter/services/recruiter-public.service';

const MAX_RESUME_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

@Controller('public')
@UseGuards(PublicEndpointGuard, NoPermissionGuard)
export class RecruiterPublicController {
  constructor(private readonly recruiterPublicService: RecruiterPublicService) {}

  @Get('jobs/:workspaceId/:jobId')
  async getJob(
    @Param('workspaceId') workspaceId: string,
    @Param('jobId') jobId: string,
  ) {
    return this.recruiterPublicService.getJob(workspaceId, jobId);
  }

  @Post('jobs/:workspaceId/:jobId/apply')
  @UseInterceptors(
    FileInterceptor('resume', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_RESUME_SIZE_BYTES },
      fileFilter: (_req, file, cb) => {
        const allowed = ['application/pdf', 'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

        if (allowed.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only PDF and Word documents are accepted for resume upload'), false);
        }
      },
    }),
  )
  async applyToJob(
    @Param('workspaceId') workspaceId: string,
    @Param('jobId') jobId: string,
    @Body() body: Record<string, string>,
    @UploadedFile() resumeFile?: Express.Multer.File,
  ) {
    const { name, email, phone, coverLetter } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      throw new BadRequestException('Name is required');
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      throw new BadRequestException('A valid email address is required');
    }

    const input: ApplyToJobInput = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      coverLetter: coverLetter?.trim() || undefined,
    };

    return this.recruiterPublicService.applyToJob(workspaceId, jobId, input, resumeFile);
  }
}
