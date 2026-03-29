import { PermissionFlagType } from 'pm-shared/constants';

export type CreatePermissionFlagInput = {
  roleId: string;
  flag: PermissionFlagType;
  universalIdentifier?: string;
};
