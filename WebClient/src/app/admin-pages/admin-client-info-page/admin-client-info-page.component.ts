import { Component } from '@angular/core';
import { ClientViewData } from 'src/models/view-data/client-view-data';

@Component({
  selector: 'admin-client-info-page',
  templateUrl: './admin-client-info-page.component.html'
})
export class AdminClientInfoPageComponent{
  clientViewData: ClientViewData | undefined;

  
}
