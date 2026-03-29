import { type jsonRelationFilterValueSchema } from 'pm-shared/utils';
import { type z } from 'zod';

export type RelationFilterValue = z.infer<typeof jsonRelationFilterValueSchema>;
