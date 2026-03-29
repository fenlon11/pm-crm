import { type Meta, type StoryObj } from '@storybook/react-vite';

import {
  IconCheckbox,
  IconList,
  IconSearch,
  IconSettings,
} from 'pm-ui/display';
import { NavigationBar } from 'pm-ui/navigation';
import { ComponentDecorator } from 'pm-ui/testing';
import { ComponentWithRouterDecorator } from '~/testing/decorators/ComponentWithRouterDecorator';

const meta: Meta<typeof NavigationBar> = {
  title: 'UI/Navigation/NavigationBar/NavigationBar',
  component: NavigationBar,
  args: {
    activeItemName: 'main',
    items: [
      { name: 'main', Icon: IconList, onClick: () => undefined },
      { name: 'search', Icon: IconSearch, onClick: () => undefined },
      { name: 'tasks', Icon: IconCheckbox, onClick: () => undefined },
      { name: 'settings', Icon: IconSettings, onClick: () => undefined },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

export const Default: Story = {
  decorators: [ComponentDecorator, ComponentWithRouterDecorator],
};
