import {Injectable} from '@angular/core';
import {SohoLookupComponent} from "ids-enterprise-ng";
import {DataStoreService} from "../../store/data-store.service";

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(
    private dataStore: DataStoreService,
  ) {
  }

  private content=this.dataStore.getLanguageValue();

  async initLookup(lookup: SohoLookupComponent, title: string, field: string, data: any[],hiddenColumns:any[]=[],showColumns:any[]=[]): Promise<void> {
    lookup.field = field;
    lookup.tabbable = false;
    lookup.title = this.content.lookupFilters.facility.label;
    lookup.dataset = data;
    lookup.clearable = false;
    const hideColumns=hiddenColumns.length>0?hiddenColumns:this.filterRequired(data,showColumns);
    lookup.columns = this.setColumns(data,hideColumns);
    lookup.options = {
      toolbar: {
        results: false
      },
      indeterminate: true,
      filterable: true,
      paging: true,
      pagesize: 10,
      showFilterTotal: false,
      rowHeight: 'small',
      showPageSizeSelector: false,
      allowSelectAcrossPages: false,
      hidePagerOnOnePage: true,
      selectable: 'single',
      clickToSelect: true,
      disableClientFilter: true,
      filterWhenTyping: false,
      editable: true,
      source: async (req, response) => {
        const value = req?.filterExpr?.[0]?.value ?? '';
        const pageSize = req?.pagesize ?? 5;
        const activePage = req?.activePage ?? 1;
        const {hideDisabledPagers, ...cleanReq} = req;
        const allData = this.dataStore.getLstFacilitiesValue();
        let filtered = allData;
        if (value) {
          filtered = allData.filter(item =>
            Object.values(item).some(val =>
              String(val).toLowerCase().includes(value.toLowerCase())
            )
          );
        }
        const total = filtered.length;
        const start = (activePage - 1) * pageSize;
        const end = start + pageSize;
        const pageData = filtered.slice(start, end);
        const isFirstPage = activePage === 1;
        const isLastPage = end >= total;
        response(pageData, {
          ...cleanReq,
          activePage,
          pagesize: pageSize,
          firstPage: isFirstPage,
          lastPage: isLastPage,
          hideDisabledPagers: true,
        });
      }
    };
    lookup.buttons = [
      {
        text: 'Cancel',
        click: (e, modal) => {
         //  lookup.setValue([]);
          // this.dataStore.setGridData([]);
          modal.destroy()
        }
      }
    ];
  }

  private setColumns(dataSet: any[] = [], hiddenColumns: string[] = []): SohoDataGridColumn[] {
    const cols: SohoDataGridColumn[] = [];
    if (dataSet && dataSet.length > 0) {
      const sample = dataSet[0];
      Object.keys(sample).forEach((key) => {
        const value = sample[key];
        let formatter: SohoDataGridColumnFormatterFunction | undefined = undefined;
        let editor: SohoDataGridColumnEditorFunction | undefined = Soho.Editors.Input;
        let filterType: string = 'text';
        if (value instanceof Date || /^\d{4}-\d{2}-\d{2}/.test(value) || /^\d{8}$/.test(value)) {
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
          name: this.content.lookupFilters.facility.fields[key],
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

    return cols;
  }

  private capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private filterRequired(data:any[],showFields:any[]){
   if(showFields.length==0){
      return [];
   }
   const hiddenFields = Object.keys(data[0]).filter(k=>!showFields.includes(k));
   return hiddenFields;
  }
}
