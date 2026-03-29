import { AgentChatComponentInstanceContext } from '@/ai/states/AgentChatComponentInstanceContext';
import { createAtomComponentFamilyState } from '@/ui/utilities/state/jotai/utils/createAtomComponentFamilyState';
import { type ExtendedUIMessage } from 'pm-shared/ai';

export const agentChatMessageComponentFamilyState =
  createAtomComponentFamilyState<ExtendedUIMessage | null, string>({
    key: 'agentChatMessageComponentFamilyState',
    defaultValue: null,
    componentInstanceContext: AgentChatComponentInstanceContext,
  });
