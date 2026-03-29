import { emailTheme } from 'src/common-style';

import { BaseEmail } from 'src/components/BaseEmail';
import { CallToAction } from 'src/components/CallToAction';
import { HighlightedContainer } from 'src/components/HighlightedContainer';
import { HighlightedText } from 'src/components/HighlightedText';
import { MainText } from 'src/components/MainText';
import { Title } from 'src/components/Title';
import { createI18nInstance } from 'src/utils/i18n.utils';
import { type APP_LOCALES } from 'pm-shared/translations';

type CandidateInterviewScheduledEmailProps = {
  candidateName: string;
  jobTitle: string;
  companyName: string;
  interviewDate: string;
  interviewDetails?: string;
  serverUrl: string;
  locale: keyof typeof APP_LOCALES;
};

export const CandidateInterviewScheduledEmail = ({
  candidateName,
  jobTitle,
  companyName,
  interviewDate,
  interviewDetails,
  serverUrl,
  locale,
}: CandidateInterviewScheduledEmailProps) => {
  const i18n = createI18nInstance(locale);

  return (
    <BaseEmail width={333} locale={locale}>
      <Title value={i18n._('Interview Scheduled')} />
      <MainText>
        {i18n._(`Hi ${candidateName}, your interview for ${jobTitle} at ${companyName} has been scheduled.`)}
      </MainText>
      <HighlightedContainer>
        <HighlightedText value={i18n._('Interview Details')} />
        <MainText>
          <span
            style={{
              color: emailTheme.font.colors.primary,
              fontSize: emailTheme.font.size.md,
              fontWeight: emailTheme.font.weight.bold,
            }}
          >
            {interviewDate}
          </span>
        </MainText>
        {interviewDetails ? (
          <MainText>
            <span
              style={{
                color: emailTheme.font.colors.primary,
                fontSize: emailTheme.font.size.sm,
              }}
            >
              {interviewDetails}
            </span>
          </MainText>
        ) : null}
        <CallToAction
          href={serverUrl}
          value={i18n._('View Details')}
        />
      </HighlightedContainer>
      <MainText>
        {i18n._('If you have any questions, please reply to this email.')}
      </MainText>
    </BaseEmail>
  );
};

CandidateInterviewScheduledEmail.PreviewProps = {
  candidateName: 'Jane Smith',
  jobTitle: 'Senior Software Engineer',
  companyName: 'Acme Inc.',
  interviewDate: 'Monday, April 14, 2026 at 2:00 PM EST',
  interviewDetails: 'Video call via Google Meet. Link will be sent 30 minutes before.',
  serverUrl: 'https://app.persistentmomentum.com',
  locale: 'en',
} as CandidateInterviewScheduledEmailProps;

export default CandidateInterviewScheduledEmail;
