import {Injectable} from '@angular/core';
import {MIService} from "@infor-up/m3-odin-angular";
import {DataStoreService} from "../../store/data-store.service";
import {catchError, firstValueFrom, lastValueFrom, of} from "rxjs";
import {IMIRequest, Log, MIRecord} from "@infor-up/m3-odin";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  private program = "MNS150MI";
  private transaction = ["LstUserData"];

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
      ...(outputFields && {outputFields})
    };
  }

  async getApplicationGridData(): Promise<void> {
    const record: MIRecord = new MIRecord({});
    const request: IMIRequest = this.createRequest(this.program, this.transaction[0], record, []);
    try {
      const response = await lastValueFrom(this.miService.execute(request));
      const result = response?.items ?? [];
      this.dataStore.setGridData(result);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        Log.error(`getGridData HTTP error: ${error.status} ${error.statusText}`, error.error);
      } else {
        Log.error('Unhandled getGridData error', error);
      }
    }
  }


}
