import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClientHomePageComponent } from './client-home-page/client-home-page.component';
import { ClientIndexPageComponent } from './client-index-page/client-index-page.component';
import { ClientPagesRoutingModule } from './client-pages-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ClientPagesRoutingModule,
  ],
  declarations: [
    ClientIndexPageComponent,
    ClientHomePageComponent,
  ],
  providers: []
})
export class ClientPagesModule {}
