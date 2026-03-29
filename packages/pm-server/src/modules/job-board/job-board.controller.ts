import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { NoPermissionGuard } from 'src/engine/guards/no-permission.guard';
import { PublicEndpointGuard } from 'src/engine/guards/public-endpoint.guard';
import { type ApplyToJobDTO } from 'src/modules/job-board/dtos/apply-to-job.dto';
import { type PublicJobDTO } from 'src/modules/job-board/dtos/public-job.dto';
import { JobBoardService } from 'src/modules/job-board/job-board.service';

@Controller('api/job-board')
@UseGuards(PublicEndpointGuard, NoPermissionGuard)
export class JobBoardController {
  constructor(private readonly jobBoardService: JobBoardService) {}

  @Get(':jobId')
  async getJob(
    @Param('jobId') jobId: string,
    @Req() request: Request,
  ): Promise<PublicJobDTO> {
    const origin = `${request.protocol}://${request.get('host')}`;

    return this.jobBoardService.getJob(jobId, origin);
  }

  @Post(':jobId/apply')
  @HttpCode(HttpStatus.CREATED)
  async applyToJob(
    @Param('jobId') jobId: string,
    @Body() body: ApplyToJobDTO,
    @Req() request: Request,
  ): Promise<{ candidateId: string }> {
    const origin = `${request.protocol}://${request.get('host')}`;

    return this.jobBoardService.applyToJob(jobId, body, origin);
  }
}
