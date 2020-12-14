import { Component, Input, OnInit } from '@angular/core';
import { BuyTicketService } from 'src/app/service/buy-ticket/buy-ticket.service';

@Component({
  selector: 'app-coupon-select',
  templateUrl: './coupon-select.component.html',
  styleUrls: ['./coupon-select.component.css']
})
export class CouponSelectComponent implements OnInit {

  @Input()
  father: any;

  constructor(private buy: BuyTicketService) { }

  ngOnInit(): void {
    this.father.setCouponSelect(this);
  }
  
  couponList: []
  setCouponMsg(ticketId) {
    this.buy.getCoupon(ticketId).subscribe(
      res=>{
        if(res['success']) {
          this.couponList = res['content']['couponVOList']
        }
        else {}
      }
    )
  }

  selectCoupon(targetAmount, discountAmount, couponId) {
    this.father.selectCoupon(targetAmount, discountAmount, couponId)
  }

}
