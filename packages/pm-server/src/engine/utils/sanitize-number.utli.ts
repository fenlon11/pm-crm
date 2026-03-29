import { isDefined } from 'pm-shared/utils';
export const sanitizeNumber = (value: number | null): number | null => {
  if (!isDefined(value) || Number.isNaN(value)) {
    return null;
  }

  return value;
};
