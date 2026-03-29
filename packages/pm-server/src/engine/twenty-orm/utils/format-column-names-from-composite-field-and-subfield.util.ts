import { capitalize, isDefined } from 'pm-shared/utils';
export const formatColumnNamesFromCompositeFieldAndSubfields = (
  fieldName: string,
  subFieldNames?: string[],
): string[] => {
  if (isDefined(subFieldNames)) {
    return subFieldNames.map(
      (subFieldName) => `${fieldName}${capitalize(subFieldName)}`,
    );
  }

  return [fieldName];
};
