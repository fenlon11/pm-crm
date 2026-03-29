import { isDefined } from 'pm-shared/utils';
import { type FullNameMetadata } from 'pm-shared/types';

export const computeDisplayName = (
  name: FullNameMetadata | null | undefined,
) => {
  if (!name) {
    return '';
  }

  return Object.values(name).filter(isDefined).join(' ');
};
