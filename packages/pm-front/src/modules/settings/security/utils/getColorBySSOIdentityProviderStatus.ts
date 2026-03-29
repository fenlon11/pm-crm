import { type SsoIdentityProviderStatus } from '~/generated-metadata/graphql';
import { type ThemeColor } from 'pm-ui/theme';

export const getColorBySSOIdentityProviderStatus: Record<
  SsoIdentityProviderStatus,
  ThemeColor
> = {
  Active: 'green',
  Inactive: 'gray',
  Error: 'red',
};
