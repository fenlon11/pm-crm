import { capitalize } from 'pm-shared/utils';
export const getDestroyManyRecordsMutationResponseField = (
  objectNamePlural: string,
) => `destroy${capitalize(objectNamePlural)}`;
