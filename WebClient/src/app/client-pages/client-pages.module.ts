import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';

import { ClientAboutPageComponent } from './client-about-page/client-about-page.component';
import { ClientFormPageComponent } from './client-form-page/client-form-page.component';
import { ClientHomePageComponent } from './client-home-page/client-home-page.component';
import { ClientIndexPageComponent } from './client-index-page/client-index-page.component';
import { ClientPagesRoutingModule } from './client-pages-routing.module';
import { ClientTaskPageComponent } from './client-task-page/client-task-page.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ClientPagesRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ClientIndexPageComponent,
    ClientHomePageComponent,
    ClientFormPageComponent,
    ClientAboutPageComponent,
    ClientTaskPageComponent
  ],
  providers: [],
})
export class ClientPagesModule {}
