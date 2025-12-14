import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMIRequest, Log, MIRecord } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';
import { lastValueFrom } from 'rxjs';
import { IGridRow } from 'src/app/interfaces/interfaces';
import { DataStoreService } from 'src/app/store/data-store.service';

@Injectable({
   providedIn: 'root'
})
export class SuppliersService {

   private program = "EXT621MI";
   private transaction = ["List", "Add", "Change", "Delete"];

   constructor(
      private dataStore: DataStoreService,
      private miService: MIService
   ) {
   }

   private createRequest(
      program: string,
      transaction: string,
      inputRecord: MIRecord,
      outputFields?: string[]
   ): IMIRequest {
      return {
         program,
         transaction,
         record: inputRecord,
         maxReturnedRecords: 0,
         company: this.dataStore.getUserContextValue().currentCompany,
         //company:"100",
         ...(outputFields && { outputFields })
      };
   }

   async getLstSuppliers(faci: string): Promise<void> {
      const record: MIRecord = new MIRecord({ ZCON: this.dataStore.getUserContextValue().currentCompany, ZFAC: faci });
      const request: IMIRequest = this.createRequest(this.program, this.transaction[0], record, []);
      try {
         const response = await lastValueFrom(this.miService.execute(request));
         const result = response?.items ?? [];
         const fieldsToFormat = Object.keys(result[0]).filter(key => /^(ZF|ZT)\d+$/.test(key));
         const boolFieldsToFormat = Object.keys(result[0]).filter(key => /^(ZD)\d+$/.test(key));

         const formattedItems = response.items.map(item => {
            const updated = { ...item };
            for (const f of fieldsToFormat) {
               updated[f] = this.formatHourFromM3(updated[f]);   // or apply your formatter
            }
            for (const f of boolFieldsToFormat) {
               updated[f] = this.formatBooleanFromM3(updated[f]);   // or apply your formatter
            }
            return updated;
         });

         this.dataStore.setGridData(formattedItems);
         //  this.dataStore.setGridData(result);
      } catch (error) {
         if (error instanceof HttpErrorResponse) {
            Log.error(`getLstSuppliers HTTP error: ${error.status} ${error.statusText}`, error.error);
         } else {
            Log.error('Unhandled getLstSuppliers error', error);
         }
      }
   }


   async addSupplier(inputRecord: IGridRow): Promise<void> {
      var formatInputFields = { ...inputRecord }
      Object.keys(inputRecord).forEach(key => {
         if (/^(ZF|ZT)\d+$/.test(key)) {
            formatInputFields[key] = this.formatHourToM3(formatInputFields[key])
         }
         if (/^(ZD)\d+$/.test(key)) {
            formatInputFields[key] = this.formatBooleanToM3(formatInputFields[key])
         }
      })
      const record: MIRecord = new MIRecord(formatInputFields);
      // const record: MIRecord = new MIRecord(inputRecord);
      const request: IMIRequest = this.createRequest(this.program, this.transaction[1], record, []);
      try {
         const response = await lastValueFrom(this.miService.execute(request));
         const result = response?.items ?? [];
      } catch (error) {
         if (error instanceof HttpErrorResponse) {
            Log.error(`addSupplier HTTP error: ${error.status} ${error.statusText}`, error.error);
         } else {
            Log.error('Unhandled addSupplier error', error);
            console.log(error)
         }
      }
   }


   async changeSupplier(inputRecord: IGridRow): Promise<void> {
      var formatInputFields = { ...inputRecord }
      Object.keys(inputRecord).forEach(key => {
         if (/^(ZF|ZT)\d+$/.test(key)) {
            formatInputFields[key] = this.formatHourToM3(formatInputFields[key])
         }
         if (/^(ZD)\d+$/.test(key)) {
            formatInputFields[key] = this.formatBooleanToM3(formatInputFields[key])
         }
      })
      const record: MIRecord = new MIRecord(formatInputFields);
      // const record: MIRecord = new MIRecord(inputRecord);
      const request: IMIRequest = this.createRequest(this.program, this.transaction[2], record, []);
      try {
         const response = await lastValueFrom(this.miService.execute(request));
         const result = response?.items ?? [];
         this.dataStore.setGridData(result);
      } catch (error) {
         if (error instanceof HttpErrorResponse) {
            Log.error(`changeSupplier HTTP error: ${error.status} ${error.statusText}`, error.error);
         } else {
            Log.error('Unhandled changeSupplier error', error);
            console.log(error)
         }
      }
   }



   async deleteSupplier(inputRecord: IGridRow): Promise<void> {
      const record: MIRecord = new MIRecord(inputRecord);
      const request: IMIRequest = this.createRequest(this.program, this.transaction[3], record, []);
      try {
         const response = await lastValueFrom(this.miService.execute(request));
         const result = response?.items ?? [];
         this.dataStore.setGridData(result);
      } catch (error) {
         if (error instanceof HttpErrorResponse) {
            Log.error(`deleteSupplier HTTP error: ${error.status} ${error.statusText}`, error.error);
         } else {
            Log.error('Unhandled deleteSupplier error', error);
            console.log(error)
         }
      }
   }

   private formatHourToM3(hour: string): string {
      if (!hour)
         return "";
      return hour.trim().replace(":", "");
   }

   private formatHourFromM3(hour: string): string {
      if (!hour)
         return "";
      return hour.substring(0, 2) + ":" + hour.substring(2);
   }

   private formatBooleanToM3(bool: boolean): string {
      const val = bool ? "1" : "0";
      return val;

   }

   private formatBooleanFromM3(str: string): boolean {
      if(str==""){
         return false;
      }
      const val = str.trim() == "1" ? true : false;
      return val;

   }
}
