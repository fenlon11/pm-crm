import { type AllMetadataName } from 'pm-shared/metadata';

export type MetadataToFlatEntityMapsKey<T extends AllMetadataName> =
  T extends AllMetadataName ? `flat${Capitalize<T>}Maps` : never;
