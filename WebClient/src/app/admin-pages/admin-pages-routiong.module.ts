import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminIndexPageComponent } from './admin-index-page/admin-index-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admin', component: AdminHomePageComponent,
        children: [
          {path: '', redirectTo: '/index', pathMatch: 'full'},
          {path: 'index', component: AdminIndexPageComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule {

}
