import { type AllMetadataName } from 'pm-shared/metadata';

export type InferDeletionFromMissingEntities =
  | true
  | Partial<Record<AllMetadataName, boolean>>
  | undefined;
