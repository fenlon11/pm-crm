import { capitalize } from 'pm-shared/utils';
export const getDestroyOneRecordMutationResponseField = (
  objectNameSingular: string,
) => `destroy${capitalize(objectNameSingular)}`;
