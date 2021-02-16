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
  currentPage!: number;
  maxPages!: number;
  maxCount!: number;

  constructor(private router: Router, private workerService: WorkerService){}

  ngOnInit(): void {
    this.currentPage = 1;
    this.workerService.getWorkersViewData(this.currentPage).subscribe((data: any[]) => {
      this.workersViewData = data as WorkerViewData[];

      this.workerService.getWorkersTableInfo().subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
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
    return ststus === 'Работает в данный момент' || ststus === 'Уволен';
  }

  infoWorker(id: number): void{
    this.router.navigate(['admin/worker_info', id]);
  }

  // получить цвет строки для конкретного работника
  getColorForTableRow(status: string): string{
    return status === 'Уволен' ? 'table-danger' : status === 'На работе. Свободен' ? 'table-success' : 'table-warning';
  }

  changePage(page: number): void {
    this.workerService.getWorkerViewData(page).subscribe((data: any[]) => {
      this.workersViewData = data as WorkerViewData[];

      document.getElementById(`data-page-${this.currentPage}`)?.classList.add('btn-outline-secondary');
      document.getElementById(`data-page-${this.currentPage}`)?.classList.remove('btn-secondary');
      this.currentPage = page;
      document.getElementById(`data-page-${this.currentPage}`)?.classList.add('btn-secondary');
      document.getElementById(`data-page-${this.currentPage}`)?.classList.remove('btn-outline-secondary');
    });
  }
}
