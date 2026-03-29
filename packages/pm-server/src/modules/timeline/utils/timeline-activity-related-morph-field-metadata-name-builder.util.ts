import { capitalize } from 'pm-shared/utils';

export const buildTimelineActivityRelatedMorphFieldMetadataName = (
  name: string,
) => {
  return `target${capitalize(name)}`;
};
