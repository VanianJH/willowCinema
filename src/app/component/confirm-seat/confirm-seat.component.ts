import { Component, OnInit, Input } from '@angular/core';
import { TimeoutError } from 'rxjs';

@Component({
  selector: 'app-confirm-seat',
  templateUrl: './confirm-seat.component.html',
  styleUrls: ['./confirm-seat.component.css']
})
export class ConfirmSeatComponent implements OnInit {
  @Input()
  next: any;

  private timer;
  second = 0;
  minute = 15;

  private timeout: boolean = false;
  confirmBtnMsg = "确认支付";

  constructor() {
    this.timer = setInterval(() => { this.updateTime() }, 1000);
  }

  ngOnInit(): void {

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

  confirmPay() {
    if(this.timeout) {

    } else {
      this.next()
    }
  }

}