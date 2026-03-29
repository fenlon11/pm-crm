import { RATING_VALUES } from 'pm-shared/constants';
import { type FieldRatingValue } from 'pm-shared/types';

export const isFieldRatingValue = (
  fieldValue: unknown,
): fieldValue is FieldRatingValue =>
  RATING_VALUES.includes(fieldValue as NonNullable<FieldRatingValue>);
