import { capitalize } from 'pm-shared/utils';
export const getObjectTypename = (objectNameSingular: string) => {
  return capitalize(objectNameSingular);
};
