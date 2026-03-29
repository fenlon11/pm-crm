import { AUTH_MODAL_CONFIG } from '@/auth/constants/AuthModalConfig';
import { type Location } from 'react-router-dom';
import { AppPath } from 'pm-shared/types';
import { isDefined } from 'pm-shared/utils';
import { isMatchingLocation } from '~/utils/isMatchingLocation';

export const getAuthModalConfig = (location: Location) => {
  for (const path of Object.values(AppPath)) {
    if (
      isMatchingLocation(location, path) &&
      isDefined(AUTH_MODAL_CONFIG[path])
    ) {
      return AUTH_MODAL_CONFIG[path];
    }
  }

  return AUTH_MODAL_CONFIG.default;
};
