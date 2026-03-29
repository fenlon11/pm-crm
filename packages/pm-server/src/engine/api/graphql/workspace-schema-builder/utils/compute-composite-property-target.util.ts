import {
  type FieldMetadataType,
  type CompositeProperty,
} from 'pm-shared/types';

export const computeCompositePropertyTarget = (
  type: FieldMetadataType,
  compositeProperty: CompositeProperty,
): string => {
  return `${type.toString()}->${compositeProperty.name}`;
};
