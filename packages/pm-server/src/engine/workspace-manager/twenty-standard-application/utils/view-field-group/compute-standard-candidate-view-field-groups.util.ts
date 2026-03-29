import { type FlatViewFieldGroup } from 'src/engine/metadata-modules/flat-view-field-group/types/flat-view-field-group.type';
import {
  createStandardViewFieldGroupFlatMetadata,
  type CreateStandardViewFieldGroupArgs,
} from 'src/engine/workspace-manager/twenty-standard-application/utils/view-field-group/create-standard-view-field-group-flat-metadata.util';

export const computeStandardCandidateViewFieldGroups = (
  args: Omit<CreateStandardViewFieldGroupArgs<'candidate'>, 'context'>,
): Record<string, FlatViewFieldGroup> => {
  return {
    candidateRecordPageFieldsGeneral:
      createStandardViewFieldGroupFlatMetadata({
        ...args,
        objectName: 'candidate',
        context: {
          viewName: 'candidateRecordPageFields',
          viewFieldGroupName: 'general',
          name: 'General',
          position: 0,
          isVisible: true,
        },
      }),
    candidateRecordPageFieldsAdditional:
      createStandardViewFieldGroupFlatMetadata({
        ...args,
        objectName: 'candidate',
        context: {
          viewName: 'candidateRecordPageFields',
          viewFieldGroupName: 'additional',
          name: 'Additional',
          position: 1,
          isVisible: true,
        },
      }),
    candidateRecordPageFieldsOther: createStandardViewFieldGroupFlatMetadata({
      ...args,
      objectName: 'candidate',
      context: {
        viewName: 'candidateRecordPageFields',
        viewFieldGroupName: 'other',
        name: 'Other',
        position: 2,
        isVisible: true,
      },
    }),
  };
};
