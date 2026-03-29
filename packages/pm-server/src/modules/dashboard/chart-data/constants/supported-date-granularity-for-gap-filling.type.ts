import { type ObjectRecordGroupByDateGranularity } from 'pm-shared/types';

export type SupportedDateGranularityForGapFilling =
  | ObjectRecordGroupByDateGranularity.DAY
  | ObjectRecordGroupByDateGranularity.MONTH
  | ObjectRecordGroupByDateGranularity.QUARTER
  | ObjectRecordGroupByDateGranularity.YEAR
  | ObjectRecordGroupByDateGranularity.WEEK;
