import { OnInit, Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WorkerService } from 'src/models/sevices/worker.service';
import { WorkerViewData } from 'src/models/view-data/worker-view-data';
import { IInfoPageComponent } from 'src/models/interfaces/IInfoPageComponent';

@Component({
  selector: 'admin-worker-info-page',
  templateUrl: 'admin-worker-info-page.component.html',
})
export class AdminWorkerInfoPageComponent implements OnInit, IInfoPageComponent{
  workerViewData!: WorkerViewData;  // данные о работнике

  constructor(private router: Router,
              private workerService: WorkerService,
              private location: Location,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // получение данных из роутера
    this.activatedRoute.params.forEach((params: Params) => {
      // если данные по id есть, но этого быть не может)
      // то мы отправляем запрос на получение данных
      if (params.id !== undefined) {
        // получение даных для отображения
        this.workerService.getWorkerViewData(params.id).subscribe((data: any) => {
          this.workerViewData = data as WorkerViewData;
        });
      }
    });
  }

  // реализация интерфеса - вернуться назад
  goBack(): void { this.location.back(); }

  // реализация интерфеса - редактировать данные
  edit(): void {
    this.router.navigate(['admin/worker_form', this.workerViewData.id]);
  }
}
