import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientHomePageComponent } from './client-home-page/client-home-page.component';
import { ClientIndexPageComponent } from './client-index-page/client-index-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', redirectTo: '/client', pathMatch: 'full'},
      {
        path: 'client', component: ClientHomePageComponent,
        children: [
          {path: '', redirectTo: '/index', pathMatch: 'full'},
          {path: 'index', component: ClientIndexPageComponent},
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class ClientPagesRoutingModule {

}
