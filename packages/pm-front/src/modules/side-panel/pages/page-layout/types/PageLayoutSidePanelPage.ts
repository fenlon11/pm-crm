import { type SidePanelPages } from 'pm-shared/types';

export type PageLayoutSidePanelPage =
  | SidePanelPages.PageLayoutWidgetTypeSelect
  | SidePanelPages.PageLayoutGraphTypeSelect
  | SidePanelPages.PageLayoutIframeSettings
  | SidePanelPages.PageLayoutTabSettings
  | SidePanelPages.PageLayoutFieldsSettings
  | SidePanelPages.PageLayoutRecordTableSettings;
