import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"

@Component({
  selector: 'client-index-page',
  templateUrl: 'client-index-page.component.html',
})
export class ClientIndexPageComponent{
  constructor(private router: Router) {}

  // перенаправление на страницу оформления заявки на "звонок"
  makeRequest(): void{
    this.router.navigate(['/client/form']);
  }
}
