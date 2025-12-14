import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GridService } from "../../services/grid/grid.service";
import { DataStoreService } from "../../store/data-store.service";
import { SohoDataGridComponent, SohoMessageService } from "ids-enterprise-ng";
import { Subscription, take } from "rxjs";
import { ITrigger } from "../../interfaces/interfaces";
import { ActionStoreService } from "../../store/action-store.service";
import { EComponent } from "../../enums/enums";
import { SuppliersService } from 'src/app/services/Suppliers/suppliers.service';
import { SuppliersM3Service } from 'src/app/services/SupplierM3/suppliers-m3.service';
import { LocalService } from 'src/app/services/local/local.service';

@Component({
   selector: 'app-table-options',
   templateUrl: './table-options.component.html',
   styleUrls: ['./table-options.component.css']
})
export class TableOptionsComponent implements OnInit, OnDestroy, AfterViewInit {
   @ViewChild('gridData', { static: true }) sohoDataGrid: SohoDataGridComponent;
   private subscriptions = new Subscription();

   isAccordionOpen = false;
   content;
   isHebrew:boolean;

   constructor(
      private gridService: GridService,
      private dataStore: DataStoreService,
      private actionStore: ActionStoreService,
      private suppliersService: SuppliersService,
      private suppliersM3Service: SuppliersM3Service,
      private sohoMessageService: SohoMessageService,
      private localService:LocalService
   ) {
   }

   async ngOnInit(): Promise<void> {
      this.content = this.dataStore.getLanguageValue();
      this.actionStore.setIsBusy(true)
      if (this.localService.getCurrentLang() == "he-IL") {
         this.isHebrew = true;
      }
      else {
         this.isHebrew = false;
      }
      this.subscriptions.add(this.dataStore.getCurrentAccordionFilters().subscribe(async (data) => {
         console.log(data);
         if (data && data.facility?.val == "") {
            this.dataStore.setGridData([])
         }
         else {
            await this.suppliersService.getLstSuppliers(data.facility?.val);
         }
         this.sohoDataGrid.gridOptions = this.gridService.getGridComponentOptions(this.content.tableTitle, false);

      }));
      this.subscriptions.add(this.sohoDataGrid.rowDoubleClicked.subscribe(data => {
         console.log(data)
         this.dataStore.setSelectedGridData([{ ...data.item }]);
         this.dataStore.setHeaderOptionTrigger({ index: 5, component: EComponent.TABLE } as ITrigger);
         this.dataStore.setComponent(EComponent.OPTIONS)
      }));
      this.subscriptions.add(this.sohoDataGrid.selected.subscribe(data => {
         if (data.type == "select") {
            this.dataStore.setSelectedGridData(data.rows.map(e => e.data))
         }

      }));
      this.subscriptions.add(this.sohoDataGrid.contextMenu.subscribe(data => { this.sohoDataGrid.selectRows(data.row) }));
      this.subscriptions.add(this.dataStore.getHeaderOptionTrigger().subscribe(data => data && (data.component === EComponent.TABLE) && this.processOptionsTriggers(data)));
      this.subscriptions.add(this.dataStore.getHeaderSearchValue().subscribe(data => data && (data.component === EComponent.TABLE) && this.processSearchTrigger()));
      this.subscriptions.add(this.dataStore.getComponent().subscribe(data => {
         if (data !== EComponent.TABLE && data !== EComponent.OPTIONS) {
            this.sohoDataGrid.removeSelected();
            this.dataStore.setHeaderOptionTrigger(undefined);
            this.dataStore.setHeaderActionTrigger(undefined);
         }
         if (data === EComponent.TABLE) {
            console.log(this.dataStore.getFilteredGridDataValue())


         }
      }));
      this.subscriptions.add(this.sohoDataGrid.filtered.subscribe(data => {
         this.dataStore.setFilteredGridData(data.conditions);

         console.log(data)
      }));
      this.subscriptions.add(this.actionStore.getIsAccordionOpened().subscribe(data => this.isAccordionOpen = data));
      // this.subscriptions.add(this.actionStore.getIsCtrA().subscribe(falg => {
      //    if (falg) {
      //       this.sohoDataGrid.selectAllRows();
      //    }
      // }))


   }

   ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
      this.sohoDataGrid.ngOnDestroy();
   }

   onGridKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey) (document.activeElement as HTMLElement)?.blur();
   }

   ngAfterViewInit() {
      console.log(this.sohoDataGrid.filterConditions())
      setTimeout(() => {
         this.sohoDataGrid.applyFilter(this.dataStore.getFilteredGridDataValue());
      }, 1000)
   }




   private processOptionsTriggers(data: ITrigger) {

      if (data.index == 0) {
         this.validateCreate()
         // this.dataStore.setComponent(EComponent.OPTIONS);
      }
      else {
         this.dataStore.setComponent(EComponent.OPTIONS);
      }
   }

   private processSearchTrigger() {
      this.gridService.filterTableData();
      this.sohoDataGrid.gridOptions = this.gridService.getGridComponentOptions(this.content.tableTitle, false);
   }

   checkOptionDisabled(index: number) {
      if (index === 0 || index === 1)
         return false;
      else if (index === 2 || index === 3 || index === 4 || index === 5) {
         const selectedGridData = this.dataStore.getSelectedGridDataValue();
         if (selectedGridData) {
            return selectedGridData.length == 1
         }
         else {
            return false
         }
      }

      return false;
   }

   handleOptionsClick(index: number) {
      this.dataStore.setHeaderOptionTrigger({ index: index, component: EComponent.TABLE } as ITrigger);

   }

   private async validateCreate() {
      const filterConditions: Array<SohoDataGridFilterCondition> = this.sohoDataGrid.filterConditions();
      console.log(filterConditions)
      if (filterConditions.length == 0 || !filterConditions.find((cond) => cond.columnId == "ZSUN")) {
         this.sohoMessageService.confirm({ title: this.isHebrew?'אזהרה':'Alert', message: this.isHebrew?'חובה להכניס ספק':'Supplier must be entered', buttons: [{ text: 'OK', click: (_e, modal) => { modal.close(false); } }] }).open();
         return;

      }
      else {

         const m3Supplier = filterConditions.filter((cond) => cond.columnId == "ZSUN")[0].value;
         if (this.dataStore.getSelectedGridDataValue()?.length > 0 && this.dataStore.getSelectedGridDataValue()[0].ZSUN == m3Supplier) {
            this.sohoMessageService.confirm({ title: this.isHebrew?'אזהרה':'Alert', message: this.isHebrew?'מספר ספק כבר קיים בפעילות': 'Supplier already exist for this facility', buttons: [{ text: 'OK', click: (_e, modal) => { modal.close(false); } }] }).open();
            return;
         }
         const supplierM3Data = await this.suppliersM3Service.getSupplierM3Data(m3Supplier);
         if (!supplierM3Data) {
            this.sohoMessageService.confirm({ title: this.isHebrew?'אזהרה':'Alert', message: this.isHebrew?'מספר ספק לא קיים במערכת':'Supplier not exist in crs610', buttons: [{ text: 'OK', click: (_e, modal) => { modal.close(false); } }] }).open();
            return;
         }
         this.dataStore.setComponent(EComponent.OPTIONS);

      }

   }

}
