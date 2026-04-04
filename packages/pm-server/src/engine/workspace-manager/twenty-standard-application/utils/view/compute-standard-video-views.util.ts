import { AggregateOperations, ViewType, ViewKey } from 'pm-shared/types';

import { type FlatView } from 'src/engine/metadata-modules/flat-view/types/flat-view.type';

import {
  createStandardViewFlatMetadata,
  type CreateStandardViewArgs,
} from 'src/engine/workspace-manager/twenty-standard-application/utils/view/create-standard-view-flat-metadata.util';

export const computeStandardVideoViews = (
  args: Omit<CreateStandardViewArgs<'video'>, 'context'>,
): Record<string, FlatView> => {
  return {
    allVideos: createStandardViewFlatMetadata({
      ...args,
      objectName: 'video',
      context: {
        viewName: 'allVideos',
        name: 'All {objectLabelPlural}',
        type: ViewType.TABLE,
        key: ViewKey.INDEX,
        position: 0,
        icon: 'IconVideo',
      },
    }),
    byStatus: createStandardViewFlatMetadata({
      ...args,
      objectName: 'video',
      context: {
        viewName: 'byStatus',
        name: 'Video Review',
        type: ViewType.KANBAN,
        key: null,
        position: 1,
        icon: 'IconLayoutKanban',
        mainGroupByFieldName: 'status',
        kanbanAggregateOperation: AggregateOperations.COUNT,
        kanbanAggregateOperationFieldName: 'status',
      },
    }),
    videoRecordPageFields: createStandardViewFlatMetadata({
      ...args,
      objectName: 'video',
      context: {
        viewName: 'videoRecordPageFields',
        name: 'Video Record Page Fields',
        type: ViewType.FIELDS_WIDGET,
        key: null,
        position: 0,
        icon: 'IconVideo',
      },
    }),
  };
};
