import { type FlatViewGroup } from 'src/engine/metadata-modules/flat-view-group/types/flat-view-group.type';
import {
  createStandardViewGroupFlatMetadata,
  type CreateStandardViewGroupArgs,
} from 'src/engine/workspace-manager/twenty-standard-application/utils/view-group/create-standard-view-group-flat-metadata.util';

export const computeStandardCandidateViewGroups = (
  args: Omit<CreateStandardViewGroupArgs<'candidate'>, 'context'>,
): Record<string, FlatViewGroup> => {
  return {
    byStatusApplied: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'candidate',
      context: {
        viewName: 'byStatus',
        viewGroupName: 'applied',
        isVisible: true,
        fieldValue: 'APPLIED',
        position: 0,
      },
    }),
    byStatusScreening: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'candidate',
      context: {
        viewName: 'byStatus',
        viewGroupName: 'screening',
        isVisible: true,
        fieldValue: 'SCREENING',
        position: 1,
      },
    }),
    byStatusInterview: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'candidate',
      context: {
        viewName: 'byStatus',
        viewGroupName: 'interview',
        isVisible: true,
        fieldValue: 'INTERVIEW',
        position: 2,
      },
    }),
    byStatusOffer: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'candidate',
      context: {
        viewName: 'byStatus',
        viewGroupName: 'offer',
        isVisible: true,
        fieldValue: 'OFFER',
        position: 3,
      },
    }),
    byStatusHired: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'candidate',
      context: {
        viewName: 'byStatus',
        viewGroupName: 'hired',
        isVisible: true,
        fieldValue: 'HIRED',
        position: 4,
      },
    }),
    byStatusRejected: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'candidate',
      context: {
        viewName: 'byStatus',
        viewGroupName: 'rejected',
        isVisible: true,
        fieldValue: 'REJECTED',
        position: 5,
      },
    }),
    byStatusWithdrawn: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'candidate',
      context: {
        viewName: 'byStatus',
        viewGroupName: 'withdrawn',
        isVisible: true,
        fieldValue: 'WITHDRAWN',
        position: 6,
      },
    }),
  };
};
