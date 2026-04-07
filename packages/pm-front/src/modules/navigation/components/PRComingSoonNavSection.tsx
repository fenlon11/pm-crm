import { useLingui } from '@lingui/react/macro';
import { IconChartBar, IconInbox, IconVideo } from 'pm-ui/display';
import { useLocation } from 'react-router-dom';
import { AppPath } from 'pm-shared/types';

import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';

// Persistent Recruiter UI items that are conceptual views, not CRM objects.
// Videos: live route to the Discovery Video creator feature.
// Inbox (activity feed) and Reports (analytics) are placeholders pending implementation.
// Pipeline is now a live nav folder in STANDARD_NAVIGATION_MENU_ITEMS (candidate + company kanban views).
// No collapsible section wrapper — these should always be visible.
export const PRComingSoonNavSection = () => {
  const { t } = useLingui();
  const location = useLocation();

  return (
    <NavigationDrawerSection>
      <NavigationDrawerItem
        label={t`Videos`}
        Icon={IconVideo}
        to={AppPath.VideosPage}
        active={location.pathname.startsWith('/videos')}
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
