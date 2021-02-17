import { AuthService } from './../../../models/sevices/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/entities/user';
import { PersonRequestViewData } from 'src/models/view-data/person-request-view-data';
import { PersonRequestService } from 'src/models/sevices/person-request.service';

@Component({
  selector: 'admin-home-page',
  templateUrl: './admin-home-page.component.html'
})
export class AdminHomePageComponent implements OnInit {
  user!: User;
  personRequests: PersonRequestViewData[] = [];
  maxCount!: number;  // максимальное количество данных

  constructor(private router: Router,
              private authService: AuthService,
              private personRequestService: PersonRequestService){
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    this.personRequestService.getPersonRequests(1, false).subscribe((data: any) => {
      this.personRequests = data.slice(0, 3) as PersonRequestViewData[];

      this.personRequestService.getPersonRequestsTableInfo(false).subscribe((info: any) => {
        this.maxCount = info.count;
      });
    });
  }

  // переход на строаницу авторизации
  logout(): void{
    this.authService.logout();
    this.router.navigate(['login']);
  }

  toRepairOrdeer(id: number): void {
    this.router.navigate(['admin/repair_order_form', id]);
  }
}
