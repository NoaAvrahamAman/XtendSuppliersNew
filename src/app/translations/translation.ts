export const Translations = {
   "he-IL": {
      theme: 'נושא',
      search: 'חיפוש...',
      clear: 'נקה',
      modes: 'מצבים',
      colors: 'צבעים',
      new: 'חדש',
      classic: 'קלאסי',
      headerActionsMenuItems: [
         { text: 'עיין', shortcut: 'F4', index: 0 },
         // { text: 'שמור', shortcut: 'F2', index: 1},
         { separator: true },
         { text: 'סגור', shortcut: 'F3', index: 2 }
      ],
      headerOptionsMenuItems: [
         { text: 'צור', shortcut: 'CTRL+1', index: 0 },       // Create
         { text: 'בחר', shortcut: 'CTRL+1', index: 1 },       // Select
         { text: 'שנה', shortcut: 'CTRL+2', index: 2 },       // Change
         { text: 'העתק', shortcut: 'CTRL+3', index: 3 },      // Copy
         { text: 'מחק', shortcut: 'CTRL+4', index: 4 },       // Delete
         { text: 'הצג', shortcut: 'CTRL+5', index: 5 }        // Display
      ],
      headerComponentsMenuItems: [
         { text: '', shortcut: '', index: 0 },
         { text: 'טבלה', shortcut: '', index: 1 },
         { text: 'טבלה עם אפשרויות', shortcut: '', index: 2 }
      ],
      headerActionBtn: 'פעולות',
      headerOptionBtn: 'אפשרויות',
      headerComponentsBtn: 'רכיבים',
      headerSearch: 'חיפוש',
      //////////////////////////////////
      appSettingsLabel: 'הגדרות',
      appSettingsTabLabels: {
         theme: 'נושא',
         size: 'גודל',
         language: 'שפה'
      },
      languageSettingsLabel: "שפה",
      themeSettingsLabel: 'ערכת נושא',
      colorSettingsLabel: 'צבעים',
      lookupFilters: {
         facility: {
            label: "פעילות",
            fields: { "FACI": "פעילות", "FACN": "תאור פעילות" }
         }

      },
      statusOptions: [
            { value: "", name: "" },
            { value: 10, name: "10-מקדמי" },
            { value: 11, name: "11-מספר לקוח זמני" },
            { value: 12, name: "12-ערכים שגויים" },
            { value: 20, name: "20-מוגדר" },
            { value: 90, name: "90-חסום/פג תוקף" },

         ],
      gridColumns: {
         ZCON: "חברה",
         ZFAC: "פעילות",
         ZCOR: "ח.פ ספק",
         ZSUN: "מס. ספק M3",
         ZFAN: "מס. ספק בפעילות",
         ZFNM: "שם ספק בפעילות",
         ZSTA: "סטטוס",
         ZD01: "קבלה יום א",
         ZD02: "קבלה יום ב",
         ZD03: "קבלה יום ג",
         ZD04: "קבלה יום ד",
         ZD05: "קבלה יום ה",
         ZD06: "קבלה יום ו",
         ZD07: "קבלה יום ש",
         ZF11: "ח. קבלה 1 משעה יום א",
         ZF12: "ח. קבלה 1 משעה יום ב",
         ZF13: "ח. קבלה 1 משעה יום ג",
         ZF14: "ח. קבלה 1 משעה יום ד",
         ZF15: "ח. קבלה 1 משעה יום ה",
         ZF16: "חץ קבלה 1 משעה יום ו",
         ZF17: "ח. קבלה 1 משעה יום ש",
         ZT11: "ח. קבלה 1 עד שעה יום א",
         ZT12: "ח. קבלה 1 עד שעה יום ב",
         ZT13: "ח. קבלה 1 עד שעה יום ג",
         ZT14: "ח. קבלה 1 עד שעה יום ד",
         ZT15: "ח. קבלה 1 עד שעה יום ה",
         ZT16: "ח. קבלה 1 עד שעה יום ו",
         ZT17: "ח. קבלה 1 עד שעה יום ש",
         ZF21: "ח. קבלה 2 משעה יום א",
         ZF22: "ח. קבלה 2 משעה יום ב",
         ZF23: "ח. קבלה 2 משעה יום ג",
         ZF24: "ח. קבלה 2 משעה יום ד",
         ZF25: "ח. קבלה 2 משעה יום ה",
         ZF26: "ח. קבלה 2 משעה יום ו",
         ZF27: "ח. קבלה 2 משעה יום ש",
         ZT21: "ח. קבלה 2 עד שעה יום א",
         ZT22: "ח. קבלה 2 עד שעה יום ב",
         ZT23: "ח. קבלה 2 עד שעה יום ג",
         ZT24: "ח. קבלה 2 עד שעה יום ד",
         ZT25: "ח. קבלה 2 עד שעה יום ה",
         ZT26: "ח. קבלה 2 עד שעה יום ו",
         ZT27: "ח. קבלה 2 עד שעה יום ש",

      },
      tableTitle:"ספקים ברמת פעילות",
      nextBtn: 'הבא'
   },
   "en-GB": {
      theme: 'Theme',
      search: 'Search...',
      clear: 'Clear',
      modes: 'Modes',
      colors: 'Colors',
      new: 'New',
      classic: 'Classic',
      headerActionsMenuItems: [
         { text: 'Browse', shortcut: 'F4', index: 0 },
         // {text: 'Save', shortcut: 'F2', index: 1},
         { separator: true },
         { text: 'Close', shortcut: 'F3', index: 2 }
      ],
      headerOptionsMenuItems: [
         { text: 'Create', shortcut: 'CTRL+1', index: 0 },
         { text: 'Select', shortcut: 'CTRL+1', index: 1 },
         { text: 'Change', shortcut: 'CTRL+2', index: 2 },
         { text: 'Copy', shortcut: 'CTRL+3', index: 3 },
         { text: 'Delete', shortcut: 'CTRL+4', index: 4 },
         { text: 'Display', shortcut: 'CTRL+5', index: 5 }
      ],
      headerComponentsMenuItems: [
         { text: '', shortcut: '', index: 0 },
         { text: 'Table', shortcut: '', index: 1 },
         { text: 'Table with options', shortcut: '', index: 2 },
      ],
      headerActionBtn: 'Actions',
      headerOptionBtn: 'Options',
      headerComponentsBtn: 'Components',
      headerSearch: 'Search',
      //////////////////////////////////
      appSettingsLabel: 'Settings',
      appSettingsTabLabels: {
         theme: 'Theme',
         size: 'Size',
         language: 'Language'
      },
      languageSettingsLabel: "Language",
      themeSettingsLabel: 'Theme',
      colorSettingsLabel: 'Color',
      lookupFilters: {
         facility: {
            label: "Facility",
            fields: { "FACI": "Facility", "FACN": "Facility Description" }
         }

      },
      statusOptions: [
            { value: "", name: "" },
            { value: 10, name: "10-Perliminary" },
            { value: 11, name: "11-Temp custom no" },
            { value: 12, name: "12-Incorr values" },
            { value: 20, name: "20-Definite" },
            { value: 90, name: "90-Blocked/expired" },

         ],
      gridColumns: {
         ZCON: "Company",
         ZFAC: "Facility",
         ZCOR: "Org No. Supplier",
         ZSUN: "Supplier M3",
         ZFAN: "Supplier Facility",
         ZFNM: "Supplier Name Facility",
         ZSTA: "Supplier Status Facility",
         ZD01: "GR Day1",
         ZD02: "GR Day2",
         ZD03: "GR Day3",
         ZD04: "GR Day4",
         ZD05: "GR Day5",
         ZD06: "GR Day6",
         ZD07: "GR Day7",
         ZF11: "Del Window 1 From Hour Day 1",
         ZF12: "Del Window 1 From Hour Day 2",
         ZF13: "Del Window 1 From Hour Day 3",
         ZF14: "Del Window 1 From Hour Day 4",
         ZF15: "Del Window 1 From Hour Day 5",
         ZF16: "Del Window 1 From Hour Day 6",
         ZF17: "Del Window 1 From Hour Day 7",
         ZT11: "Del Window 1 To Hour Day 1",
         ZT12: "Del Window 1 To Hour Day 2",
         ZT13: "Del Window 1 To Hour Day 3",
         ZT14: "Del Window 1 To Hour Day 4",
         ZT15: "Del Window 1 To Hour Day 5",
         ZT16: "Del Window 1 To Hour Day 6",
         ZT17: "Del Window 1 To Hour Day 7",
         ZF21: "Del Window 2 From Hour Day 1",
         ZF22: "Del Window 2 From Hour Day 2",
         ZF23: "Del Window 2 From Hour Day 3",
         ZF24: "Del Window 2 From Hour Day 4",
         ZF25: "Del Window 2 From Hour Day 5",
         ZF26: "Del Window 2 From Hour Day 6",
         ZF27: "Del Window 2 From Hour Day 7",
         ZT21: "Del Window 2 To Hour Day 1",
         ZT22: "Del Window 2 To Hour Day 2",
         ZT23: "Del Window 2 To Hour Day 3",
         ZT24: "Del Window 2 To Hour Day 4",
         ZT25: "Del Window 2 To Hour Day 5",
         ZT26: "Del Window 2 To Hour Day 6",
         ZT27: "Del Window 2 To Hour Day 7",
      },
      tableTitle:"Supplier facilities",
      nextBtn: 'Next'
   }
};
