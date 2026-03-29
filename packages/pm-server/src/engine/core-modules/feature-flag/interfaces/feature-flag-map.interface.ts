import { type FeatureFlagKey } from 'pm-shared/types';

export type FeatureFlagMap = Record<`${FeatureFlagKey}`, boolean>;
