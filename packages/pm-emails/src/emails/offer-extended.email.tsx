import { BaseEmail } from 'src/components/BaseEmail';
import { CallToAction } from 'src/components/CallToAction';
import { HighlightedContainer } from 'src/components/HighlightedContainer';
import { HighlightedText } from 'src/components/HighlightedText';
import { MainText } from 'src/components/MainText';
import { Title } from 'src/components/Title';
import { createI18nInstance } from 'src/utils/i18n.utils';
import { type APP_LOCALES } from 'pm-shared/translations';

type OfferExtendedEmailProps = {
  candidateName: string;
  jobTitle: string;
  companyName: string;
  locale: keyof typeof APP_LOCALES;
};

export const OfferExtendedEmail = ({
  candidateName,
  jobTitle,
  companyName,
  locale,
}: OfferExtendedEmailProps) => {
  const i18n = createI18nInstance(locale);

  return (
    <BaseEmail width={333} locale={locale}>
      <Title value={i18n._('Offer Extended')} />
      <MainText>
        Hi {candidateName},
        <br />
        <br />
        We are thrilled to extend an offer for the{' '}
        <strong>{jobTitle}</strong> role at <strong>{companyName}</strong>!
        <br />
        <br />
        After reviewing your background and our conversations, we are confident
        you would be an excellent addition to our team. Please review the offer
        details and let us know if you have any questions.
      </MainText>
      <HighlightedContainer>
        <HighlightedText value={`Offer: ${jobTitle}`} />
        <MainText>{companyName}</MainText>
      </HighlightedContainer>
      <br />
      <MainText>
        We are excited about the possibility of you joining us. Please respond
        at your earliest convenience.
        <br />
        <br />
        Congratulations and we hope to welcome you to the team soon!
        <br />
        <br />
        Best regards,
        <br />
        The {companyName} Recruiting Team
      </MainText>
    </BaseEmail>
  );
};

OfferExtendedEmail.PreviewProps = {
  candidateName: 'Jane Smith',
  jobTitle: 'Senior Software Engineer',
  companyName: 'Acme Corp',
  locale: 'en',
} as OfferExtendedEmailProps;

export default OfferExtendedEmail;
