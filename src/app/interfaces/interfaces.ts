import { EComponent } from "../enums/enums";

export interface ITrigger {
   index: number;
   component: EComponent;
}

export interface IHeaderSearch {
   component: string;
   value: string;
}

export interface ISohoPersonalizationColor extends SohoPersonalizationColor {
   id: string;
   name: string;
   value: string;
   backgroundColorClass: string;
}

export interface ISohoTheme extends SohoTheme {
   id: string;
   name: string;
}

export interface IAccordionFilters {
   facility: { val: string, desc?: string },
}

export interface ILookupDisplayColumns {
   facility?: { showColumns?: string[], hideColumns?: [] },
}

export interface ILookupData {
   facility?: any[],
}

export interface IFormFields {
   field: string,
   value: string,
   type: string,
   label?: string,
   readonly?: boolean
   data?: any[],
   desc?: string

}

export interface IForm {
   // keysFields?: IFormFields[],
   // inputFields?: IFormFields[],
   // lookupFields?: IFormFields[],
   // dropdownFields?: IFormFields[],
   // checkboxFields?: IFormFields[],
   // timeFields?: {
   //    from1?: IFormFields[],
   //    to1?: IFormFields[],
   //    from2?: IFormFields[],
   //    to2?: IFormFields[],

   // },
   required: IFormFields[]
   secondary: {
      firstSection: IFormFields[]
      secondSection?: [IFormFields[]]
   }
}

export interface IGridRow {
   ZCON: string,
   ZFAC: string,
   ZSUN: string,
   ZFAN?: string,
   ZCOR?: string,
   ZFNM?: string,
   ZSTA?: number,
   ZD01?: boolean,
   ZD02?: boolean,
   ZD03?: boolean,
   ZD04?: boolean,
   ZD05?: boolean,
   ZD06?: boolean,
   ZD07?: boolean,
   ZF11?: string,
   ZF12?: string,
   ZF13?: string,
   ZF14?: string,
   ZF15?: string,
   ZF16?: string,
   ZF17?: string,
   ZT11?: string,
   ZT12?: string,
   ZT13?: string,
   ZT14?: string,
   ZT15?: string,
   ZT16?: string,
   ZT17?: string,
   ZF21?: string,
   ZF22?: string,
   ZF23?: string,
   ZF24?: string,
   ZF25?: string,
   ZF26?: string,
   ZF27?: string,
   ZT21?: string,
   ZT22?: string,
   ZT23?: string,
   ZT24?: string,
   ZT25?: string,
   ZT26?: string,
   ZT27?: string,
   ZRDT?: string,
   ZUDT?: string,

}
