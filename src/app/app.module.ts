import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {Log} from '@infor-up/m3-odin';
import {M3OdinModule} from '@infor-up/m3-odin-angular';
import {
  SohoAccordionModule,
  SohoComponentsModule, SohoDatePickerModule,
  SohoLookupModule, SohoModalDialogModule,
  SohoModalDialogService,
  SohoPersonalizeDirective,
  SohoTabsModule
} from 'ids-enterprise-ng'; // TODO Consider only importing individual SoHo modules in production
import {AppComponent} from './app.component';
import {HeaderComponent} from "./components/header/header.component";
import { AppSettingsComponent } from './components/app-settings/app-settings.component';

import { ThemeSettingsComponent } from './components/theme-settings/theme-settings.component';
import { LanguageSettingsComponent } from './components/language-settings/language-settings.component';
import { TableOptionsComponent } from './components/table-options/table-options.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { OptionsListComponent } from './components/options-list/options-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppSettingsComponent,
    ThemeSettingsComponent,
    LanguageSettingsComponent,
    TableOptionsComponent,
    AccordionComponent,
    OptionsListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SohoComponentsModule,
    M3OdinModule,
    SohoTabsModule,
    SohoLookupModule,
    SohoModalDialogModule,
    SohoAccordionModule,
    SohoDatePickerModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (locale: string) => () => {
        Soho.Locale.culturesPath = 'assets/ids-enterprise/js/cultures/';
        return Soho.Locale.set(locale).catch(err => {
          Log.error('Failed to set IDS locale', err);
        });
      },
      deps: [LOCALE_ID],
    },
    SohoPersonalizeDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
