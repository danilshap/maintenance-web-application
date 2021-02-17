import { WorkerStatusesService } from './../models/sevices/worker-statuses.service';
import { PersonRequestStausesService } from './../models/sevices/person-request-status.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsService } from './../models/sevices/reports.service';
import { RepairOrderService } from './../models/sevices/repair-order.service';
import { AdminPagesModule } from './admin-pages/admin-pages.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientPagesModule } from './client-pages/client-pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ClientService } from 'src/models/sevices/client.service';
import { CarService } from 'src/models/sevices/car.service';
import { WorkerService } from 'src/models/sevices/worker.service';
import { SpecialtyService } from 'src/models/sevices/specialty.service';
import { PersonRequestService } from 'src/models/sevices/person-request.service';
import { MalfunctionService } from 'src/models/sevices/malfunction.service';
import { UserService } from 'src/models/sevices/user.service';
import { AuthService } from 'src/models/sevices/auth.service';
import { AuthGuard } from 'src/models/sevices/auth-guard.service';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddressesService } from 'src/models/sevices/adresses.service';
import { DetailsService } from 'src/models/sevices/details.service';
import { MarksService } from 'src/models/sevices/marks.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { PersonService } from 'src/models/sevices/person.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientPagesModule,
    AdminPagesModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxEchartsModule,
  ],
  providers: [
    RepairOrderService,
    ClientService,
    CarService,
    WorkerService,
    SpecialtyService,
    PersonRequestService,
    MalfunctionService,
    ReportsService,
    UserService,
    AuthService,
    AuthGuard,
    DetailsService,
    AddressesService,
    MarksService,
    PersonRequestStausesService,
    WorkerStatusesService,
    PersonService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
