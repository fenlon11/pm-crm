import { BaseEmail } from 'src/components/BaseEmail';
import { HighlightedContainer } from 'src/components/HighlightedContainer';
import { HighlightedText } from 'src/components/HighlightedText';
import { MainText } from 'src/components/MainText';
import { Title } from 'src/components/Title';
import { createI18nInstance } from 'src/utils/i18n.utils';
import { type APP_LOCALES } from 'pm-shared/translations';

type InterviewScheduledEmailProps = {
  candidateName: string;
  jobTitle: string;
  companyName: string;
  interviewDate: string;
  locale: keyof typeof APP_LOCALES;
};

export const InterviewScheduledEmail = ({
  candidateName,
  jobTitle,
  companyName,
  interviewDate,
  locale,
}: InterviewScheduledEmailProps) => {
  const i18n = createI18nInstance(locale);

  return (
    <BaseEmail width={333} locale={locale}>
      <Title value={i18n._('Interview Scheduled')} />
      <MainText>
        Hi {candidateName},
        <br />
        <br />
        Great news! We would like to move forward with your application for the{' '}
        <strong>{jobTitle}</strong> position at <strong>{companyName}</strong>.
        <br />
        <br />
        Your interview has been scheduled for:
      </MainText>
      <HighlightedContainer>
        <HighlightedText value={interviewDate} />
        <MainText>{jobTitle} — {companyName}</MainText>
      </HighlightedContainer>
      <br />
      <MainText>
        Please confirm your availability by replying to this email. If you need
        to reschedule, let us know as soon as possible.
        <br />
        <br />
        We look forward to speaking with you!
        <br />
        <br />
        Best regards,
        <br />
        The {companyName} Recruiting Team
      </MainText>
    </BaseEmail>
  );
};

InterviewScheduledEmail.PreviewProps = {
  candidateName: 'Jane Smith',
  jobTitle: 'Senior Software Engineer',
  companyName: 'Acme Corp',
  interviewDate: 'Monday, April 7, 2026 at 2:00 PM ET',
  locale: 'en',
} as InterviewScheduledEmailProps;

export default InterviewScheduledEmail;
