import { SettingsAccountsMessageChannelsContainer } from '@/settings/accounts/components/SettingsAccountsMessageChannelsContainer';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SubMenuTopBarContainer } from '@/ui/layout/page/components/SubMenuTopBarContainer';
import { useLingui } from '@lingui/react/macro';
import { SettingsPath } from 'pm-shared/types';
import { getSettingsPath } from 'pm-shared/utils';
import { Section } from 'pm-ui/layout';

export const SettingsAccountsEmails = () => {
  const { t } = useLingui();

  return (
    <SubMenuTopBarContainer
      title={t`Emails`}
      links={[
        {
          children: t`User`,
          href: getSettingsPath(SettingsPath.ProfilePage),
        },
        {
          children: t`Accounts`,
          href: getSettingsPath(SettingsPath.Accounts),
        },
        { children: t`Emails` },
      ]}
    >
      <SettingsPageContainer>
        <Section>
          <SettingsAccountsMessageChannelsContainer />
        </Section>
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
