import { Component, OnInit } from '@angular/core';
import { FormService } from '@infor-up/m3-odin-angular';
import { SohoMessageService } from 'ids-enterprise-ng';
import { Subscription } from 'rxjs';
import { EComponent } from 'src/app/enums/enums';
import { IForm, IFormFields, IGridRow, ITrigger } from 'src/app/interfaces/interfaces';
import { FormFieldsService } from 'src/app/services/Form/form-fields.service';
import { LocalService } from 'src/app/services/local/local.service';
import { SuppliersService } from 'src/app/services/Suppliers/suppliers.service';
import { ActionStoreService } from 'src/app/store/action-store.service';
import { DataStoreService } from 'src/app/store/data-store.service';

@Component({
   selector: 'app-options-list',
   templateUrl: './options-list.component.html',
   styleUrls: ['./options-list.component.css']
})
export class OptionsListComponent implements OnInit {

   private subscriptions = new Subscription();
   selectedRowData: IGridRow = { ZCON: "", ZFAC: "", ZCOR: "", ZSUN: "", ZFAN: "", ZFNM: "", ZSTA: 0, ZD01: false, ZD02: false, ZD03: false, ZD04: false, ZD05: false, ZD06: false, ZD07: false, ZF11: "", ZF12: "", ZF13: "", ZF14: "", ZF15: "", ZF16: "", ZF17: "", ZT11: "", ZT12: "", ZT13: "", ZT14: "", ZT15: "", ZT16: "", ZT17: "", ZF21: "", ZF22: "", ZF23: "", ZF24: "", ZF25: "", ZF26: "", ZF27: "", ZT21: "", ZT22: "", ZT23: "", ZT24: "", ZT25: "", ZT26: "", ZT27: "" };
   formFields: IForm
   selectedOptionMenu: number;
   isHebrew: boolean;
   content;
   messageBarDetails = { companyDivisionInfo: "", changedByLabel: "", selectedPanel: "EXT621/B" }


   constructor(
      private dataStore: DataStoreService,
      private actionStore: ActionStoreService,
      private suppliersService: SuppliersService,
      private formService: FormFieldsService,
      private localService: LocalService,
      private sohoMessageService: SohoMessageService
   ) { }

   ngOnInit(): void {
      this.actionStore.setIsBusy(true)
      if (this.localService.getCurrentLang() == "he-IL") {
         this.isHebrew = true;
      }
      else {
         this.isHebrew = false;
      }
      this.content = this.dataStore.getLanguageValue();
      const userContext = this.dataStore.getUserContextValue();
      this.messageBarDetails.companyDivisionInfo = userContext.TX40 + " " + userContext.CONM || "";
      this.subscriptions.add(this.dataStore.getHeaderOptionTrigger().subscribe(async data => {
         if (data && data.index != undefined) {
            this.selectedOptionMenu = data.index;
            const selectedGridData = this.dataStore.getSelectedGridDataValue()
            if (selectedGridData.length > 0 && data.index != 0) {
               this.selectedRowData = { ...selectedGridData[0] };
               this.messageBarDetails.changedByLabel = this.createChangeLabel(this.selectedRowData.ZRDT,this.selectedRowData.ZUDT);
            }
            else if (data.index == 0) {
               const filterConditions: Array<SohoDataGridFilterCondition> = this.dataStore.getFilteredGridDataValue();
               const M3supplierValue = filterConditions.filter((cond) => cond.columnId == "ZSUN")[0].value;
               this.selectedRowData = {
                  ZCON: this.dataStore.getUserContextValue().CONO,
                  ZFAC: this.dataStore.getCurrentAccordionFiltersValue().facility.val,
                  ZSUN: M3supplierValue,
                  ZCOR: "", ZFAN: "", ZFNM: "", ZSTA: 0, ZD01: false, ZD02: false, ZD03: false, ZD04: false, ZD05: false, ZD06: false, ZD07: false, ZF11: "", ZF12: "", ZF13: "", ZF14: "", ZF15: "", ZF16: "", ZF17: "", ZT11: "", ZT12: "", ZT13: "", ZT14: "", ZT15: "", ZT16: "", ZT17: "", ZF21: "", ZF22: "", ZF23: "", ZF24: "", ZF25: "", ZF26: "", ZF27: "", ZT21: "", ZT22: "", ZT23: "", ZT24: "", ZT25: "", ZT26: "", ZT27: "", ZRDT: "", ZUDT: ""

               }
               this.dataStore.setSelectedGridData([{ ...this.selectedRowData }]);
            }

            this.formFields = await this.formService.generateFields(this.selectedOptionMenu, this.selectedRowData);
            console.log(this.formFields)
            if (data.index == 4) {
               this.sohoMessageService.alert({
                  title: this.isHebrew ? 'התרעה' : 'Alert',
                  message: this.isHebrew ? 'אשר מחיקה של ספק ' + this.selectedRowData.ZSUN.trim() : 'Confirm deletion of supplier ' + this.selectedRowData.ZSUN.trim(),
                  buttons: [
                     {
                        text: 'OK',
                        click: async (_e, modal) => {
                           await this.goToNextPage();
                           modal.close(false);
                        }
                     },
                  ],
                  // showCloseBtn: true,
               }).open();
            }
         }



      }));
      this.actionStore.setIsBusy(false)
   }

   ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
   }

   goToPreviousPage() {
      // console.log(this.dataStore.getCurrentAccordionFiltersValue())
      this.dataStore.setSelectedGridData([]);
      this.dataStore.setHeaderOptionTrigger(undefined);
      this.dataStore.setComponent(EComponent.TABLE);

   }

   async goToNextPage() {

      try {
         console.log("options-list -> selectedRowData:");
         console.log(this.selectedRowData);
         const fieldsToSend = this.getFieldsToSend()
         console.log(fieldsToSend);
         if (this.selectedOptionMenu === 0 || this.selectedOptionMenu === 3) {
            await this.suppliersService.addSupplier(this.selectedRowData);
         } else if (this.selectedOptionMenu === 2) {
            await this.suppliersService.changeSupplier(this.selectedRowData);
         } else if (this.selectedOptionMenu === 4) {
            // fieldsToSend["ZFAN"]=this.selectedRowData.ZFAN;
            await this.suppliersService.deleteSupplier(this.selectedRowData);
         }
         this.goToPreviousPage();
      } catch (error) {
         console.error(error);
         if (error.errorMessage) {
            //this.messageService.openAlert('Error', error.errorMessage);
         }
      } finally {
         // this.isBusy = false;
      }


   }

   private getFieldsToSend(): IGridRow {

      let fieldsToSend = { ZCON: this.dataStore.getUserContextValue().CONO, ZFAC: "", ZSUN: "" }
      this.formFields.required.forEach(f => {
         fieldsToSend[f.field] = f.value
      })
      this.formFields.secondary.firstSection.forEach(f => {
         fieldsToSend[f.field] = f.value
      })
      this.formFields.secondary.secondSection?.forEach(a => {
         a.forEach(f => {
            fieldsToSend[f.field] = f.value
         })
      })
      return fieldsToSend;

   }

   private createChangeLabel(registryDate: string,changeDate:string): string {
      return this.convertFromM3Date(registryDate)+" "+this.convertFromM3Date(changeDate)

   }
   private convertFromM3Date(date: string): string{
      return `${date.slice(6, 8)}/${date.slice(4, 6)}/${date.slice(2, 4)}`;

   }



}
