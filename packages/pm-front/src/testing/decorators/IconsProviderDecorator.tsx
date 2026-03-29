import { type Decorator } from '@storybook/react-vite';
import { IconsProvider } from 'pm-ui/display';

export const IconsProviderDecorator: Decorator = (Story) => {
  return (
    <IconsProvider>
      <Story />
    </IconsProvider>
  );
};
