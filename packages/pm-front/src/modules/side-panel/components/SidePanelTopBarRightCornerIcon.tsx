import { useSwitchToNewAIChat } from '@/ai/hooks/useSwitchToNewAIChat';
import { SidePanelObjectFilterDropdown } from '@/side-panel/components/SidePanelObjectFilterDropdown';
import { sidePanelPageState } from '@/side-panel/states/sidePanelPageState';
import { sidePanelSearchObjectFilterState } from '@/side-panel/states/sidePanelSearchObjectFilterState';
import { useAtomState } from '@/ui/utilities/state/jotai/hooks/useAtomState';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useIsFeatureEnabled } from '@/workspace/hooks/useIsFeatureEnabled';
import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { SidePanelPages } from 'pm-shared/types';
import { IconEdit } from 'pm-ui/display';
import { IconButton } from 'pm-ui/input';
import { useIsMobile } from 'pm-ui/utilities';
import { FeatureFlagKey } from '~/generated-metadata/graphql';
import { themeCssVariables } from 'pm-ui/theme-constants';

const StyledIconButtonContainer = styled.div`
  color: ${themeCssVariables.font.color.secondary};
`;

export const SidePanelTopBarRightCornerIcon = () => {
  const isMobile = useIsMobile();
  const isAiEnabled = useIsFeatureEnabled(FeatureFlagKey.IS_AI_ENABLED);
  const sidePanelPage = useAtomStateValue(sidePanelPageState);
  const { switchToNewChat } = useSwitchToNewAIChat();
  const [sidePanelSearchObjectFilter, setSidePanelSearchObjectFilter] =
    useAtomState(sidePanelSearchObjectFilterState);

  const isOnSearchPage = sidePanelPage === SidePanelPages.SearchRecords;

  if (isOnSearchPage) {
    return (
      <SidePanelObjectFilterDropdown
        selectedObjectNameSingular={sidePanelSearchObjectFilter}
        onSelectObject={setSidePanelSearchObjectFilter}
      />
    );
  }

  const isOnAskAIPage = [
    SidePanelPages.AskAI,
    SidePanelPages.ViewPreviousAIChats,
  ].includes(sidePanelPage);

  if (isMobile || !isAiEnabled || !isOnAskAIPage) {
    return null;
  }

  return (
    <StyledIconButtonContainer>
      <IconButton
        Icon={IconEdit}
        size="small"
        variant="tertiary"
        onClick={() => switchToNewChat()}
        ariaLabel={t`New conversation`}
      />
    </StyledIconButtonContainer>
  );
};
