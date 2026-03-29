import { type FlatViewFieldGroup } from 'src/engine/metadata-modules/flat-view-field-group/types/flat-view-field-group.type';
import {
  createStandardViewFieldGroupFlatMetadata,
  type CreateStandardViewFieldGroupArgs,
} from 'src/engine/workspace-manager/twenty-standard-application/utils/view-field-group/create-standard-view-field-group-flat-metadata.util';

export const computeStandardJobViewFieldGroups = (
  args: Omit<CreateStandardViewFieldGroupArgs<'job'>, 'context'>,
): Record<string, FlatViewFieldGroup> => {
  return {
    jobRecordPageFieldsGeneral: createStandardViewFieldGroupFlatMetadata({
      ...args,
      objectName: 'job',
      context: {
        viewName: 'jobRecordPageFields',
        viewFieldGroupName: 'general',
        name: 'General',
        position: 0,
        isVisible: true,
      },
    }),
    jobRecordPageFieldsAdditional: createStandardViewFieldGroupFlatMetadata({
      ...args,
      objectName: 'job',
      context: {
        viewName: 'jobRecordPageFields',
        viewFieldGroupName: 'additional',
        name: 'Additional',
        position: 1,
        isVisible: true,
      },
    }),
    jobRecordPageFieldsOther: createStandardViewFieldGroupFlatMetadata({
      ...args,
      objectName: 'job',
      context: {
        viewName: 'jobRecordPageFields',
        viewFieldGroupName: 'other',
        name: 'Other',
        position: 2,
        isVisible: true,
      },
    }),
  };
};
