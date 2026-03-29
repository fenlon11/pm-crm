import { AgentChatComponentInstanceContext } from '@/ai/states/AgentChatComponentInstanceContext';
import { createAtomComponentFamilyState } from '@/ui/utilities/state/jotai/utils/createAtomComponentFamilyState';
import { type ExtendedUIMessage } from 'pm-shared/ai';

export const agentChatFetchedMessagesComponentFamilyState =
  createAtomComponentFamilyState<ExtendedUIMessage[], { threadId: string }>({
    key: 'agentChatFetchedMessagesComponentFamilyState',
    defaultValue: [],
    componentInstanceContext: AgentChatComponentInstanceContext,
  });
