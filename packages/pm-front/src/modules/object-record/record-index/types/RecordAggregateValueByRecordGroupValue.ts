import { type Nullable } from 'pm-shared/types';

export type RecordAggregateValueByRecordGroupValue = {
  recordGroupValue: string;
  recordAggregateValue: Nullable<string | number>;
};
