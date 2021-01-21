import { AuthService } from './../../../models/sevices/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/entities/user';
import { PersonRequestViewData } from 'src/models/view-data/person-request-view-data';
import { PersonRequestService } from 'src/models/sevices/person-request.service';

@Component({
  selector: 'admin-home-page',
  templateUrl: './admin-home-page.component.html',
})
export class AdminHomePageComponent implements OnInit {
  user!: User;
  personRequests: PersonRequestViewData[] = [];

  constructor(private router: Router,
              private authService: AuthService,
              private personRequestService: PersonRequestService){
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    this.personRequestService.getPersonRequests().subscribe((data: any) => {
      let template = data as PersonRequestViewData[];
      for (let i = 0; i < template.length; i++) {
        if (i > 3) { break; }
        this.personRequests.push(template[i]);
      }
    });
  }

  // переход на строаницу авторизации
  logout(): void{
    this.authService.logout();
    this.router.navigate(['login']);
  }

  toRepairOrdeer(id: number) : void {
    this.router.navigate(['admin/repair_order_form', id]);
  }
}
