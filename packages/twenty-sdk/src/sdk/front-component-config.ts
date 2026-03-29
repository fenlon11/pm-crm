import {
  type FrontComponentCommandManifest,
  type FrontComponentManifest,
} from 'pm-shared/application';

export type FrontComponentType = React.ComponentType<any>;

export type FrontComponentCommandConfig = Omit<
  FrontComponentCommandManifest,
  'conditionalAvailabilityExpression'
> & {
  conditionalAvailabilityExpression?: boolean | string;
};

export type FrontComponentConfig = Omit<
  FrontComponentManifest,
  | 'sourceComponentPath'
  | 'builtComponentPath'
  | 'builtComponentChecksum'
  | 'componentName'
  | 'usesSdkClient'
  | 'command'
> & {
  component: FrontComponentType;
  command?: FrontComponentCommandConfig;
};
