import { ViewType, ViewKey } from 'pm-shared/types';

import { type FlatView } from 'src/engine/metadata-modules/flat-view/types/flat-view.type';

import {
  createStandardViewFlatMetadata,
  type CreateStandardViewArgs,
} from 'src/engine/workspace-manager/twenty-standard-application/utils/view/create-standard-view-flat-metadata.util';

export const computeStandardJobViews = (
  args: Omit<CreateStandardViewArgs<'job'>, 'context'>,
): Record<string, FlatView> => {
  return {
    allJobs: createStandardViewFlatMetadata({
      ...args,
      objectName: 'job',
      context: {
        viewName: 'allJobs',
        name: 'All {objectLabelPlural}',
        type: ViewType.TABLE,
        key: ViewKey.INDEX,
        position: 0,
        icon: 'IconList',
      },
    }),
    jobRecordPageFields: createStandardViewFlatMetadata({
      ...args,
      objectName: 'job',
      context: {
        viewName: 'jobRecordPageFields',
        name: 'Job Record Page Fields',
        type: ViewType.FIELDS_WIDGET,
        key: null,
        position: 0,
        icon: 'IconList',
      },
    }),
  };
};
