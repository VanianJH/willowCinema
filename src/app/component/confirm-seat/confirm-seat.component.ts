import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BuyTicketService } from 'src/app/service/buy-ticket/buy-ticket.service';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-confirm-seat',
  templateUrl: './confirm-seat.component.html',
  styleUrls: ['./confirm-seat.component.css']
})
export class ConfirmSeatComponent implements OnInit {
  @Input()
  next: any;
  @Input()
  father: any;

  private timer;
  second = 24;
  minute = 15;

  timeout: boolean = false;
  confirmBtnMsg = "确认支付";

  isCanceled = false;

  constructor(private route: Router, 
              private buy: BuyTicketService,
              private login: LoginService,
              private cookie: CookieService) {
    this.timer = setInterval(() => { this.updateTime() }, 1000);
  }
  
  movieName: string = "只狼";
  date: string = "今天下午 2:00"
  hallName: string = "3号厅";
  seats: number[][] = [[1, 2]]; 
  price: number= 28;
  tickets: any = []
  orderId: string = ''
  updateMsg(msg) {
    this.movieName = msg['filmName']
    this.date = msg['time']
    this.seats = msg['seat']
    this.hallName = msg['hall']
    this.price = msg['price']
    this.tickets =msg['tickets']
    this.orderId = msg['orderId']
    this.setCouponMsg()
  }

  ngOnInit(): void {
    this.father.setConfirmMsg(this);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateTime() {
    if(this.second>0 || this.minute>0) {
      if(this.second===0) {
        this.minute-=1;
        this.second=60;
      }
      else {
        this.second -= 1;
      }
    } else {
      this.timeout = true;
      this.confirmBtnMsg = "超时无法支付"
    }
  }

  async confirmPay() {
    if(this.timeout) {
      this.route.navigateByUrl('/')
    } else {
      let tids = this.tickets.map(a=>a['id'])
      const res  = await this.buy.vipBuy(this.orderId, tids, this.couponID) 
      if(res['success']) {
        console.log(res)
      } else {
        const cardres = await this.login.getCardId(JSON.parse(this.cookie.get('userMsg'))['id'])
        if(cardres['success']) {
          const chargeRes = await this.login.chargeCard(cardres['content']['id'])
          if(chargeRes['success']) {
            const nres = await this.buy.vipBuy(this.orderId, tids, this.couponID);
          }
        }
      }
      this.father.updatePayResult({
        filmName: this.movieName,
        time: this.date,
        seat: this.seats,
        hall: this.hallName,
        price: this.price,
        failed: this.timeout
      })
      this.next()
    }
  }

  couponSelect: any;
  setCouponSelect(som) {
    this.couponSelect = som
  }

  setCouponMsg() {
    this.couponSelect.setCouponMsg(this.tickets[0]['id'])
  } 

  couponID:number = 0; 
  selectCoupon(target, discount, id) {
    if(this.price>target) {
      this.price -= discount;
      this.couponID = id
      console.log(this.couponID)
    }
  }

}