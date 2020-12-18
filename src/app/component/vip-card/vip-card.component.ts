import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/service/User/user.service';
import { Component, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-vip-card',
  templateUrl: './vip-card.component.html',
  styleUrls: ['./vip-card.component.css']
})
export class VipCardComponent implements OnInit{

  constructor(private cookie: CookieService,
              private user: UserService) { }
  

  joinDate : string;
  balance: number;
  id: number;
  ngOnInit(): void {
    this.user.getUserVipCard(JSON.parse(this.cookie.get('userMsg'))['id'])
        .subscribe(res=>{
          if(res['success']) {
            console.log(res['content'])
            this.id = res['content']['id']
            this.balance = res['content']['balance']
            this.joinDate = res['content']['joinDate'].slice(0, 10)
          } 
        })
  }

  

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  
}
