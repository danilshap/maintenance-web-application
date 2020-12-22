import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminIndexPageComponent } from './admin-index-page/admin-index-page.component';
import { AdminPagesRoutingModule } from './admin-pages-routiong.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AdminPagesRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminIndexPageComponent,
    AdminHomePageComponent
  ],
  providers: [],
})
export class AdminPagesModule {}
