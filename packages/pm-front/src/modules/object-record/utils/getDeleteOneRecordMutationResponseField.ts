import { capitalize } from 'pm-shared/utils';
export const getDeleteOneRecordMutationResponseField = (
  objectNameSingular: string,
) => `delete${capitalize(objectNameSingular)}`;
