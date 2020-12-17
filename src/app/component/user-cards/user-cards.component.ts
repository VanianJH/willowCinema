import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/service/User/user.service';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {

  constructor(private cookie: CookieService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserCoupons(JSON.parse(this.cookie.get('userMsg'))['id'])
        .subscribe(res=>{
          if(res['success']) {
            this.couponList = res['content'] 
          }
        })
  }

  couponList: [];
}
