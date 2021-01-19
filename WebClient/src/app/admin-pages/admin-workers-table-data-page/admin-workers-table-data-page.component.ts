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

  removeWorker(id: number): void{
    this.workerService.deleteWorkerViewData(id).subscribe(
      (data: any) => {
        console.log('Удаление работника успешно прошло!');
      },
      (error: any) => {
        console.log('Удаление работника не удалось.' + error.message);
      });
  }

  canRemove(ststus: string): boolean {
    return status !== 'Работает в данный момент';
  }

  infoWorker(id: number): void{
    this.router.navigate(['admin/worker_info', id]);
  }

  // получить цвет строки для конкретного работника
  getColorForTableRow(status: string): string{
    return status === 'уволен' ? 'table-danger' : status === 'На работе. Свободен' ? 'table-success' : 'table-warning';
  }
}
