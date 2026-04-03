import { CoreObjectNameSingular, NavigationMenuItemType } from 'pm-shared/types';
import { isDefined } from 'pm-shared/utils';
import { type NavigationMenuItem } from '~/generated-metadata/graphql';

import { isNavigationMenuItemFolder } from '@/navigation-menu-item/common/utils/isNavigationMenuItemFolder';
import { getObjectMetadataForNavigationMenuItem } from '@/navigation-menu-item/display/object/utils/getObjectMetadataForNavigationMenuItem';
import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { getObjectPermissionsForObject } from '@/object-metadata/utils/getObjectPermissionsForObject';
import { type ViewWithRelations } from '@/views/types/ViewWithRelations';

// Persistent Recruiter: these legacy Twenty objects exist in metadata but
// must never appear in the sidebar. Deactivating them via metadata breaks
// the auth cache rebuild, so we hide them in the frontend only.
const PR_SIDEBAR_HIDDEN_OBJECTS = new Set<string>([
  CoreObjectNameSingular.Person,
  CoreObjectNameSingular.Opportunity,
  CoreObjectNameSingular.Task,
  CoreObjectNameSingular.Note,
  CoreObjectNameSingular.Dashboard,
]);

type GetWorkspaceSidebarOrphanItemsInDisplayOrderArgs = {
  workspaceNavigationMenuItems: NavigationMenuItem[];
  workspaceNavigationMenuItemsSorted: NavigationMenuItem[];
  objectMetadataItems: EnrichedObjectMetadataItem[];
  views: ViewWithRelations[];
  objectPermissionsByObjectMetadataId: Parameters<
    typeof getObjectPermissionsForObject
  >[0];
};

export const getWorkspaceSidebarOrphanItemsInDisplayOrder = ({
  workspaceNavigationMenuItems,
  workspaceNavigationMenuItemsSorted,
  objectMetadataItems,
  views,
  objectPermissionsByObjectMetadataId,
}: GetWorkspaceSidebarOrphanItemsInDisplayOrderArgs): NavigationMenuItem[] => {
  const flatWorkspaceItems = workspaceNavigationMenuItems
    .filter((item) => !isDefined(item.folderId))
    .sort((a, b) => a.position - b.position);

  const processedItemsById = new Map(
    workspaceNavigationMenuItemsSorted.map((item) => [item.id, item]),
  );

  return flatWorkspaceItems.reduce<NavigationMenuItem[]>((acc, item) => {
    if (isNavigationMenuItemFolder(item)) {
      // Persistent Recruiter doesn't use nav folders — skip them so their
      // contents don't appear as parent-child entries in the sidebar.
      // Children (which have folderId set) are already excluded from
      // flatWorkspaceItems, so they disappear automatically.
      return acc;
    } else {
      const validItem = processedItemsById.get(item.id);
      if (!isDefined(validItem)) {
        return acc;
      }
      if (validItem.type === NavigationMenuItemType.LINK) {
        acc.push(validItem);
      } else {
        const objectMetadataItem = getObjectMetadataForNavigationMenuItem(
          validItem,
          objectMetadataItems,
          views,
        );
        if (
          isDefined(objectMetadataItem) &&
          !PR_SIDEBAR_HIDDEN_OBJECTS.has(objectMetadataItem.nameSingular) &&
          getObjectPermissionsForObject(
            objectPermissionsByObjectMetadataId,
            objectMetadataItem.id,
          ).canReadObjectRecords
        ) {
          acc.push(validItem);
        }
      }
    }
    return acc;
  }, []);
};
