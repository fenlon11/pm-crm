import { useLingui } from '@lingui/react/macro';
import { IconChartBar, IconInbox } from 'pm-ui/display';

import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';

// Persistent Recruiter UI items that are conceptual views, not CRM objects.
// Inbox (activity feed) and Reports (analytics) are placeholders pending implementation.
// Pipeline is now a live nav folder in STANDARD_NAVIGATION_MENU_ITEMS (candidate + company kanban views).
// Marked modifier='soon' so they render as disabled with a "Soon" badge.
// No collapsible section wrapper — these should always be visible.
export const PRComingSoonNavSection = () => {
  const { t } = useLingui();

  return (
    <NavigationDrawerSection>
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
    </NavigationDrawerSection>
  );
};
