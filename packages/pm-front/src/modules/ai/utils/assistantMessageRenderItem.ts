import { type ExtendedUIMessagePart } from 'pm-shared/ai';

import { type ThinkingStepPart } from '@/ai/utils/thinkingStepPart';

export type AssistantMessageRenderItem =
  | {
      type: 'thinking-steps';
      parts: ThinkingStepPart[];
    }
  | {
      type: 'part';
      part: ExtendedUIMessagePart;
    };
