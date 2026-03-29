import { emailTheme } from 'src/common-style';

import { BaseEmail } from 'src/components/BaseEmail';
import { CallToAction } from 'src/components/CallToAction';
import { HighlightedContainer } from 'src/components/HighlightedContainer';
import { HighlightedText } from 'src/components/HighlightedText';
import { MainText } from 'src/components/MainText';
import { Title } from 'src/components/Title';
import { createI18nInstance } from 'src/utils/i18n.utils';
import { type APP_LOCALES } from 'pm-shared/translations';

type CandidateApplicationReceivedEmailProps = {
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  companyName: string;
  serverUrl: string;
  locale: keyof typeof APP_LOCALES;
};

export const CandidateApplicationReceivedEmail = ({
  candidateName,
  candidateEmail,
  jobTitle,
  companyName,
  serverUrl,
  locale,
}: CandidateApplicationReceivedEmailProps) => {
  const i18n = createI18nInstance(locale);

  return (
    <BaseEmail width={333} locale={locale}>
      <Title value={i18n._('New Application Received')} />
      <MainText>
        {i18n._(`A new candidate has applied for ${jobTitle} at ${companyName}.`)}
      </MainText>
      <HighlightedContainer>
        <HighlightedText
          value={candidateName}
        />
        <MainText>
          <span
            style={{
              color: emailTheme.font.colors.primary,
              fontSize: emailTheme.font.size.sm,
            }}
          >
            {candidateEmail}
          </span>
        </MainText>
        <MainText>
          <span
            style={{
              color: emailTheme.font.colors.tertiary,
              fontSize: emailTheme.font.size.sm,
            }}
          >
            {i18n._(`Applied for: ${jobTitle}`)}
          </span>
        </MainText>
        <CallToAction
          href={`${serverUrl}/objects/candidates`}
          value={i18n._('View Candidates')}
        />
      </HighlightedContainer>
    </BaseEmail>
  );
};

CandidateApplicationReceivedEmail.PreviewProps = {
  candidateName: 'Jane Smith',
  candidateEmail: 'jane.smith@example.com',
  jobTitle: 'Senior Software Engineer',
  companyName: 'Acme Inc.',
  serverUrl: 'https://app.persistentmomentum.com',
  locale: 'en',
} as CandidateApplicationReceivedEmailProps;

export default CandidateApplicationReceivedEmail;
