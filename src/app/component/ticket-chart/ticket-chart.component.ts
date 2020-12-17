import {Component, Input, OnInit} from '@angular/core';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BuyTicketService } from 'src/app/service/buy-ticket/buy-ticket.service';
import { MoviesService } from 'src/app/service/movies/movies.service';

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
  @Input()
  father: any;

  filmName: string = "只狼"; 
  imgSrc='https://p1.meituan.net/movie/38dd31a0e1b18e1b00aeb2170c5a65b13885486.jpg@115w_158h_1e_1c'
  dayTime=''
  amount: number = 0;
  selectedTickets = [];
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

  constructor(private route: ActivatedRoute,
              private cookie: CookieService,
              private buy: BuyTicketService,
              private ms: MoviesService) {
  }

  ngOnInit(): void {
    const sid = this.route.snapshot.paramMap.get('sid');
    const uid = JSON.parse(this.cookie.get('userMsg'))['id']
    this.buy.getSeatMsg(sid).subscribe(res=> {
      if (res['success']) {
        console.log(res['content'])
        this.chart = res['content']['seats']
        this.price = res['content']["scheduleItem"]['fare']
        this.hall = res['content']['scheduleItem']['hallName']
        this.date = this.getDate(res['content']['scheduleItem']['startTime']) 
        this.dayTime = this.getDayTime(res['content']['scheduleItem']['startTime'])
        this.filmName = res['content']['scheduleItem']['movieName']
        this.ms.getMovieDetail(res['content']['scheduleItem']['movieId'], uid).subscribe(r=>{
          if(r['success']) {
            this.imgSrc =  "https://images.weserv.nl/?url=" + String(r['content']["posterUrl"])
          } else {
            this.imgSrc =  'https://p1.meituan.net/movie/38dd31a0e1b18e1b00aeb2170c5a65b13885486.jpg@115w_158h_1e_1c'
          }
        })
      } else {

      }
    })
  }

  getDayTime(date: string): string {
    let hour = date.slice(11, 13)
    let minute = date.slice(14, 16)

    if(Number(hour)>12) {
      return String(Number(hour)-12) + ":" + minute + 'pm'
    } else {
      return hour + ":" + minute + 'am'
    }
  }

  getDate(date: string): string {
    let year: string = date.slice(0, 4)
    let month: string = date.slice(5, 7)
    let day: string = date.slice(8, 10)
    return month + '/' + day + '/' + year
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

  async confirmSeat() {
    console.log('condirm')
    const sid = this.route.snapshot.paramMap.get('sid');
    const uid = JSON.parse(this.cookie.get('userMsg'))['id']
    let ticketForm = {
      userId: uid,
      scheduleId: sid,
      seats: this.selectedTickets.map(s=>this.seatFilter(s))
    };
    let res = await this.buy.getTicketLock(ticketForm);
    if(res['success']) {
      this.father.updateConfirmMsg({
        filmName: this.filmName, 
        time: this.date + " "+this.dayTime,
        hall: this.hall,
        seat: this.selectedTickets,
        price: this.amount,
        tickets: res['content']['tickets'],
        orderId: res['content']['orderId']
      })
      this.next() 
    } else {
      this.buy.setNowTicketMsg({})
    }
  }

  seatFilter(s) {
    return {
      rowIndex:s[0],
      columnIndex:s[1]
    }
  } 

}
