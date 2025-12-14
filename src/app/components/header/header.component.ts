import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataStoreService} from 'src/app/store/data-store.service';
import {SohoAboutService, SohoMessageService, SohoSearchFieldComponent} from "ids-enterprise-ng";
import {GridService} from "../../services/grid/grid.service";
import {ITrigger} from "../../interfaces/interfaces";
import {Subscription} from "rxjs";
import {AppReloadService} from "../../services/reloader/app-reload.service";
import {environment} from "../../../environments/environment";
import {EComponent} from "../../enums/enums";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  protected readonly EComponent = EComponent;
  @ViewChild('searchField', {static: true}) searchField: SohoSearchFieldComponent;
  private subscriptions = new Subscription();
  companyDivisionInfo: string;
  component: EComponent;
  content: any;

  private selectedDataAmount: number;

  constructor(
    private dataStore: DataStoreService,
    private gridService: GridService,
    private appReloadService: AppReloadService,
    private modalAbout: SohoAboutService,
    private modalMessage: SohoMessageService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.dataStore.getUserContext().subscribe(data => this.companyDivisionInfo = data.TX40 + " " + data.CONM || ""));
    this.subscriptions.add(this.dataStore.getLanguage().subscribe(data => this.content = data));
    this.subscriptions.add(this.dataStore.getComponent().subscribe(data => this.component = data));
    this.subscriptions.add(this.searchField.cleared.subscribe(data => this.handleSearchChange()));

    this.subscriptions.add(this.dataStore.getSelectedGridData().subscribe(data => {if(data) this.selectedDataAmount = data.length; else this.selectedDataAmount=0}));
      this.cdr.detectChanges();
   }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  handleSearchChange(event?: Event): void {
    const input = event ? event.target as HTMLInputElement : null;
    this.dataStore.setHeaderSearchValue(!input || input.value === "" ?
      {
        component: this.component,
        value: undefined,
      } :
      {
        component: this.component,
        value: input.value,
      });
  }

  handleShareClick() {
    console.log('Share clicked');
    this.modalMessage.message({
      title: '',
      message: 'URL-app',
      showCloseBtn: true
    }).open();
  }

  handleRefreshClick() {
    this.appReloadService.restartApp();
  }

  handleHelpClick() {
    this.modalAbout.about({
      appName: environment.applicationId,
      productName: environment.applicationId,
      version: '1.0.0',
      content: '<p>This application is a sample SDK developed to demonstrate the capabilities of portals. It was created at Aman for client use. </br>The SDK was developed by Stas Rivkin.</p>',
      deviceSpecs: true,
      useDefaultCopyright: true
    }).open();

  }

  handleSettingsClick() {
    this.component === EComponent.SETTINGS ? this.dataStore.setComponent(EComponent.TABLE) : this.dataStore.setComponent(EComponent.SETTINGS);
  }

  handleEditClick() {
    console.log('Edit clicked');
  }

  handleMenuClick() {
    console.log('Menu clicked');
  }

  handleActionsClick(index: number, isNotDisabled: boolean) {
    this.dataStore.setHeaderActionTrigger({index: index, component: this.component} as ITrigger);
  }

  handleOptionsClick(index: number, isNotDisabled: boolean) {
    if(isNotDisabled) this.dataStore.setHeaderOptionTrigger({index: index, component: this.component} as ITrigger);
  }

  checkActionDisabled(index: number) {
    if (index === 0) {
      return this.selectedDataAmount === 1;
    } else if (index === 2) {
      return this.component !== EComponent.TABLE;
    }
    return false;
  }

  checkOptionDisabled(index: number) {
    if (index === 0) {
      return this.dataStore.getGridDataValue().length > 0 && this.dataStore.getFilteredGridDataValue().length > 0;
    } else if (index === 1) {
      //return this.dataStore.getGridDataValue().length > 0;
      return false;
    } else if (index === 2) {
      return this.selectedDataAmount === 1;
    } else if (index === 3) {
      return this.selectedDataAmount === 1;
    } else if (index === 4) {
      return this.selectedDataAmount > 0;
    } else if (index === 5) {
      return this.selectedDataAmount === 1;
    }
    return false;
  }


}
