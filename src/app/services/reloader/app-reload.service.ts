import {Injectable} from '@angular/core';
import {DataStoreService} from "../../store/data-store.service";
import {ActionStoreService} from "../../store/action-store.service";
import {EComponent} from "../../enums/enums";
import {lastValueFrom} from "rxjs";
import {environment} from "../../../environments/environment";
import {Log} from "@infor-up/m3-odin";
import {UserService} from "@infor-up/m3-odin-angular";
import {ThemeService} from "../theme/theme.service";
import {LocalService} from "../local/local.service";
import {ProfilesService} from "../profiles/profiles.service";
import {SohoMessageService} from "ids-enterprise-ng";


@Injectable({
  providedIn: 'root'
})
export class AppReloadService {

  constructor(
    private userService: UserService,
    private themeService: ThemeService,
    private localService: LocalService,
    private dataStore: DataStoreService,
    private actionStore: ActionStoreService,
    private profileService: ProfilesService,
    private alertService: SohoMessageService
  ) {
  }

  async restartApp(): Promise<void> {
    try {
      this.actionStore.setIsBusy(true);
      // Component
      this.dataStore.setComponent(EComponent.TABLE);
      // Header
      this.dataStore.setHeaderSearchValue(undefined);
      this.dataStore.setHeaderActionTrigger(undefined);
      this.dataStore.setHeaderOptionTrigger(undefined);
      // Grid
      this.dataStore.setSelectedGridData([]);

      //await this.profileService.getApplicationGridData();
    } catch (error) {
      Log.error(error);
      this.alertService.error(error.message);
    } finally {
      this.actionStore.setIsBusy(false);
    }
    this.actionStore.setIsAppRestarted(true);
  }
}
