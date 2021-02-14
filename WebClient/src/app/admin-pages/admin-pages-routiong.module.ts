import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminIndexPageComponent } from './admin-index-page/admin-index-page.component';
import { AdminPersonsRequestsPageComponent } from './admin-persons-requests-page/admin-persons-requests-page.component';
import { RepairOrderInfoPageComponent } from './admin-repair-order-info-page/admin-repair-order-info-page.component';
import { AdminReportsPageComponent } from './admin-reports-page/admin-reports-page.component';
import { AdminCarsTableDataPageComponent } from './admin-cars-table-data-page/admin-cars-table-data-page.component';
import { AdminClientsTableDataPageComponent } from './admin-clients-table-data-page/admin-clients-table-data-page.component';
import { AdminWorkersTableDataPageComponent } from './admin-workers-table-data-page/admin-workers-table-data-page.component';
import { AdminCarFormPageComponent } from './admin-car-form-page/admin-car-form-page.component';
import { AdminClientFormPageComponent } from './admin-client-form-page/admin-client-form-page.component';
import { AdminWorkerFormPageComponent } from './admin-worker-form-page/admin-worker-form-page.component';
import { AdminRepairOrderFormPageComponent } from './admin-repair-order-form-page/admin-repair-order-form-page.component';
import { AdminWorkerInfoPageComponent } from './admin-worker-info-page/admin-worker-info-page.component';
import { AdminClientInfoPageComponent } from './admin-client-info-page/admin-client-info-page.component';
import { AdminCarInfoPageComponent } from './admin-car-info-page/admin-car-info-page.component';
import { AdminRepairOrdersDataTableComponent } from './admin-repair-orders-data-table/admin-repair-orders-data-table.component';
import { AuthGuard } from 'src/models/sevices/auth-guard.service';
import { AdminAddressTablePageComponent } from './admin-address-table-page/admin-address-table-page.component';
import { AdminDetailsTablePageComponent } from './admin-details-table-page/admin-details-table-page.component';
import { AdminMalfunctionTablePageComponent } from './admin-malfunction-table-page/admin-malfunction-table-page.component';
import { AdminMarksTablePageComponent } from './admin-marks-table-page/admin-marks-table-page.component';
import { AdminPersonRequestsTablePageComponent } from './admin-person-requests-table-page/admin-person-requests-table-page.component';
import { AdminPersonsTablePageComponent } from './admin-persons-table-page/admin-persons-table-page.component';
import { AdminSpecialtiesTablePageComponent } from './admin-specialties-table-page/admin-specialties-table-page.component';
import { AdminPersonRequestStatusesTablePageComponent } from './admin-person-request-statuses-table-page/admin-person-request-statuses-table-page.component';
import { AdminWorkerStatusesTablePageComponent } from './admin-worker-statuses-table-page/admin-worker-statuses-table-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admin', component: AdminHomePageComponent, canActivate: [AuthGuard],
        children: [
          {path: '', redirectTo: '/index', pathMatch: 'full'},
          {path: 'index', component: AdminIndexPageComponent},
          {path: 'requests', component: AdminPersonsRequestsPageComponent},
          {path: 'reports', component: AdminReportsPageComponent},
          {path: 'clients_table', component: AdminClientsTableDataPageComponent},
          {path: 'cars_table', component: AdminCarsTableDataPageComponent},
          {path: 'workers_table', component: AdminWorkersTableDataPageComponent},
          {path: 'car_form', component: AdminCarFormPageComponent},
          {path: 'car_form/:id', component: AdminCarFormPageComponent},
          {path: 'car_info/:id', component: AdminCarInfoPageComponent},
          // ---------------------------------------------------------------
          {path: 'client_form', component: AdminClientFormPageComponent},
          {path: 'client_form/:id', component: AdminClientFormPageComponent},
          {path: 'client_info/:id', component: AdminClientInfoPageComponent},
          // ----------------------------------------------------------------
          {path: 'worker_form', component: AdminWorkerFormPageComponent},
          {path: 'worker_info/:id', component: AdminWorkerInfoPageComponent},
          // ----------------------------------------------------------------
          {path: 'repair_order_form', component: AdminRepairOrderFormPageComponent},
          {path: 'repair_order_form/:id', component: AdminRepairOrderFormPageComponent},
          {path: 'repair_order/:id', component: RepairOrderInfoPageComponent},
          {path: 'repair_order_table', component: AdminRepairOrdersDataTableComponent},
          // ------------------------------------------------------------------
          {path: 'addresses_table', component: AdminAddressTablePageComponent},
          {path: 'details_table', component: AdminDetailsTablePageComponent},
          {path: 'malfunction_table', component: AdminMalfunctionTablePageComponent},
          {path: 'models_table', component: AdminMarksTablePageComponent},
          {path: 'person_requests_table', component: AdminPersonRequestsTablePageComponent},
          {path: 'persons_table', component: AdminPersonsTablePageComponent},
          {path: 'specialties_table', component: AdminSpecialtiesTablePageComponent},
          {path: 'person_request_statuses_table', component: AdminPersonRequestStatusesTablePageComponent},
          {path: 'worker_statuses_table', component: AdminWorkerStatusesTablePageComponent},
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule {

}
