import { emailTheme } from 'src/common-style';

import { BaseEmail } from 'src/components/BaseEmail';
import { CallToAction } from 'src/components/CallToAction';
import { HighlightedContainer } from 'src/components/HighlightedContainer';
import { HighlightedText } from 'src/components/HighlightedText';
import { MainText } from 'src/components/MainText';
import { Title } from 'src/components/Title';
import { createI18nInstance } from 'src/utils/i18n.utils';
import { type APP_LOCALES } from 'pm-shared/translations';

type CandidateOfferExtendedEmailProps = {
  candidateName: string;
  jobTitle: string;
  companyName: string;
  offerDeadline?: string;
  serverUrl: string;
  locale: keyof typeof APP_LOCALES;
};

export const CandidateOfferExtendedEmail = ({
  candidateName,
  jobTitle,
  companyName,
  offerDeadline,
  serverUrl,
  locale,
}: CandidateOfferExtendedEmailProps) => {
  const i18n = createI18nInstance(locale);

  return (
    <BaseEmail width={333} locale={locale}>
      <Title value={i18n._('Offer Extended 🎉')} />
      <MainText>
        {i18n._(`Congratulations ${candidateName}! We are excited to extend you an offer for the ${jobTitle} position at ${companyName}.`)}
      </MainText>
      <HighlightedContainer>
        <HighlightedText value={i18n._('Next Steps')} />
        <MainText>
          <span
            style={{
              color: emailTheme.font.colors.primary,
              fontSize: emailTheme.font.size.sm,
            }}
          >
            {i18n._('Please review the offer details and respond at your earliest convenience.')}
          </span>
        </MainText>
        {offerDeadline ? (
          <MainText>
            <span
              style={{
                color: emailTheme.font.colors.highlighted,
                fontSize: emailTheme.font.size.sm,
                fontWeight: emailTheme.font.weight.bold,
              }}
            >
              {i18n._(`Offer expires: ${offerDeadline}`)}
            </span>
          </MainText>
        ) : null}
        <CallToAction
          href={serverUrl}
          value={i18n._('View Offer')}
        />
      </HighlightedContainer>
      <MainText>
        {i18n._('We look forward to welcoming you to the team!')}
      </MainText>
    </BaseEmail>
  );
};

CandidateOfferExtendedEmail.PreviewProps = {
  candidateName: 'Jane Smith',
  jobTitle: 'Senior Software Engineer',
  companyName: 'Acme Inc.',
  offerDeadline: 'April 21, 2026',
  serverUrl: 'https://app.persistentmomentum.com',
  locale: 'en',
} as CandidateOfferExtendedEmailProps;

export default CandidateOfferExtendedEmail;
