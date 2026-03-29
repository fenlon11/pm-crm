import { type PageLayoutSidePanelPage } from '@/side-panel/pages/page-layout/types/PageLayoutSidePanelPage';
import { SidePanelPages } from 'pm-shared/types';
import { assertUnreachable } from 'pm-shared/utils';
import {
  IconAppWindow,
  IconChartPie,
  IconFrame,
  IconList,
  IconTable,
} from 'pm-ui/display';

export const getPageLayoutIcon = (page: PageLayoutSidePanelPage) => {
  switch (page) {
    case SidePanelPages.PageLayoutWidgetTypeSelect:
      return IconAppWindow;
    case SidePanelPages.PageLayoutGraphTypeSelect:
      return IconChartPie;
    case SidePanelPages.PageLayoutIframeSettings:
      return IconFrame;
    case SidePanelPages.PageLayoutTabSettings:
      return IconAppWindow;
    case SidePanelPages.PageLayoutFieldsSettings:
      return IconList;
    case SidePanelPages.PageLayoutRecordTableSettings:
      return IconTable;
    default:
      assertUnreachable(page);
  }
};
