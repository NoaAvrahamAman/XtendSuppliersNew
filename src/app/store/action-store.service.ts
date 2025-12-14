import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActionStoreService {
  private isBusy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isAppRestarted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isAccordionOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isCtrA: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  setIsBusy(data: boolean): void {
    this.isBusy.next(data);
  }

  getIsBusy(): Observable<boolean> {
    return this.isBusy.asObservable();
  }

  setIsAppRestarted(data: boolean): void {
    this.isAppRestarted.next(data);
  }

  getIsAppRestarted(): Observable<boolean> {
    return this.isAppRestarted.asObservable();
  }

  setIsAccordionOpened(data: boolean): void {
    this.isAccordionOpened.next(data);
  }

  getIsAccordionOpened(): Observable<boolean> {
    return this.isAccordionOpened.asObservable();
  }

  setIsCtrA(data: boolean): void {
    this.isCtrA.next(data);
  }

  getIsCtrA() {
    return this.isCtrA.asObservable();
  }
}
