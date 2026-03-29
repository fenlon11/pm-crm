import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { type ObjectPermissions } from 'pm-shared/types';
import { isDefined } from 'pm-shared/utils';

export const filterReadableActiveObjectMetadataItems = (
  objectMetadataItems: EnrichedObjectMetadataItem[],
  objectPermissionsByObjectMetadataId: Record<
    string,
    ObjectPermissions & { objectMetadataId: string }
  >,
): EnrichedObjectMetadataItem[] =>
  objectMetadataItems.filter((objectMetadataItem) => {
    if (!objectMetadataItem.isActive) {
      return false;
    }

    const objectPermissions =
      objectPermissionsByObjectMetadataId[objectMetadataItem.id];

    if (!isDefined(objectPermissions)) {
      return true;
    }

    return objectPermissions.canReadObjectRecords;
  });
