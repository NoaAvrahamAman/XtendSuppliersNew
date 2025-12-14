import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {LocalService} from "../../services/local/local.service";
import {DataStoreService} from "../../store/data-store.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-language-settings',
  templateUrl: './language-settings.component.html',
  styleUrls: ['./language-settings.component.css']
})
export class LanguageSettingsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  languageOptions: string[] = [
    "en-GB", "he-IL"
  ];
  languageSelected: string = localStorage.getItem(environment.applicationId + '_language') || "en-GB";
  content: any;

  constructor(
    private localService: LocalService,
    private dataStore: DataStoreService,
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.dataStore.getLanguage().subscribe(data => this.content = data));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSelectionLanguageChange(lang: string): void {
    const currentLang = this.localService.getCurrentLang();
    if (lang === currentLang) {
      return;
    }
    this.localService.setLanguage(lang);
  }

}
