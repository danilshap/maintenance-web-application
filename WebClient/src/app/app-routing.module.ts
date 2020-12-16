import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientHomePageComponent } from './client-pages/client-home-page/client-home-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/client', pathMatch: 'full'},
  {path: 'client', component: ClientHomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
