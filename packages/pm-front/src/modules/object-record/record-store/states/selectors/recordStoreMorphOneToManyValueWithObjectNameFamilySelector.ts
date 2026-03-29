import { type FieldMetadataItemRelation } from '@/object-metadata/types/FieldMetadataItemRelation';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { createAtomFamilySelector } from '@/ui/utilities/state/jotai/utils/createAtomFamilySelector';
import { type RelationType } from 'pm-shared/types';
import { computeMorphRelationFieldName } from 'pm-shared/utils';

type MorphOneToManyFamilyKey = {
  recordId: string;
  morphRelations: FieldMetadataItemRelation[];
};

type MorphValueWithObjectName = {
  objectNameSingular: string;
  value: ObjectRecord[] | ObjectRecord;
};

export const recordStoreMorphOneToManyValueWithObjectNameFamilySelector =
  createAtomFamilySelector<MorphValueWithObjectName[], MorphOneToManyFamilyKey>(
    {
      key: 'recordStoreMorphOneToManyValueWithObjectNameFamilySelector',
      get:
        ({ recordId, morphRelations }: MorphOneToManyFamilyKey) =>
        ({ get }) => {
          const morphValuesWithObjectName = morphRelations.map(
            (morphRelation) => {
              const fieldName = computeMorphRelationFieldName({
                fieldName: morphRelation.sourceFieldMetadata.name,
                relationType: morphRelation.type as RelationType,
                targetObjectMetadataNameSingular:
                  morphRelation.targetObjectMetadata.nameSingular,
                targetObjectMetadataNamePlural:
                  morphRelation.targetObjectMetadata.namePlural,
              });
              return {
                objectNameSingular:
                  morphRelation.targetObjectMetadata.nameSingular,
                value: (get(recordStoreFamilyState, recordId)?.[fieldName] ||
                  []) as ObjectRecord[] | ObjectRecord,
              };
            },
          );

          return morphValuesWithObjectName;
        },
    },
  );
