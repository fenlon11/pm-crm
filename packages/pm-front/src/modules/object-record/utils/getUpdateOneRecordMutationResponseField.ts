import { capitalize } from 'pm-shared/utils';
export const getUpdateOneRecordMutationResponseField = (
  objectNameSingular: string,
) => `update${capitalize(objectNameSingular)}`;
