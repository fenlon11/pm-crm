import { type ApplicationManifest } from 'pm-shared/application';

export type ApplicationConfig = Omit<
  ApplicationManifest,
  | 'packageJsonChecksum'
  | 'yarnLockChecksum'
  | 'postInstallLogicFunctionUniversalIdentifier'
  | 'preInstallLogicFunctionUniversalIdentifier'
>;
