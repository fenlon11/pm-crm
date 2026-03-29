import { type ObjectRecord as SharedObjectRecord } from 'pm-shared/types';

export type BaseObjectRecord = SharedObjectRecord & {
  __typename: string;
};
