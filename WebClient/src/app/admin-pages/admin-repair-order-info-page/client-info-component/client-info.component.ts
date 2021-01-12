import { IDate } from 'src/models/interfaces/IDate';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClientViewData } from 'src/models/view-data/client-view-data';

@Component({
  selector: 'client-info',
  templateUrl: './client-info.component.html',
})
export class ClientInfoComponent implements IDate{
  @Input()
  clientViewData!: ClientViewData;  // отображения клиента

  constructor(private router: Router){}

  // показать корректную дату
  showCorrectDate(date: any): string {
    return new Date(date).toLocaleDateString();
  }

  // открыть форму для изменения заявки
  editClient(): void {
    this.router.navigate(['admin/client_form', this.clientViewData.id]);
  }
}
