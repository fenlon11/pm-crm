import {
  type ObjectRecordGroupByDateGranularity,
  type FirstDayOfTheWeek,
} from 'pm-shared/types';

export type DateFieldGroupByDefinition = {
  granularity: ObjectRecordGroupByDateGranularity;
  weekStartDay?: FirstDayOfTheWeek;
  timeZone?: string;
};
