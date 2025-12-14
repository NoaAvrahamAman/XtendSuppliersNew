import { Injectable } from '@angular/core';
import { DataStoreService } from "../../store/data-store.service";
import { take } from "rxjs";
import { SohoMessageService } from "ids-enterprise-ng";
import { environment } from "../../../environments/environment.prod";

@Injectable({
   providedIn: 'root'
})
export class GridService {
   private data: any[];
   private filteredData: any[];

   constructor(
      private dataStore: DataStoreService,
      private sohoMessageService: SohoMessageService,
   ) {
   }

   getGridComponentOptions(title: string, checkEnabled: boolean): SohoDataGridOptions {
      // const hiddenColumns = this.cleanUserSettings();
      const dataSet = this.dataStore.getGridDataValue();
      const hiddenColumns = []
      const showColumns = ["ZSUN", "ZFAN", "ZCOR", "ZFNM", "ZSTA"]
      const hideColumns = hiddenColumns.length > 0 && dataSet.length > 0 ? hiddenColumns : this.filterRequired(dataSet, showColumns);
      return {
         columns: dataSet.length == 0 ? [] : this.setColumns(checkEnabled, dataSet, hideColumns),
         dataset: dataSet,
         toolbar: {
            title: title,
            results: true,
            actions: true,
            rowHeight: true,
            personalize: true,
            keywordFilter: false,
            collapsibleFilter: false,
            exportToExcel: false,
            hasMoreButton: true,
            resizeContainers: true,
            maxVisibleButtons: 5,
            favorButtonset: false,
            filterRow: false,
            advancedFilter: false,
            dateFilter: false,
            // views: true,
            resetLayout: true,
            fullWidth: true,
            contextualToolbar: false,
         },
         columnReorder: true,
         alternateRowShading: false,
         cellNavigation: true,
         disableClientSort: false,
         disableClientFilter: false,
         rowHeight: 'small',
         paging: true,
         pagesize: 15,
         pagesizes: [15, 30, 50],
         editable: false,
         filterable: true,
         showSelectAllCheckBox: true,
         // selectable: checkEnabled ? 'multiple' : false,
         selectable: 'single',
         saveUserSettings: {
            columns: true,
            rowHeight: true,
            sortOrder: true
         },
         uniqueId: environment.applicationId + '_GridView',
         clickToSelect: true,
         menuId: 'grid-options_menu',
      }
   }


   private cleanUserSettings(): string[] {
      const key = `${environment.applicationId}_GridView-usersettings-columns`;
      const userSettingsCols = JSON.parse(localStorage.getItem(key) || '[]');
      if (!userSettingsCols?.length) return [];
      if (userSettingsCols[0].id === 'selectionCheckbox') {
         userSettingsCols.shift();
         localStorage.setItem(key, JSON.stringify(userSettingsCols));
      }
      return userSettingsCols
         .filter((col: any) => col.hidden === true)
         .map((col: any) => col.id);
   }

   private setColumns(checkEnabled: boolean, dataSet: any[] = [], hiddenColumns: string[] = []): SohoDataGridColumn[] {
      const cols: SohoDataGridColumn[] = [];
      const gridColumnsNames=this.dataStore.getLanguageValue().gridColumns;

      if (dataSet && dataSet.length > 0) {
         const sample = dataSet[0];
         Object.keys(sample).forEach((key) => {
            const value = sample[key];
            let formatter: SohoDataGridColumnFormatterFunction | undefined = undefined;
            let editor: SohoDataGridColumnEditorFunction | undefined = Soho.Editors.Input;
            let filterType: string = 'text';
            if (value instanceof Date || /^\d{4}-\d{2}-\d{2}/.test(value) /*|| /^\d{8}$/.test(value)*/) {
               formatter = Soho.Formatters.Date;
               editor = Soho.Editors.Date;
               filterType = 'date';
            } else if (typeof value === 'number') {
               formatter = Soho.Formatters.Decimal;
               editor = Soho.Editors.Input;
               filterType = 'text';
            } else if (typeof value === 'boolean') {
               formatter = Soho.Formatters.Checkbox;
               editor = Soho.Editors.Checkbox;
               filterType = 'checkbox';
            }
            cols.push({
               id: key,
               name: gridColumnsNames[this.capitalizeFirstLetter(key)],
               field: key,
               sortable: true,
               filterType,
               width: 'auto',
               textOverflow: 'ellipsis',
               formatter,
               editor,
               hidden: hiddenColumns.includes(key)
            });
         });
      }
      // if (checkEnabled) {
      //    cols.unshift({
      //       id: 'selectionCheckbox',
      //       name: '',
      //       field: '',
      //       formatter: Soho.Formatters.SelectionCheckbox,
      //       align: 'center',
      //       width: 5,
      //       sortable: false,
      //       resizable: false,
      //    });
      // }
      return cols;
   }

   private capitalizeFirstLetter(str: string): string {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
   }

   createTableRow() {
      const filteredArray = this.dataStore.getFilteredGridDataValue();
      if (!filteredArray?.length) return;
      const createObj = Object.fromEntries(
         filteredArray.map(f => [f.columnId, f.value])
      );

      //------> Here can be implemented logic of the KEY filtering for creation.

      const curGridData = this.dataStore.getGridDataValue();
      const ifExists = curGridData.some(item =>
         Object.entries(createObj).every(([key, value]) => {
            const itemVal = item[key];
            if (itemVal == null || value == null) return false;
            if (typeof itemVal === 'string' && typeof value === 'string') {
               return itemVal.toLowerCase() === value.toLowerCase();
            }
            return itemVal === value;
         })
      );
      if (ifExists) {
         this.sohoMessageService.error({
            title: 'Record exists',
            message: "Current option already exists.",
            buttons: [
               {
                  text: 'Close',
                  click: (_e, modal) => modal.close(true),
                  isDefault: true
               }
            ]
         }).open();
         return;
      }
      curGridData.unshift(createObj);
      this.dataStore.setGridData(curGridData);
      this.dataStore.setHeaderOptionTrigger(undefined);
   }

   copyTableRow() {
      const selectedObj = this.dataStore.getSelectedGridDataValue()[0];
      console.log(selectedObj);
      const newObj = structuredClone(selectedObj);
      Object.keys(newObj).forEach((key) => {
         const value = newObj[key];
         if (key === 'USID') {
            newObj[key] = value + "_1";
         }
      });
      const curGridData = this.dataStore.getGridDataValue();
      curGridData.unshift(newObj);
      this.dataStore.setGridData(curGridData);
      this.dataStore.setHeaderOptionTrigger(undefined);
   }

   removeTableSelectedRow(rowData: any[]) {
      this.sohoMessageService.confirm({
         title: 'Confirm Deletion',
         message: 'Are you sure you want to delete the selected rows?',
         buttons: [
            {
               text: 'Yes',
               click: (_e, modal) => {
                  modal.close(true);
                  this.dataStore.getGridData().pipe(take(1)).subscribe(gridData => {
                     const filteredGridData = gridData.filter(data =>
                        !rowData.some(row =>
                           JSON.stringify(row) === JSON.stringify(data)
                        )
                     );
                     this.dataStore.setGridData(filteredGridData);
                     this.dataStore.setHeaderOptionTrigger(undefined);
                  });
               },
               isDefault: true
            },
            {
               text: 'No',
               click: (_e, modal) => {
                  this.dataStore.setHeaderOptionTrigger(undefined);
                  modal.close(false);
               }
            }
         ]
      }).open();
   }

   filterTableData() {
      this.dataStore.getHeaderSearchValue().pipe(take(1)).subscribe(data => {
         const searchValue = data.value;
         if (searchValue && searchValue.trim() !== "") {
            if (!this.data || this.data.length === 0) {
               this.data = [...this.dataStore.getGridDataValue()];
               this.applyFilter(searchValue);
            } else {
               this.applyFilter(searchValue);
            }
         } else {
            if (this.data) {
               this.dataStore.setGridData([...this.data]);
               this.data = [];
               this.filteredData = [];
            }
         }
      });
      this.dataStore.setHeaderSearchValue(undefined);
   }

   private applyFilter(searchValue: string) {
      const search = searchValue.toLowerCase();
      this.filteredData = this.data.filter(item =>
         Object.values(item).some(val =>
            val != null && String(val).toLowerCase().includes(search)
         )
      );
      console.log(this.filteredData)
      this.dataStore.setGridData([...this.filteredData]);
   }

   private filterRequired(data: any[], showFields: any[]) {
      if (!data || !showFields) {
         return [];
      }
      if (data.length==0||showFields.length == 0) {
         return [];
      }
      const hiddenFields = Object.keys(data[0]).filter(k => !showFields.includes(k));
      return hiddenFields;
   }
}
