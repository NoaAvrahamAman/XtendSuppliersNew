import {Component, HostListener, OnInit} from '@angular/core';
import {CoreBase, Log} from '@infor-up/m3-odin';
import {UserService} from '@infor-up/m3-odin-angular';
import {ThemeService} from "./services/theme/theme.service";
import {LocalService} from "./services/local/local.service";
import {DataStoreService} from "./store/data-store.service";
import {lastValueFrom} from "rxjs";
import {environment} from "../environments/environment";
import {ActionStoreService} from "./store/action-store.service";
import {ProfilesService} from "./services/profiles/profiles.service";
import {EComponent} from "./enums/enums";
import {SohoMessageService} from "ids-enterprise-ng";
import {ITrigger} from "./interfaces/interfaces";
import { FacilitiesService } from './services/Facilities/facilities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends CoreBase implements OnInit {
  protected readonly EComponent = EComponent;
  isBusy = false;
  appInitialized = false;
  component: EComponent;

  constructor(
    private userService: UserService,
    private themeService: ThemeService,
    private localService: LocalService,
    private dataStore: DataStoreService,
    private actionStore: ActionStoreService,
    private facilitiesService: FacilitiesService,
    private alertService: SohoMessageService
  ) {
    super('AppComponent');
  }

  async ngOnInit(): Promise<void> {
    try {
      this.actionStore.getIsBusy().subscribe(flag => this.isBusy = flag);
      this.actionStore.setIsBusy(true);
      const userContext = await lastValueFrom(this.userService.getUserContext());
      await this.facilitiesService.getLstFacilities();
      this.dataStore.setUserContext(userContext);
      this.themeService.initializeApp();
      const appLanguage = localStorage.getItem(environment.applicationId + '_language') || userContext.currentLanguage;
      this.localService.initializeApp(appLanguage);
      this.dataStore.getComponent().subscribe(data => this.component = data);
      this.actionStore.getIsAppRestarted().subscribe(flag => {
        this.appInitialized = false;
        setTimeout(() => {
          this.appInitialized = true;
        }, 0);
      });
    } catch (error) {
      Log.error(error);
      this.alertService.error(error.message);
    } finally {
      this.actionStore.setIsBusy(false);
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === '1') {
      event.preventDefault();
      this.onCtrl1();
    }

    if (event.ctrlKey && event.key === '2') {
      event.preventDefault();
      this.onCtrl2();
    }

    if (event.ctrlKey && event.key === '3') {
      event.preventDefault();
      this.onCtrl3();
    }

    if (event.ctrlKey && event.key === '4') {
      event.preventDefault();
      this.onCtrl4();
    }

    if (event.ctrlKey && event.key === '6') {
      event.preventDefault();
      this.onCtrl6();
    }

    if (event.ctrlKey && event.code === 'KeyA') {
      event.preventDefault();
      this.onCtrlA();
    }
  }

  onCtrl1() {
    if (this.dataStore.getGridDataValue().length > 0 && this.dataStore.getFilteredGridDataValue().length > 0) {
      this.dataStore.setHeaderOptionTrigger({index: 0, component: this.component} as ITrigger);
    } else if (this.dataStore.getGridDataValue().length > 0) {
      this.dataStore.setHeaderOptionTrigger({index: 1, component: this.component} as ITrigger);
    }
  }

  onCtrl2() {
    if (this.dataStore.getSelectedGridDataValue().length === 1) {
      this.dataStore.setHeaderOptionTrigger({index: 2, component: this.component} as ITrigger);
    }
  }

  onCtrl3() {
    if (this.dataStore.getSelectedGridDataValue().length === 1) {
      this.dataStore.setHeaderOptionTrigger({index: 3, component: this.component} as ITrigger);
    }
  }

  onCtrl4() {
    this.dataStore.setHeaderOptionTrigger({index: 4, component: this.component} as ITrigger);
  }

  onCtrl6() {
    this.dataStore.setHeaderOptionTrigger({index: 6, component: this.component} as ITrigger);
  }

  onCtrlA() {
    if (this.dataStore.getHeaderOptionTriggerValue().index === 1) {
      this.actionStore.setIsCtrA(true);
    }
  }

}
