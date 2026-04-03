import { useLingui } from '@lingui/react/macro';
import { IconChartBar, IconInbox, IconLayoutKanban } from 'pm-ui/display';

import { NavigationDrawerAnimatedCollapseWrapper } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerAnimatedCollapseWrapper';
import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { NavigationDrawerSectionTitle } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSectionTitle';
import { useNavigationSection } from '@/ui/navigation/navigation-drawer/hooks/useNavigationSection';
import { isNavigationSectionOpenFamilyState } from '@/ui/navigation/navigation-drawer/states/isNavigationSectionOpenFamilyState';
import { useAtomFamilyStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomFamilyStateValue';

// Persistent Recruiter UI items that are conceptual views, not CRM objects.
// These appear in the sidebar spec but don't map to a metadata object:
// Pipeline (candidate kanban), Inbox (activity feed), Reports (analytics).
// Marked modifier='soon' so they render as disabled with a "Soon" badge.
export const PRComingSoonNavSection = () => {
  const { t } = useLingui();
  const navigationSectionId = 'PRComingSoon';
  const { toggleNavigationSection } = useNavigationSection(navigationSectionId);
  const isNavigationSectionOpen = useAtomFamilyStateValue(
    isNavigationSectionOpenFamilyState,
    navigationSectionId,
  );

  return (
    <NavigationDrawerSection>
      <NavigationDrawerAnimatedCollapseWrapper>
        <NavigationDrawerSectionTitle
          label={t`Tools`}
          onClick={() => toggleNavigationSection()}
          isOpen={isNavigationSectionOpen}
        />
      </NavigationDrawerAnimatedCollapseWrapper>
      {isNavigationSectionOpen && (
        <>
          <NavigationDrawerItem
            label={t`Pipeline`}
            Icon={IconLayoutKanban}
            modifier="soon"
          />
          <NavigationDrawerItem
            label={t`Inbox`}
            Icon={IconInbox}
            modifier="soon"
          />
          <NavigationDrawerItem
            label={t`Reports`}
            Icon={IconChartBar}
            modifier="soon"
          />
        </>
      )}
    </NavigationDrawerSection>
  );
};
