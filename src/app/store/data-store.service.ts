import {Injectable} from '@angular/core';
import {IUserContext} from '@infor-up/m3-odin';
import {BehaviorSubject, Observable} from "rxjs";
import {IAccordionFilters, IHeaderSearch, ITrigger} from "../interfaces/interfaces";
import {EComponent} from "../enums/enums";

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private themeModes: BehaviorSubject<SohoTheme[]> = new BehaviorSubject<SohoTheme[]>([]);
  private themeColors: BehaviorSubject<SohoPersonalizationColors> = new BehaviorSubject<SohoPersonalizationColors>(undefined);
  private curColor: BehaviorSubject<SohoPersonalizationColor> = new BehaviorSubject<SohoPersonalizationColor>(undefined);
  private curTheme: BehaviorSubject<SohoTheme> = new BehaviorSubject<SohoTheme>(undefined);
  private language: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  private userContext: BehaviorSubject<IUserContext> = new BehaviorSubject<IUserContext>(undefined);
  private component: BehaviorSubject<EComponent> = new BehaviorSubject<EComponent>(EComponent.TABLE);

  //HEADER
  private headerSearchValue: BehaviorSubject<IHeaderSearch> = new BehaviorSubject<IHeaderSearch>(undefined);
  private headerActionTrigger: BehaviorSubject<ITrigger> = new BehaviorSubject<ITrigger>(undefined);
  private headerOptionTrigger: BehaviorSubject<ITrigger> = new BehaviorSubject<ITrigger>(undefined);

  //GRID
  private gridData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private selectedGridData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private filteredGridData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  //ACCORDION
  private lstFacilities: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private currentAccordionFilters: BehaviorSubject<IAccordionFilters> = new BehaviorSubject<IAccordionFilters>({facility:{val:""}});


  constructor() {
  }

  setThemeMode(data: SohoTheme[]): void {
    this.themeModes.next(data);
  }

  getThemeMode(): Observable<SohoTheme[]> {
    return this.themeModes.asObservable();
  }

  setCurColor(data: SohoPersonalizationColor): void {
    this.curColor.next(data);
  }

  getCurColor(): Observable<SohoPersonalizationColor> {
    return this.curColor.asObservable();
  }

  setCurTheme(data: SohoTheme): void {
    this.curTheme.next(data);
  }

  getCurTheme(): Observable<SohoTheme> {
    return this.curTheme.asObservable();
  }

  setLanguage(data: any): void {
    this.language.next(data);
  }

  getLanguage(): Observable<any> {
    return this.language.asObservable();
  }

  getLanguageValue(): any {
    return this.language.getValue();
  }


  setThemeColors(data: SohoPersonalizationColors): void {
    this.themeColors.next(data);
  }

  getThemeColors(): Observable<SohoPersonalizationColors> {
    return this.themeColors.asObservable();
  }

  setUserContext(data: IUserContext): void {
    this.userContext.next(data);
  }

  getUserContext(): Observable<IUserContext> {
    return this.userContext.asObservable();
  }

  getUserContextValue():IUserContext{
   return this.userContext.getValue();
  }

  setComponent(data: EComponent): void {
    this.component.next(data);
  }

  getComponent(): Observable<EComponent> {
    return this.component.asObservable();
  }

  setGridData(data: any[]): void {
    this.gridData.next(data);
  }

  getGridData(): Observable<any[]> {
    return this.gridData.asObservable();
  }

  getGridDataValue(): any[] {
    return this.gridData.getValue();
  }

  setHeaderSearchValue(data: IHeaderSearch): void {
    this.headerSearchValue.next(data);
  }

  getHeaderSearchValue(): Observable<IHeaderSearch> {
    return this.headerSearchValue.asObservable();
  }

  setSelectedGridData(data: any[]): void {
    this.selectedGridData.next(data);
  }

  getSelectedGridData(): Observable<any[]> {
    return this.selectedGridData.asObservable();
  }

  getSelectedGridDataValue(): any[] {
    return this.selectedGridData.getValue();
  }

  setHeaderActionTrigger(data: { index: number; component: EComponent }): void {
    this.headerActionTrigger.next(data);
  }

  getHeaderActionTrigger(): Observable<{ index: number; component: EComponent }> {
    return this.headerActionTrigger.asObservable();
  }

  setHeaderOptionTrigger(data: ITrigger): void {
    this.headerOptionTrigger.next(data);
  }

  getHeaderOptionTrigger(): Observable<ITrigger> {
    return this.headerOptionTrigger.asObservable();
  }

  getHeaderOptionTriggerValue(): ITrigger {
    return this.headerOptionTrigger.getValue();
  }

  setFilteredGridData(data: any[]): void {
    this.filteredGridData.next(data);
  }

  getFilteredGridData(): Observable<any[]> {
    return this.filteredGridData.asObservable();
  }

  getFilteredGridDataValue(): any[] {
    return this.filteredGridData.getValue();
  }

  getLstFacilitiesValue(): any[] {
    return this.lstFacilities.getValue();
  }

  setLstFacilities(data: any[]): void {
    this.lstFacilities.next(data);
  }

  getCurrentAccordionFilters(): Observable<IAccordionFilters> {
    return this.currentAccordionFilters.asObservable();
  }

  getCurrentAccordionFiltersValue(): IAccordionFilters {
    return this.currentAccordionFilters.getValue();
  }
  setCurrentAccordionFilters(data: IAccordionFilters): void {
    this.currentAccordionFilters.next({facility:{val:""}});
    this.currentAccordionFilters.next(data);
  }

}
