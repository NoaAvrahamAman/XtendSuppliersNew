import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
   SohoAccordionComponent,
   SohoAccordionHeaderComponent,
   SohoDatePickerComponent,
   SohoLookupComponent
} from "ids-enterprise-ng";
import { Subscription } from "rxjs";
import { ActionStoreService } from "../../store/action-store.service";
import { LookupService } from "../../services/lookup/lookup.service";
import { DataStoreService } from "../../store/data-store.service";
import { LocalService } from 'src/app/services/local/local.service';
import { IAccordionFilters, ILookupDisplayColumns } from 'src/app/interfaces/interfaces';
import { SuppliersService } from 'src/app/services/Suppliers/suppliers.service';
import { HttpEvent } from '@angular/common/http';
import { EComponent } from 'src/app/enums/enums';

@Component({
   selector: 'app-accordion',
   templateUrl: './accordion.component.html',
   styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit, AfterViewInit, OnDestroy {
   @ViewChild('accordion', { static: true }) accordion: SohoAccordionComponent;
   @ViewChild('accordionHeader', { static: true }) accordionHeader: SohoAccordionHeaderComponent;
   @ViewChild('input_ZFAC', { static: true }) input_ZFAC: SohoLookupComponent;
   @ViewChild('datepicker1', { static: true }) sohoDatePicker: SohoDatePickerComponent;
   private subscriptions = new Subscription();
   isHebrew: boolean;
   content: any;
   private lookupDisplayColumns: ILookupDisplayColumns = { facility: { showColumns: ["FACI", "FACN"] } };
   filtersInputsValues: IAccordionFilters = { facility: { val: "", desc: "" } };
   private lookupData = { facility: [] }

   constructor(
      private actionStore: ActionStoreService,
      private dataStore: DataStoreService,
      private lookupService: LookupService,
      private localService: LocalService,
      private suppliersService:SuppliersService
   ) {
   }

   async ngOnInit(): Promise<void> {
      if (this.localService.getCurrentLang() == "he-IL") {
         this.isHebrew = true;
      }
      else {
         this.isHebrew = false;
      }
      this.content = this.dataStore.getLanguageValue();
      this.lookupData.facility = this.dataStore.getLstFacilitiesValue();
      this.filtersInputsValues=this.dataStore.getCurrentAccordionFiltersValue()
      await this.lookupService.initLookup(this.input_ZFAC, "title", "FACI", this.lookupData.facility, [], this.lookupDisplayColumns.facility.showColumns);
      this.subscriptions.add(this.accordion.expandEvent.subscribe((data) => this.actionStore.setIsAccordionOpened(true)));
      this.subscriptions.add(this.accordion.collapseEvent.subscribe(data => this.actionStore.setIsAccordionOpened(false)));
      this.input_ZFAC.change.subscribe(async (data) => {
         if (data.values.length == 0) {
            this.filtersInputsValues.facility.desc = "";
         }
         //this.filtersInputsValues.facility.val = data.values.toString();
         this.filtersInputsValues.facility.desc = data[0].data["FACN"];
         this.dataStore.setCurrentAccordionFilters({...this.filtersInputsValues});
      });
   }

   ngAfterViewInit() {
      setTimeout(() => this.accordion.expand(this.accordionHeader));
   }

   ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
   }

   onZFACChange(e) {
      try {
         if(!(e instanceof Event)){
            return;
         }
         const value = (e.target as HTMLInputElement).value;
         //this.filtersInputsValues.facility.val = value
         if (value == "") {
            this.filtersInputsValues.facility.desc = "";
         }
         else {
            const ZFACName = this.lookupData.facility.filter((item) => item.FACI == value)[0].FACN
            this.filtersInputsValues.facility.desc = ZFACName
         }
         this.dataStore.setCurrentAccordionFilters({...this.filtersInputsValues});
      }catch(error){
         console.log(error)

      }


   }

}
