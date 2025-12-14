import {Injectable} from '@angular/core';
import {DataStoreService} from '../../store/data-store.service';
import {SohoPersonalizeDirective} from 'ids-enterprise-ng';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private personalization: SohoPersonalizeDirective,
    private dataStore: DataStoreService,
  ) {
  }

  initializeApp() {
    this.initializeAppTheme();
    this.initializeAppColors();
    this.personalization.ngAfterViewInit();
  }

  private initializeAppTheme() {
    let storedTheme = localStorage.getItem(environment.applicationId + '_theme');
    if (!storedTheme) {
      storedTheme = localStorage.getItem('Theme')?.replace('h5-', '');
    }
    const themes: SohoTheme[] = this.personalization.themes().filter(theme => theme.id.includes("new"));
    this.dataStore.setThemeMode(themes);
    const matchedTheme = themes.find(t => t.id === storedTheme);
    if (matchedTheme) {
      this.setTheme(matchedTheme);
    } else {
      this.setTheme(themes.find(e => e.id === "theme-new-light"));
    }
  }

  private initializeAppColors() {
    const storedColor = localStorage.getItem(environment.applicationId + '_color');
    const colors = this.personalization.personalizationColors();
    this.dataStore.setThemeColors(colors);
    if (storedColor && colors && colors.hasOwnProperty(storedColor)) {
      this.setColorScheme(colors[storedColor])
    } else {
      this.setColorScheme(colors["azure"])
    }
  }

  setTheme(theme: SohoTheme) {
    this.personalization.theme = theme.id;
    this.dataStore.setCurTheme(theme)
    localStorage.setItem(environment.applicationId + '_theme', theme.id);
  }

  setColorScheme(color: SohoPersonalizationColor) {
    this.personalization.colors = color.value;
    this.dataStore.setCurColor(color)
    localStorage.setItem(environment.applicationId + '_color', color.id);
  }
}
