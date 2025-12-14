import { Injectable } from '@angular/core';
import { IForm, IFormFields } from 'src/app/interfaces/interfaces';
import { DataStoreService } from 'src/app/store/data-store.service';
import { SuppliersM3Service } from '../SupplierM3/suppliers-m3.service';

@Injectable({
   providedIn: 'root'
})
export class FormFieldsService {

   private content;

   constructor(
      private dataStore: DataStoreService,
      private supplierM3Service: SuppliersM3Service,
   ) { }

   async generateFields(selectedOptionMenu: number, selectedRowData: any) {
      this.content = this.dataStore.getLanguageValue();
      const supplierData = await this.supplierM3Service.getSupplierM3Data(selectedRowData.ZSUN)
      const supplierName = supplierData?.[0]?.SUNM ?? "";
      const required: IFormFields[] = [
         {
            field: "ZFAC",
            value: selectedRowData.ZFAC,
            label: this.content.gridColumns.ZFAC,
            type: "input",
            readonly: true,
            desc: this.dataStore.getCurrentAccordionFiltersValue().facility.desc
         },
         {
            field: "ZSUN",
            value: selectedRowData.ZSUN,
            label: this.content.gridColumns.ZSUN,
            type: "input",
            readonly: true,
            desc: supplierName
         },
      ]


      let secondary = {firstSection:[]}

      if (selectedOptionMenu == 0 || selectedOptionMenu == 2 || selectedOptionMenu == 5) {


         const firstSection = [
            {
               field: "ZFAN",
               value: selectedRowData.ZFAN,
               label: this.content.gridColumns.ZFAN,
               type: "input",
               readonly: selectedOptionMenu == 5 ? true : false,
            },
            {
               field: "ZCOR",
               value: selectedRowData.ZCOR,
               label: this.content.gridColumns.ZCOR,
               type: "input",
               readonly: selectedOptionMenu == 5 ? true : false,
            },
            {
               field: "ZFNM",
               value: selectedRowData.ZFNM,
               label: this.content.gridColumns.ZFNM,
               type: "input",
               readonly: selectedOptionMenu == 5 ? true : false,
            },
            {
               field: "ZSTA",
               value: selectedRowData.ZSTA,
               label: this.content.gridColumns.ZSTA,
               type: "dropdown",
               readonly: selectedOptionMenu == 5 ? true : false,
               data: this.content.statusOptions
            }
         ]

         let secondSection = [[], [], [], [], []]
         Object.keys(selectedRowData).forEach(key => {
            if (/^(ZF|ZT|ZD)\d+$/.test(key)) {
               const inpField = {
                  field: key,
                  value: selectedRowData[key],
                  label: this.content.gridColumns[key],
                  type: key.startsWith("ZD") ? "checkbox" : "time",
                  readonly: selectedOptionMenu == 5 ? true : false,
               }
               if (key.startsWith("ZD")) {
                  secondSection[0].push(inpField);
               }
               else if (key.startsWith("ZF1")) {
                  secondSection[1].push(inpField);
               }
               else if (key.startsWith("ZT1")) {
                  secondSection[2].push(inpField);
               }
               else if (key.startsWith("ZF2")) {
                  secondSection[3].push(inpField);
               }
               else if (key.startsWith("ZT2")) {
                  secondSection[4].push(inpField);
               }
               secondary["firstSection"] = firstSection;
               secondary["secondSection"] = secondSection;
            }

         })


      }

      else if(selectedOptionMenu==3){

         const firstSection = [
             {
               field: "ZSUN",
               value: selectedRowData.ZSUN,
               label: this.content.gridColumns.ZSUN,
               type: "input",
               readonly:false,
            },
            {
               field: "ZFAN",
               value: selectedRowData.ZFAN,
               label: this.content.gridColumns.ZFAN,
               type: "input",
               readonly: false,
            }

         ]

         secondary["firstSection"] = firstSection;

      }

      // else if(selectedOptionMenu==4){

      // }
      const formFields: IForm = {
         required: required,
         secondary: secondary
      }
      return formFields;
   }

}
