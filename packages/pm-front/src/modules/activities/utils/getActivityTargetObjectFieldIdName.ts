import { capitalize } from 'pm-shared/utils';

export const getActivityTargetObjectFieldIdName = ({
  nameSingular,
  isMorphRelation = false,
}: {
  nameSingular: string;
  isMorphRelation?: boolean;
}) => {
  if (isMorphRelation) {
    return `target${capitalize(nameSingular)}Id`;
  }

  return `${nameSingular}Id`;
};
