import { CoreObjectNameSingular, NavigationMenuItemType } from 'pm-shared/types';
import { isDefined } from 'pm-shared/utils';
import { type NavigationMenuItem } from '~/generated-metadata/graphql';

import { isNavigationMenuItemFolder } from '@/navigation-menu-item/common/utils/isNavigationMenuItemFolder';
import { getObjectMetadataForNavigationMenuItem } from '@/navigation-menu-item/display/object/utils/getObjectMetadataForNavigationMenuItem';
import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { getObjectPermissionsForObject } from '@/object-metadata/utils/getObjectPermissionsForObject';
import { type ViewWithRelations } from '@/views/types/ViewWithRelations';

// Persistent Recruiter: objects that must never appear in the sidebar.
// Using a frontend filter (not metadata deactivation) to avoid breaking the
// auth cache rebuild. Keep visible: candidate, company, job, task, opportunity
// (rendered as the Pipeline view).
const PR_SIDEBAR_HIDDEN_OBJECTS = new Set<string>([
  // Standard Twenty objects not relevant to recruiting
  CoreObjectNameSingular.Person,
  CoreObjectNameSingular.Note,
  CoreObjectNameSingular.Dashboard,
  // Workflow plumbing — visible via Settings, not the main nav
  CoreObjectNameSingular.Workflow,
  CoreObjectNameSingular.WorkflowVersion,
  CoreObjectNameSingular.WorkflowRun,
  // Custom PR objects — SHOWN in sidebar (candidate, company, job, application, form, video, page)
  // 'form', 'page', 'video', 'application' — REMOVED from hidden list, these are core PR features
  // Demo objects (not currently in DB, but blocked defensively)
  'pet',
  'petCareAgreement',
  'rocket',
  'surveyResult',
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
