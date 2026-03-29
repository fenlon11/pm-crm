import { capitalize } from 'pm-shared/utils';
export const getDeleteManyRecordsMutationResponseField = (
  objectNamePlural: string,
) => `delete${capitalize(objectNamePlural)}`;
