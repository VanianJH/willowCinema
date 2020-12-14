import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay-result',
  templateUrl: './pay-result.component.html',
  styleUrls: ['./pay-result.component.css']
})
export class PayResultComponent implements OnInit {
  failed:boolean = false;
  movieName: string = "只狼";
  time : string = "今天下午2:00";
  hall: string = "中广国际影城";
  seats = []
  price: number = 0;

  @Input()
  father: any;

  constructor() { }

  ngOnInit(): void {
    this.father.payResult = this;
  }

  updateMsg(msg) {
    this.movieName = msg['filmName']
    this.time = msg['time']
    this.seats = msg['seat']
    this.hall = msg['hall']
    this.price = msg['price']
    this.failed = msg['failed']
  }
}
