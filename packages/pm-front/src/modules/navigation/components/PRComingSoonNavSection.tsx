import { useLingui } from '@lingui/react/macro';
import { IconChartBar, IconInbox, IconLayoutKanban } from 'pm-ui/display';

import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';

// Persistent Recruiter UI items that are conceptual views, not CRM objects.
// These appear in the sidebar spec but don't map to a metadata object:
// Pipeline (candidate kanban), Inbox (activity feed), Reports (analytics).
// Marked modifier='soon' so they render as disabled with a "Soon" badge.
// No collapsible section wrapper — these should always be visible.
export const PRComingSoonNavSection = () => {
  const { t } = useLingui();

  return (
    <NavigationDrawerSection>
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
    </NavigationDrawerSection>
  );
};
