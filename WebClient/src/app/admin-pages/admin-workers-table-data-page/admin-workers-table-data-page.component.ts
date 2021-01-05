import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'admin-worker-table-data-page',
  templateUrl: './admin-workers-table-data-page.component.html',
})
export class AdminWorkersTableDataPageComponent{
  constructor(private router: Router){}

  appendNewWorker(): void{
    this.router.navigate(['admin/worker_form']);
  }
}
