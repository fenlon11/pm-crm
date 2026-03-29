import { type ActorMetadata, FieldMetadataType } from 'pm-shared/types';

import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { type FieldTypeAndNameMetadata } from 'src/engine/workspace-manager/utils/get-ts-vector-column-expression.util';
import { type EntityRelation } from 'src/engine/workspace-manager/workspace-migration/types/entity-relation.interface';
import { type AttachmentWorkspaceEntity } from 'src/modules/attachment/standard-objects/attachment.workspace-entity';
import { type CandidateWorkspaceEntity } from 'src/modules/candidate/standard-objects/candidate.workspace-entity';
import { type CompanyWorkspaceEntity } from 'src/modules/company/standard-objects/company.workspace-entity';
import { type FavoriteWorkspaceEntity } from 'src/modules/favorite/standard-objects/favorite.workspace-entity';
import { type NoteTargetWorkspaceEntity } from 'src/modules/note/standard-objects/note-target.workspace-entity';
import { type TaskTargetWorkspaceEntity } from 'src/modules/task/standard-objects/task-target.workspace-entity';
import { type TimelineActivityWorkspaceEntity } from 'src/modules/timeline/standard-objects/timeline-activity.workspace-entity';

const TITLE_FIELD_NAME = 'title';

export const SEARCH_FIELDS_FOR_JOB: FieldTypeAndNameMetadata[] = [
  { name: TITLE_FIELD_NAME, type: FieldMetadataType.TEXT },
];

export class JobWorkspaceEntity extends BaseWorkspaceEntity {
  title: string;
  description: string | null;
  requirements: string | null;
  location: string;
  salaryRange: string | null;
  department: string | null;
  status: string;
  position: number;
  createdBy: ActorMetadata;
  updatedBy: ActorMetadata;
  company: EntityRelation<CompanyWorkspaceEntity> | null;
  companyId: string | null;
  candidates: EntityRelation<CandidateWorkspaceEntity[]>;
  favorites: EntityRelation<FavoriteWorkspaceEntity[]>;
  taskTargets: EntityRelation<TaskTargetWorkspaceEntity[]>;
  noteTargets: EntityRelation<NoteTargetWorkspaceEntity[]>;
  attachments: EntityRelation<AttachmentWorkspaceEntity[]>;
  timelineActivities: EntityRelation<TimelineActivityWorkspaceEntity[]>;
  searchVector: string;
}
