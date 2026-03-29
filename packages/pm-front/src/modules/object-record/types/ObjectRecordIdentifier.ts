import { type AvatarType } from 'pm-ui/display';
export type ObjectRecordIdentifier = {
  id: string;
  name: string;
  avatarUrl?: string;
  avatarType?: AvatarType | null;
  linkToShowPage?: string;
};
