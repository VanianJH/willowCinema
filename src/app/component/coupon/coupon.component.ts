import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  @Input()
  couponMsg: any;

  constructor() { }

  ngOnInit(): void {
    
  }

}
