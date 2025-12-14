import {Component, OnInit} from '@angular/core';
import {DataStoreService} from "../../store/data-store.service";

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})
export class AppSettingsComponent implements OnInit {
  tabsOptions: SohoTabsOptions;
  tabs = [
    {id: 0, name: "Theme"},
    {id: 1, name: "Size"},
    {id: 2, name: "Language"},
  ];
  activeTab: number = 0;
  content: any;

  constructor(
    private dataStore: DataStoreService,
  ) {
  }

  ngOnInit(): void {
    this.tabsOptions = {
      addTabButton: false,
      appMenuTriggerText: 'Open Menu',
      lazyLoad: true,
      moduleTabsTooltips: true,
      tabCounts: false,
      verticalResponsive: true,
      sortable: false,
      beforeActivate: (event: any, ui: any) => {
        return true;
      },
      appMenuTriggerTextAudible: false,
    };
    this.dataStore.getLanguage().subscribe(data => {
      this.content = data;
      this.tabs = [
        { id: 0, name: data.appSettingsTabLabels.theme },
        { id: 1, name: data.appSettingsTabLabels.size },
        { id: 2, name: data.appSettingsTabLabels.language }
      ];
    });
  }

  activateTab(tabId: number): void {
    this.activeTab = this.tabs.find(e => e.id === tabId).id;
  }
}
