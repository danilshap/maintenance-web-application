import { Component, Input } from '@angular/core';
import { ClientViewData } from 'src/models/view-data/client-view-data';

@Component({
    selector: 'clients-table-row-component',
    templateUrl: './clients-table-row.component.html',
})
export class ClientsTableRowComponent{
  @Input() clientViewData!: ClientViewData; // данные клента
}
