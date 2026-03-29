import {
  type WorkflowRunState,
  type WorkflowRunStepStatus,
} from '@/workflow/types/Workflow';
import { isDefined } from 'pm-shared/utils';
import { StepStatus } from 'pm-shared/workflow';

export const getWorkflowRunStepExecutionStatus = ({
  workflowRunState,
  stepId,
}: {
  workflowRunState: WorkflowRunState | null;
  stepId: string;
}): WorkflowRunStepStatus => {
  const stepOutput = workflowRunState?.stepInfos?.[stepId];

  if (isDefined(stepOutput)) {
    return stepOutput.status;
  }

  return StepStatus.NOT_STARTED;
};
