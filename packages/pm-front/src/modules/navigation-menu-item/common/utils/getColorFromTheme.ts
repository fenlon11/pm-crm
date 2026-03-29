import { themeCssVariables } from 'pm-ui/theme-constants';
import { type ThemeColor } from 'pm-ui/theme';

export const getColorFromTheme = (
  themeColor: ThemeColor,
  shade: number,
): string => {
  const colorMap = themeCssVariables.color as unknown as Record<string, string>;
  const tagText = themeCssVariables.tag.text as unknown as Record<
    string,
    string
  >;
  const key = `${themeColor}${shade}`;
  return colorMap[key] ?? tagText[themeColor];
};
