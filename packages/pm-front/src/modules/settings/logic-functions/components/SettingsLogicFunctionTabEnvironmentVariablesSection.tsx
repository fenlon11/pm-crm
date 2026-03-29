import { H2Title } from 'pm-ui/display';
import { Section } from 'pm-ui/layout';
import { SettingsPath } from 'pm-shared/types';
import { LinkChip } from 'pm-ui/components';
import { getSettingsPath } from 'pm-shared/utils';
import { useParams } from 'react-router-dom';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';

export const SettingsLogicFunctionTabEnvironmentVariablesSection = () => {
  const { applicationId = '' } = useParams<{ applicationId: string }>();
  return (
    <Section>
      <H2Title
        title={t`Environment Variables`}
        description={t`Accessible in your function via process.env.KEY`}
      />
      <Trans>
        Environment variables are defined at application level for all
        functions. Please check{' '}
        <LinkChip
          label={t`application detail page`}
          to={getSettingsPath(
            SettingsPath.ApplicationDetail,
            {
              applicationId,
            },
            undefined,
            'settings',
          )}
        />
        .
      </Trans>
    </Section>
  );
};
