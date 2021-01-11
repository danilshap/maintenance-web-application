import { Component, Input } from '@angular/core';
import { ClientViewData } from 'src/models/view-data/client-view-data';

@Component({
  selector: 'client-info',
  templateUrl: './client-info.component.html',
})
export class ClientInfoComponent{
  @Input()
  clientViewData!: ClientViewData;

  showCorrectDate(date: any): string {
    return new Date(date).toLocaleDateString();
  }
}
