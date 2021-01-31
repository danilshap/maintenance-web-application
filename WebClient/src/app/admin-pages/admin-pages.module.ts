import { AuthService } from './../../models/sevices/auth.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminIndexPageComponent } from './admin-index-page/admin-index-page.component';
import { RepairOrderCardComponent } from './admin-index-page/repair-order-card/repair-order-card.component';
import { AdminPagesRoutingModule } from './admin-pages-routiong.module';
import { CarInfoComponent } from './admin-repair-order-info-page/car-info-component/car-info.component';
import { ClientInfoComponent } from './admin-repair-order-info-page/client-info-component/client-info.component';
import { WorkerInfoComponent } from './admin-repair-order-info-page/worker-info-component/worker-info.component';
import { RepairOrderInfoPageComponent } from './admin-repair-order-info-page/admin-repair-order-info-page.component';
import { AdminPersonsRequestsPageComponent } from './admin-persons-requests-page/admin-persons-requests-page.component';
import { PersonRequestCardComponent } from './admin-persons-requests-page/person-request-card/person-request-card.component';
import { AdminReportsPageComponent } from './admin-reports-page/admin-reports-page.component';
import { AdminClientsTableDataPageComponent } from './admin-clients-table-data-page/admin-clients-table-data-page.component';
import { AdminCarsTableDataPageComponent } from './admin-cars-table-data-page/admin-cars-table-data-page.component';
import { AdminWorkersTableDataPageComponent } from './admin-workers-table-data-page/admin-workers-table-data-page.component';
import { AdminCarFormPageComponent } from './admin-car-form-page/admin-car-form-page.component';
import { AdminClientFormPageComponent } from './admin-client-form-page/admin-client-form-page.component';
import { AdminWorkerFormPageComponent } from './admin-worker-form-page/admin-worker-form-page.component';
import { AdminRepairOrderFormPageComponent } from './admin-repair-order-form-page/admin-repair-order-form-page.component';
import { AdminWorkerInfoPageComponent } from './admin-worker-info-page/admin-worker-info-page.component';
import { AdminClientInfoPageComponent } from './admin-client-info-page/admin-client-info-page.component';
import { AdminCarInfoPageComponent } from './admin-car-info-page/admin-car-info-page.component';
import { AdminRepairOrdersDataTableComponent } from './admin-repair-orders-data-table/admin-repair-orders-data-table.component';
import { AdminAddressTablePageComponent } from './admin-address-table-page/admin-address-table-page.component';
import { AdminDetailsTablePageComponent } from './admin-details-table-page/admin-details-table-page.component';
import { AdminMalfunctionTablePageComponent } from './admin-malfunction-table-page/admin-malfunction-table-page.component';
import { AdminModelsTablePageComponent } from './admin-models-table-page/admin-models-table-page.component';
import { AdminPersonRequestsTablePageComponent } from './admin-person-requests-table-page/admin-person-requests-table-page.component';
import { AdminPersonsTablePageComponent } from './admin-persons-table-page/admin-persons-table-page.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AdminPagesRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    AdminIndexPageComponent,
    AdminHomePageComponent,
    AdminPersonsRequestsPageComponent,
    RepairOrderCardComponent,
    RepairOrderInfoPageComponent,
    PersonRequestCardComponent,
    AdminReportsPageComponent,
    AdminClientsTableDataPageComponent,
    AdminCarsTableDataPageComponent,
    AdminWorkersTableDataPageComponent,
    CarInfoComponent,
    ClientInfoComponent,
    WorkerInfoComponent,
    AdminWorkerInfoPageComponent,
    AdminClientInfoPageComponent,
    AdminCarInfoPageComponent,
    AdminCarFormPageComponent,
    AdminClientFormPageComponent,
    AdminWorkerFormPageComponent,
    AdminRepairOrderFormPageComponent,
    AdminRepairOrdersDataTableComponent,
    AdminAddressTablePageComponent,
    AdminDetailsTablePageComponent,
    AdminMalfunctionTablePageComponent,
    AdminModelsTablePageComponent,
    AdminPersonRequestsTablePageComponent,
    AdminPersonsTablePageComponent,
  ],
  providers: [
    AuthService,
  ],
})
export class AdminPagesModule {}
