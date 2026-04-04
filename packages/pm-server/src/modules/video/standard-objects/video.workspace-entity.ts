import { type ActorMetadata, FieldMetadataType } from 'pm-shared/types';

import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { type FieldTypeAndNameMetadata } from 'src/engine/workspace-manager/utils/get-ts-vector-column-expression.util';
import { type EntityRelation } from 'src/engine/workspace-manager/workspace-migration/types/entity-relation.interface';
import { type CandidateWorkspaceEntity } from 'src/modules/candidate/standard-objects/candidate.workspace-entity';
import { type JobWorkspaceEntity } from 'src/modules/job/standard-objects/job.workspace-entity';

const NAME_FIELD_NAME = 'name';

export const SEARCH_FIELDS_FOR_VIDEO: FieldTypeAndNameMetadata[] = [
  { name: NAME_FIELD_NAME, type: FieldMetadataType.TEXT },
];

export class VideoWorkspaceEntity extends BaseWorkspaceEntity {
  name: string;
  videoUrl: string | null;
  status: string;
  reviewerNotes: string | null;
  shareUrl: string | null;
  recordedAt: string | null;
  durationSeconds: number | null;
  position: number;
  createdBy: ActorMetadata;
  updatedBy: ActorMetadata;
  candidate: EntityRelation<CandidateWorkspaceEntity> | null;
  candidateId: string | null;
  job: EntityRelation<JobWorkspaceEntity> | null;
  jobId: string | null;
  searchVector: string;
}
