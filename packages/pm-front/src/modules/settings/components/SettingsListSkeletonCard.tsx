import { styled } from '@linaria/react';
import { Card } from 'pm-ui/layout';
import { themeCssVariables } from 'pm-ui/theme-constants';

const StyledCardContainer = styled.div`
  height: 40px;

  > * {
    background-color: ${themeCssVariables.background.secondary};
    height: 100%;
  }
`;

export const SettingsListSkeletonCard = () => (
  <StyledCardContainer>
    <Card />
  </StyledCardContainer>
);
