import {Component, OnInit} from '@angular/core';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-ticket-buy',
  templateUrl: './ticket-buy.component.html',
  styleUrls: ['./ticket-buy.component.css']
})
export class TicketBuyComponent implements OnInit {
  disable1:boolean = true;
  disable2:boolean = true;
  disable3:boolean = true;

  name = 'Angular';
  private stepper: Stepper;

  confirmMsg: any;
  payResult: any;

  setConfirmMsg(child) {
    this.confirmMsg = child
    // console.log(this.confirmMsg.movieName)
  }

  updateConfirmMsg(msg) {
    this.confirmMsg.updateMsg(msg)
  }

  updatePayResult(msg) {
    this.payResult.updateMsg(msg)
  }

  next(): void {
    this.stepper.next();
  }

  onSubmit(): boolean {
    return false;
  }

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
  }
  doNothing() {

  }
}

