import { CoreObjectNameSingular } from 'pm-shared/types';
import { t } from '@lingui/core/macro';

export const getEmptyStateSubTitle = (
  objectNameSingular: string,
  objectLabel: string,
) => {
  if (objectNameSingular === CoreObjectNameSingular.WorkflowVersion) {
    return t`Create a workflow and return here to view its versions`;
  }

  if (objectNameSingular === CoreObjectNameSingular.WorkflowRun) {
    return t`Run a workflow and return here to view its executions`;
  }

  return t`Add your first ${objectLabel} to get started.`;
};
