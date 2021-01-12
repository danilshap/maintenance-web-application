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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientPagesModule,
    AdminPagesModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [RepairOrderService, ClientService, CarService, WorkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
