import { capitalize } from 'pm-shared/utils';
export const getCreateManyRecordsMutationResponseField = (
  objectNamePlural: string,
) => `create${capitalize(objectNamePlural)}`;
