import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-client-table-data-page',
  templateUrl: './admin-clients-table-data-page.component.html',
})
export class AdminClientsTableDataPageComponent {
  constructor(private router: Router){}

  appendNewClient(): void {
    this.router.navigate(['admin/client_form']);
  }
}
