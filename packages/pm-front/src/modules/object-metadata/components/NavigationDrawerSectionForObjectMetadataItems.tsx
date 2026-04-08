import { NavigationDrawerItemForObjectMetadataItem } from '@/navigation-menu-item/display/object/components/NavigationDrawerItemForObjectMetadataItem';
import { CoreObjectNameSingular } from 'pm-shared/types';
import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { getObjectPermissionsForObject } from '@/object-metadata/utils/getObjectPermissionsForObject';
import { useObjectPermissions } from '@/object-record/hooks/useObjectPermissions';
import { NavigationDrawerAnimatedCollapseWrapper } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerAnimatedCollapseWrapper';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { NavigationDrawerSectionTitle } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSectionTitle';
import { useNavigationSection } from '@/ui/navigation/navigation-drawer/hooks/useNavigationSection';
import { isNavigationSectionOpenFamilyState } from '@/ui/navigation/navigation-drawer/states/isNavigationSectionOpenFamilyState';
import { useAtomFamilyStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomFamilyStateValue';
import { isDefined } from 'pm-shared/utils';

// Persistent Recruiter sidebar order for the layout customization editor.
// Custom objects (candidate, job, etc.) are coerced into this ordering by
// being listed here alongside standard objects.
const ORDERED_FIRST_STANDARD_OBJECTS: string[] = [
  'candidate',
  CoreObjectNameSingular.Company,
  'job',
  'application',
  'form',
  'video',
  'page',
  CoreObjectNameSingular.Workflow,
  // Legacy Twenty defaults — deactivated in this workspace but kept so they
  // sort deterministically if ever re-enabled.
  CoreObjectNameSingular.Person,
  CoreObjectNameSingular.Opportunity,
  CoreObjectNameSingular.Task,
  CoreObjectNameSingular.Note,
];

const ORDERED_LAST_STANDARD_OBJECTS: string[] = [
  CoreObjectNameSingular.Dashboard,
];
// PR sidebar: hide legacy Twenty objects that are replaced by custom PR objects
const HIDDEN_FROM_SIDEBAR: string[] = [
  CoreObjectNameSingular.Person,      // replaced by 'candidate' (future)
  CoreObjectNameSingular.Opportunity,  // replaced by 'job' (future)
  CoreObjectNameSingular.Note,         // not used in PR
];


type NavigationDrawerSectionForObjectMetadataItemsProps = {
  sectionTitle: string;
  objectMetadataItems: EnrichedObjectMetadataItem[];
  rightIcon?: React.ReactNode;
  selectedObjectMetadataItemId?: string | null;
  onObjectMetadataItemClick?: (
    objectMetadataItem: EnrichedObjectMetadataItem,
  ) => void;
  onActiveObjectMetadataItemClick?: (
    objectMetadataItem: EnrichedObjectMetadataItem,
  ) => void;
};

export const NavigationDrawerSectionForObjectMetadataItems = ({
  sectionTitle,
  objectMetadataItems,
  rightIcon,
  selectedObjectMetadataItemId = null,
  onObjectMetadataItemClick,
  onActiveObjectMetadataItemClick,
}: NavigationDrawerSectionForObjectMetadataItemsProps) => {
  const navigationSectionId = 'ObjectsWorkspace';
  const { toggleNavigationSection } = useNavigationSection(navigationSectionId);
  const isNavigationSectionOpen = useAtomFamilyStateValue(
    isNavigationSectionOpenFamilyState,
    navigationSectionId,
  );

  const { objectPermissionsByObjectMetadataId } = useObjectPermissions();

  const sortedStandardObjectMetadataItems = [...objectMetadataItems]
    .filter(
      (item) =>
        ORDERED_FIRST_STANDARD_OBJECTS.includes(item.nameSingular) &&
        !ORDERED_LAST_STANDARD_OBJECTS.includes(item.nameSingular),
    )
    .sort((objectMetadataItemA, objectMetadataItemB) => {
      const indexA = ORDERED_FIRST_STANDARD_OBJECTS.indexOf(
        objectMetadataItemA.nameSingular,
      );
      const indexB = ORDERED_FIRST_STANDARD_OBJECTS.indexOf(
        objectMetadataItemB.nameSingular,
      );
      if (indexA === -1 || indexB === -1) {
        return objectMetadataItemA.nameSingular.localeCompare(
          objectMetadataItemB.nameSingular,
        );
      }
      return indexA - indexB;
    });

  const sortedCustomObjectMetadataItems = [...objectMetadataItems]
    .filter(
      (item) =>
        !ORDERED_FIRST_STANDARD_OBJECTS.includes(item.nameSingular) &&
        !ORDERED_LAST_STANDARD_OBJECTS.includes(item.nameSingular),
    )
    .sort((objectMetadataItemA, objectMetadataItemB) => {
      return new Date(objectMetadataItemA.createdAt) <
        new Date(objectMetadataItemB.createdAt)
        ? 1
        : -1;
    });

  const sortedLastStandardObjectMetadataItems =
    ORDERED_LAST_STANDARD_OBJECTS.map((nameSingular) => {
      return objectMetadataItems.find(
        (item) => item.nameSingular === nameSingular,
      );
    }).filter(isDefined);

  const objectMetadataItemsForNavigationItems = [
    ...sortedStandardObjectMetadataItems,
    ...sortedCustomObjectMetadataItems,
    ...sortedLastStandardObjectMetadataItems,
  ].filter(item => !HIDDEN_FROM_SIDEBAR.includes(item.nameSingular));

  const objectMetadataItemsForNavigationItemsWithReadPermission =
    objectMetadataItemsForNavigationItems.filter(
      (objectMetadataItem) =>
        getObjectPermissionsForObject(
          objectPermissionsByObjectMetadataId,
          objectMetadataItem.id,
        ).canReadObjectRecords,
    );

  return (
    objectMetadataItems.length > 0 && (
      <NavigationDrawerSection>
        <NavigationDrawerAnimatedCollapseWrapper>
          <NavigationDrawerSectionTitle
            label={sectionTitle}
            onClick={() => toggleNavigationSection()}
            rightIcon={rightIcon}
            isOpen={isNavigationSectionOpen}
          />
        </NavigationDrawerAnimatedCollapseWrapper>
        {isNavigationSectionOpen &&
          objectMetadataItemsForNavigationItemsWithReadPermission.map(
            (objectMetadataItem) => (
              <NavigationDrawerItemForObjectMetadataItem
                key={`navigation-drawer-item-${objectMetadataItem.id}`}
                objectMetadataItem={objectMetadataItem}
                isSelectedInEditMode={
                  selectedObjectMetadataItemId === objectMetadataItem.id
                }
                onEditModeClick={
                  onObjectMetadataItemClick
                    ? () => onObjectMetadataItemClick(objectMetadataItem)
                    : undefined
                }
                onActiveItemClickWhenNotInEditMode={
                  onActiveObjectMetadataItemClick
                    ? () => onActiveObjectMetadataItemClick(objectMetadataItem)
                    : undefined
                }
              />
            ),
          )}
      </NavigationDrawerSection>
    )
  );
};
