import { SettingsPath } from 'pm-shared/types';
import { getSettingsPath } from 'pm-shared/utils';

export const AI_ADMIN_PATH = getSettingsPath(
  SettingsPath.AdminPanel,
  undefined,
  undefined,
  'ai',
);
