import { type FlatViewGroup } from 'src/engine/metadata-modules/flat-view-group/types/flat-view-group.type';
import {
  createStandardViewGroupFlatMetadata,
  type CreateStandardViewGroupArgs,
} from 'src/engine/workspace-manager/twenty-standard-application/utils/view-group/create-standard-view-group-flat-metadata.util';

export const computeStandardCompanyViewGroups = (
  args: Omit<CreateStandardViewGroupArgs<'company'>, 'context'>,
): Record<string, FlatViewGroup> => {
  return {
    byStageNew: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'company',
      context: {
        viewName: 'byStage',
        viewGroupName: 'new',
        isVisible: true,
        fieldValue: 'NEW',
        position: 0,
      },
    }),
    byStageAttemptedContact: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'company',
      context: {
        viewName: 'byStage',
        viewGroupName: 'attemptedContact',
        isVisible: true,
        fieldValue: 'ATTEMPTED_CONTACT',
        position: 1,
      },
    }),
    byStageContacted: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'company',
      context: {
        viewName: 'byStage',
        viewGroupName: 'contacted',
        isVisible: true,
        fieldValue: 'CONTACTED',
        position: 2,
      },
    }),
    byStageAppointmentSet: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'company',
      context: {
        viewName: 'byStage',
        viewGroupName: 'appointmentSet',
        isVisible: true,
        fieldValue: 'APPOINTMENT_SET',
        position: 3,
      },
    }),
    byStageAppointmentMet: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'company',
      context: {
        viewName: 'byStage',
        viewGroupName: 'appointmentMet',
        isVisible: true,
        fieldValue: 'APPOINTMENT_MET',
        position: 4,
      },
    }),
    byStageActiveFollowUp: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'company',
      context: {
        viewName: 'byStage',
        viewGroupName: 'activeFollowUp',
        isVisible: true,
        fieldValue: 'ACTIVE_FOLLOW_UP',
        position: 5,
      },
    }),
    byStageSigned: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'company',
      context: {
        viewName: 'byStage',
        viewGroupName: 'signed',
        isVisible: true,
        fieldValue: 'SIGNED',
        position: 6,
      },
    }),
    byStageOnboarding: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'company',
      context: {
        viewName: 'byStage',
        viewGroupName: 'onboarding',
        isVisible: true,
        fieldValue: 'ONBOARDING',
        position: 7,
      },
    }),
    byStageNurture: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'company',
      context: {
        viewName: 'byStage',
        viewGroupName: 'nurture',
        isVisible: true,
        fieldValue: 'NURTURE',
        position: 8,
      },
    }),
    byStageArchive: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'company',
      context: {
        viewName: 'byStage',
        viewGroupName: 'archive',
        isVisible: true,
        fieldValue: 'ARCHIVE',
        position: 9,
      },
    }),
  };
};
