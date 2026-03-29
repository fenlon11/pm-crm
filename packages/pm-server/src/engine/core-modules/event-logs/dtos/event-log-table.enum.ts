import { registerEnumType } from '@nestjs/graphql';

import { EventLogTable } from 'pm-shared/types';

export const registerEventLogTableEnum = () => {
  registerEnumType(EventLogTable, {
    name: 'EventLogTable',
  });
};

export { EventLogTable };
