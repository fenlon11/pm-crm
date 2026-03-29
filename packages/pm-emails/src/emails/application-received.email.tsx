import { BaseEmail } from 'src/components/BaseEmail';
import { CallToAction } from 'src/components/CallToAction';
import { HighlightedContainer } from 'src/components/HighlightedContainer';
import { HighlightedText } from 'src/components/HighlightedText';
import { MainText } from 'src/components/MainText';
import { Title } from 'src/components/Title';
import { createI18nInstance } from 'src/utils/i18n.utils';
import { type APP_LOCALES } from 'pm-shared/translations';

type ApplicationReceivedEmailProps = {
  candidateName: string;
  jobTitle: string;
  companyName: string;
  locale: keyof typeof APP_LOCALES;
};

export const ApplicationReceivedEmail = ({
  candidateName,
  jobTitle,
  companyName,
  locale,
}: ApplicationReceivedEmailProps) => {
  const i18n = createI18nInstance(locale);

  return (
    <BaseEmail width={333} locale={locale}>
      <Title value={i18n._('Application Received')} />
      <MainText>
        Hi {candidateName},
        <br />
        <br />
        Thank you for applying to the <strong>{jobTitle}</strong> position at{' '}
        <strong>{companyName}</strong>. We have received your application and our
        team will review it shortly.
        <br />
        <br />
        We will be in touch with next steps. In the meantime, feel free to reach
        out if you have any questions.
      </MainText>
      <HighlightedContainer>
        <HighlightedText value={jobTitle} />
        <MainText>
          {companyName}
        </MainText>
      </HighlightedContainer>
      <br />
      <MainText>
        Best regards,
        <br />
        The {companyName} Recruiting Team
      </MainText>
    </BaseEmail>
  );
};

ApplicationReceivedEmail.PreviewProps = {
  candidateName: 'Jane Smith',
  jobTitle: 'Senior Software Engineer',
  companyName: 'Acme Corp',
  locale: 'en',
} as ApplicationReceivedEmailProps;

export default ApplicationReceivedEmail;
