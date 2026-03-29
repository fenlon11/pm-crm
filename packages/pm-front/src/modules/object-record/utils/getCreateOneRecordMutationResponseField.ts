import { capitalize } from 'pm-shared/utils';
export const getCreateOneRecordMutationResponseField = (
  objectNameSingular: string,
) => `create${capitalize(objectNameSingular)}`;
