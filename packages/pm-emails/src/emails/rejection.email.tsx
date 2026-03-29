import { BaseEmail } from 'src/components/BaseEmail';
import { MainText } from 'src/components/MainText';
import { Title } from 'src/components/Title';
import { createI18nInstance } from 'src/utils/i18n.utils';
import { type APP_LOCALES } from 'pm-shared/translations';

type RejectionEmailProps = {
  candidateName: string;
  jobTitle: string;
  companyName: string;
  locale: keyof typeof APP_LOCALES;
};

export const RejectionEmail = ({
  candidateName,
  jobTitle,
  companyName,
  locale,
}: RejectionEmailProps) => {
  const i18n = createI18nInstance(locale);

  return (
    <BaseEmail width={333} locale={locale}>
      <Title value={i18n._('Application Update')} />
      <MainText>
        Hi {candidateName},
        <br />
        <br />
        Thank you for your interest in the <strong>{jobTitle}</strong> position
        at <strong>{companyName}</strong> and for taking the time to apply.
        <br />
        <br />
        After careful consideration, we have decided to move forward with other
        candidates whose experience more closely matches the current needs of the
        role. This was a difficult decision given the strength of applicants we
        received.
        <br />
        <br />
        We appreciate you considering {companyName} as a potential employer and
        encourage you to apply for future openings that align with your skills
        and experience.
        <br />
        <br />
        We wish you the best in your job search.
        <br />
        <br />
        Best regards,
        <br />
        The {companyName} Recruiting Team
      </MainText>
    </BaseEmail>
  );
};

RejectionEmail.PreviewProps = {
  candidateName: 'Jane Smith',
  jobTitle: 'Senior Software Engineer',
  companyName: 'Acme Corp',
  locale: 'en',
} as RejectionEmailProps;

export default RejectionEmail;
