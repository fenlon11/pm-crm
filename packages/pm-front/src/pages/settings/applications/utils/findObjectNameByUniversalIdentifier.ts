import { STANDARD_OBJECTS } from 'pm-shared/metadata';

export const findObjectNameByUniversalIdentifier = (
  universalIdentifier: string,
): string | undefined => {
  for (const [objectName, objectConfig] of Object.entries(STANDARD_OBJECTS)) {
    if (objectConfig.universalIdentifier === universalIdentifier) {
      return objectName;
    }
  }

  return undefined;
};
