import type React from 'react';
import { ColorSchemeProvider } from 'pm-ui/theme-constants';

type ThemeContextProps = {
  children: React.ReactNode;
};

export const ThemeContext = ({ children }: ThemeContextProps) => {
  return (
    <ColorSchemeProvider colorScheme="dark">{children}</ColorSchemeProvider>
  );
};
