import { capitalize } from 'pm-shared/utils';

export const getMergeManyRecordsMutationResponseField = (
  objectNamePlural: string,
): string => {
  return `merge${capitalize(objectNamePlural)}`;
};
