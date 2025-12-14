import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMIRequest, Log, MIRecord } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';
import { lastValueFrom } from 'rxjs';
import { DataStoreService } from 'src/app/store/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {

  private program = "CRS008MI";
    private transaction = ["ListFacility"];

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
        //company:this.dataStore.getUserContextValue().currentCompany,
        company:"100",
        ...(outputFields && {outputFields})
      };
    }

    async getLstFacilities(): Promise<void> {
      const record: MIRecord = new MIRecord({});
      const request: IMIRequest = this.createRequest(this.program, this.transaction[0], record, []);
      try {
        const response = await lastValueFrom(this.miService.execute(request));
        const result = response?.items ?? [];
        this.dataStore.setLstFacilities(result);
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          Log.error(`getFacilities HTTP error: ${error.status} ${error.statusText}`, error.error);
        } else {
          Log.error('Unhandled getFacilities error', error);
        }
      }
    }
}
