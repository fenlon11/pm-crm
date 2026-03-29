import { capitalize } from 'pm-shared/utils';

export const getUpdateManyRecordsMutationResponseField = (
  objectNamePlural: string,
) => `update${capitalize(objectNamePlural)}`;
