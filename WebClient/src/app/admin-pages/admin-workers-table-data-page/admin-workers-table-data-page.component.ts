import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { WorkerService } from "src/models/sevices/worker.service";
import { WorkerViewData } from "src/models/view-data/worker-view-data";

@Component({
  selector: 'admin-worker-table-data-page',
  templateUrl: './admin-workers-table-data-page.component.html',
})
export class AdminWorkersTableDataPageComponent implements OnInit{
  workersViewData!: WorkerViewData[];

  constructor(private router: Router, private workerService: WorkerService){}

  ngOnInit(): void {
    this.workerService.getWorkersViewData().subscribe((data: any[]) => {
      this.workersViewData = data as WorkerViewData[];
    });
  }

  appendNewWorker(): void{
    this.router.navigate(['admin/worker_form']);
  }

  editWorker(id: number): void{
    this.router.navigate(['admin/worker_form', id]);
  }

  infoWorker(id: number): void{
    this.router.navigate(['admin/worker_info', id]);
  }

  // получить цвет строки для конкретного работника
  getColorForTableRow(status: string): string{
    return status === 'уволен' ? 'table-danger' : status === 'На работе. Свободен' ? 'table-success' : 'table-warning';
  }
}
