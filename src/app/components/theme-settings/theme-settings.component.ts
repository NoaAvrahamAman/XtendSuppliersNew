import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStoreService} from "../../store/data-store.service";
import {ThemeService} from "../../services/theme/theme.service";
import {ISohoPersonalizationColor, ISohoTheme} from "../../interfaces/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-theme-settings',
  templateUrl: './theme-settings.component.html',
  styleUrls: ['./theme-settings.component.css']
})
export class ThemeSettingsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  colorOptions: ISohoPersonalizationColor[] = [];
  colorSelected: ISohoPersonalizationColor;
  themeOptions: ISohoTheme[] = [];
  themeSelected: ISohoTheme;
  content: any;

  constructor(
    private dataStore: DataStoreService,
    private themeService: ThemeService,
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.dataStore.getThemeColors().subscribe(data => this.colorOptions = Object.values(data)));
    this.subscriptions.add(this.dataStore.getCurColor().subscribe(data => this.colorSelected = this.colorOptions.find(e => e.value === data.value)));
    this.subscriptions.add(this.dataStore.getThemeMode().subscribe(data => this.themeOptions = data));
    this.subscriptions.add(this.dataStore.getCurTheme().subscribe(data => this.themeSelected = this.themeOptions.find(e => e.name === data.name)));
    this.subscriptions.add(this.dataStore.getLanguage().subscribe(data => this.content = data));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSelectionColorChange(selected: SohoPersonalizationColor) {
    this.themeService.setColorScheme(selected)
  }

  onSelectionThemeChange(selected: SohoTheme) {
    this.themeService.setTheme(selected)
  }
}
