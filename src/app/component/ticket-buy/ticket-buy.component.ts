import {Component, OnInit} from '@angular/core';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-ticket-buy',
  templateUrl: './ticket-buy.component.html',
  styleUrls: ['./ticket-buy.component.css']
})
export class TicketBuyComponent implements OnInit {

  name = 'Angular';
  private stepper: Stepper;

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

}

