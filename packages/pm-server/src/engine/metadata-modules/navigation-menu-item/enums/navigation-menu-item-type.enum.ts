import { registerEnumType } from '@nestjs/graphql';

import { NavigationMenuItemType } from 'pm-shared/types';

registerEnumType(NavigationMenuItemType, {
  name: 'NavigationMenuItemType',
});

export { NavigationMenuItemType };
