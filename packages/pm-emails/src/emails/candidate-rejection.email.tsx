import { emailTheme } from 'src/common-style';

import { BaseEmail } from 'src/components/BaseEmail';
import { MainText } from 'src/components/MainText';
import { Title } from 'src/components/Title';
import { createI18nInstance } from 'src/utils/i18n.utils';
import { type APP_LOCALES } from 'pm-shared/translations';

type CandidateRejectionEmailProps = {
  candidateName: string;
  jobTitle: string;
  companyName: string;
  locale: keyof typeof APP_LOCALES;
};

export const CandidateRejectionEmail = ({
  candidateName,
  jobTitle,
  companyName,
  locale,
}: CandidateRejectionEmailProps) => {
  const i18n = createI18nInstance(locale);

  return (
    <BaseEmail width={333} locale={locale}>
      <Title value={i18n._('Update on Your Application')} />
      <MainText>
        {i18n._(`Dear ${candidateName},`)}
      </MainText>
      <MainText>
        {i18n._(`Thank you for your interest in the ${jobTitle} position at ${companyName} and for taking the time to go through our process.`)}
      </MainText>
      <MainText>
        {i18n._('After careful consideration, we have decided to move forward with other candidates whose experience more closely matches our current needs.')}
      </MainText>
      <MainText>
        <span
          style={{
            color: emailTheme.font.colors.primary,
            fontSize: emailTheme.font.size.sm,
          }}
        >
          {i18n._('We appreciate the time you invested and wish you the very best in your career search.')}
        </span>
      </MainText>
    </BaseEmail>
  );
};

CandidateRejectionEmail.PreviewProps = {
  candidateName: 'Jane Smith',
  jobTitle: 'Senior Software Engineer',
  companyName: 'Acme Inc.',
  locale: 'en',
} as CandidateRejectionEmailProps;

export default CandidateRejectionEmail;
