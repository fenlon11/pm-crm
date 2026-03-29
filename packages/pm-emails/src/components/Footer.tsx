import { type I18n } from '@lingui/core';
import { Column, Container, Row } from '@react-email/components';
import { Link } from 'src/components/Link';
import { ShadowText } from 'src/components/ShadowText';

const footerContainerStyle = {
  marginTop: '12px',
};

type FooterProps = {
  i18n: I18n;
};

export const Footer = ({ i18n }: FooterProps) => {
  return (
    <Container style={footerContainerStyle}>
      <Row>
        <Column>
          <ShadowText>
            <Link
              href="https://persistentmomentum.com/"
              value={i18n._('Website')}
              aria-label={i18n._("Visit Persistent Momentum's website")}
            />
          </ShadowText>
        </Column>
        <Column>
          <ShadowText>
            <Link
              href="https://github.com/persistent-momentum/pm-crm"
              value={i18n._('Github')}
              aria-label={i18n._("Visit Persistent Momentum's GitHub repository")}
            />
          </ShadowText>
        </Column>
        <Column>
          <ShadowText>
            <Link
              href="https://persistentmomentum.com/docs/user-guide/introduction"
              value={i18n._('User guide')}
              aria-label={i18n._("Read Persistent Momentum's user guide")}
            />
          </ShadowText>
        </Column>
        <Column>
          <ShadowText>
            <Link
              href="https://persistentmomentum.com/docs/"
              value={i18n._('Developers')}
              aria-label={i18n._("Visit Persistent Momentum's developer documentation")}
            />
          </ShadowText>
        </Column>
      </Row>
      <ShadowText>
        <>
          {i18n._('Persistent Momentum, Inc.')}
          <br />
          {i18n._('San Francisco / Paris')}
        </>
      </ShadowText>
    </Container>
  );
};
