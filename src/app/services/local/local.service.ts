import {Injectable} from '@angular/core';
import {DataStoreService} from '../../store/data-store.service';
import {environment} from "../../../environments/environment";
import {Translations} from "../../translations/translation";

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private curLanguage: string;

  private customTranslations = Translations;

  constructor(private dataStore: DataStoreService) {
  }

  initializeApp(userLanguage: string) {
    const selectedLang = (userLanguage === "IL" || userLanguage === "he-IL") ? "he-IL" : "en-GB";
    localStorage.setItem(environment.applicationId + '_language', selectedLang);
    if (selectedLang !== this.curLanguage) {
      this.curLanguage = selectedLang;
      this.dataStore.setLanguage(this.customTranslations[this.curLanguage]);
      this.setActiveLanguage();
      this.setActiveLocal();
    }
  }

  private setActiveLanguage() {
    Soho.Locale.setLanguage(this.curLanguage);
  }

  private setActiveLocal() {
    Soho.Locale.set(this.curLanguage);
  }


  setLanguage(language: string): void {
    if (this.curLanguage === language) {
      return;
    }
    localStorage.setItem(environment.applicationId + '_language', language);
    this.curLanguage = language;
    Soho.Locale.setLanguage(language);
    this.dataStore.setLanguage(this.customTranslations[language]);
  }

  getCurrentLang(): string {
    return this.curLanguage;
  }
}
