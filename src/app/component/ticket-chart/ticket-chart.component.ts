import {Component, Input, OnInit} from '@angular/core';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Component({
  selector: 'app-ticket-chart',
  templateUrl: './ticket-chart.component.html',
  styleUrls: ['./ticket-chart.component.css']
})
export class TicketChartComponent implements OnInit {
  @Input()
  next: any;
  @Input()
  price: number = 33;
  @Input()
  hall: string='6号激光厅';
  @Input()
  date: string='今天 12月5 16:40';

  amount: number = 0;
  selectedTickets = [[1, 2]];
  // 0 seletable
  // 1 sold
  // 2 selected
  // 3 empty
  chart: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0],];

  constructor() {
  }

  ngOnInit(): void {

  }

  selectSeat(row: number, col: number) {
    if (this.chart[row][col] === 0) {
      this.addTicket(row, col);
    } else if (this.chart[row][col] === 2) {
      this.deleteTicket(row, col);
    }
  }

  addTicket(row: number, col: number) {
    this.chart[row][col] = 2;
    this.selectedTickets.push([row, col]);
    this.amount += this.price;
  }

  deleteTicket(row: number, col: number) {
    if (this.chart[row][col] === 2) {
      this.chart[row][col] = 0;
      for (let t in this.selectedTickets) {
        if (this.selectedTickets[t][0] === row && this.selectedTickets[t][1] === col) {
          this.selectedTickets.splice(Number(t), 1);
          break;
        }
      }
      this.amount -= this.price;
    }
  }

  confirmSeat() {
    this.next() 
  }

}
