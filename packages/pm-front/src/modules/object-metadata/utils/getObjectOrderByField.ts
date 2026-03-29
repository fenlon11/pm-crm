import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';

import { getLabelIdentifierFieldMetadataItem } from '@/object-metadata/utils/getLabelIdentifierFieldMetadataItem';
import { getOrderByForFieldMetadataType } from '@/object-metadata/utils/getOrderByForFieldMetadataType';
import {
  type OrderBy,
  type RecordGqlOperationOrderBy,
} from 'pm-shared/types';
import { isDefined } from 'pm-shared/utils';

export const getOrderByFieldForObjectMetadataItem = (
  objectMetadataItem: EnrichedObjectMetadataItem,
  orderBy?: OrderBy | null,
): RecordGqlOperationOrderBy => {
  const labelIdentifierFieldMetadata =
    getLabelIdentifierFieldMetadataItem(objectMetadataItem);

  if (isDefined(labelIdentifierFieldMetadata)) {
    return getOrderByForFieldMetadataType(
      labelIdentifierFieldMetadata,
      orderBy,
    );
  } else {
    return [
      {
        createdAt: orderBy ?? 'DescNullsLast',
      },
    ];
  }
};
