import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListviewService {

  constructor() {
  }

  getListviewConfig(): {
    paging: boolean;
    pagesize: number;
    selectable: SohoListViewSelectable;
    searchable: boolean,
    template: string
  } {
    return {
      paging: true,
      pagesize: 5,
      selectable: "single",
      searchable: true,
      template: `<ul>
                   {{#dataset}}
                       <li soho-listview-item>
                           <p soho-listview-header>{{title}}</p>
                           <p soho-listview-subheader>{{description}}</p>
                           <p soho-listview-micro>{{icon}}</p>
                       </li>
                   {{/dataset}}
                 </ul>`,
    };
  }
}
