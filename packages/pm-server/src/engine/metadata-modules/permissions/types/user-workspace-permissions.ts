import { type ObjectsPermissions } from 'pm-shared/types';
import { type PermissionFlagType } from 'pm-shared/constants';

export type UserWorkspacePermissions = {
  permissionFlags: Record<PermissionFlagType, boolean>;
  objectsPermissions: ObjectsPermissions;
};
