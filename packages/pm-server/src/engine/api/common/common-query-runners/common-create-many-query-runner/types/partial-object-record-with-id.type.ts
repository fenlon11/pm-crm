import { type ObjectRecord } from 'pm-shared/types';

export type PartialObjectRecordWithId = Partial<ObjectRecord> & { id: string };
