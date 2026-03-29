import { capitalize } from 'pm-shared/utils';
export const getRestoreManyRecordsMutationResponseField = (
  objectNamePlural: string,
) => `restore${capitalize(objectNamePlural)}`;
