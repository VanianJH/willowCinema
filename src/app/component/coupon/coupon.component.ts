import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  @Input()
  couponMsg: any;

  constructor(private message: NzMessageService) { }

  ngOnInit(): void {
    
  }

  clickCoupon() {
    // this.message.success('This is a normal message', {
    //   nzDuration: 1000000
    // });
  }
  

}
