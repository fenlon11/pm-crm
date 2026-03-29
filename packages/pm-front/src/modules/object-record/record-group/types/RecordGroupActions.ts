import { type IconComponent } from 'pm-ui/display';

export type RecordGroupAction = {
  id: string;
  label: string;
  icon: IconComponent;
  position: number;
  callback: () => void;
  condition?: boolean;
};
