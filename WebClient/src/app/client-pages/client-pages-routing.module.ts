import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClientAboutPageComponent } from './client-about-page/client-about-page.component';
import { ClientFormPageComponent } from './client-form-page/client-form-page.component';
import { ClientHomePageComponent } from './client-home-page/client-home-page.component';
import { ClientIndexPageComponent } from './client-index-page/client-index-page.component';
import { ClientTaskPageComponent } from './client-task-page/client-task-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', redirectTo: 'client', pathMatch: 'full'},
      {
        path: 'client', component: ClientHomePageComponent,
        children: [
          {path: '', redirectTo: 'index', pathMatch: 'full'},
          {path: 'index', component: ClientIndexPageComponent},
          {path: 'form', component: ClientFormPageComponent},
          {path: 'task', component: ClientTaskPageComponent},
          {path: 'about', component: ClientAboutPageComponent},
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class ClientPagesRoutingModule {

}
