import { type ThemeColor } from 'pm-ui/theme';
import { themeColorSchema } from 'pm-ui/utilities';

import { DEFAULT_NAV_ITEM_ICON_COLOR } from '@/navigation-menu-item/common/constants/NavigationMenuItemDefaultIconColor.constant';

export const parseThemeColor = (
  color: string | null | undefined,
): ThemeColor => {
  const result = themeColorSchema.safeParse(color ?? '');
  return result.success ? result.data : DEFAULT_NAV_ITEM_ICON_COLOR;
};
