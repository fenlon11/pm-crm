import { type Preview } from '@storybook/react-vite';
import { ThemeProvider } from 'pm-ui/theme-constants';

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <ThemeProvider colorScheme="light">
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
