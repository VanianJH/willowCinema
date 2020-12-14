import {Component, OnInit, Input, SimpleChange, SimpleChanges, OnChanges} from '@angular/core';
import {Movie} from '../../interface/movie';
import {MovieSearchService} from '../../service/movie-search/movie-search.service';
import {ShowtimeDate} from '../../interface/showtime-date';
import { MoviesService } from 'src/app/service/movies/movies.service';
import { kStringMaxLength } from 'buffer';

@Component({
  selector: 'app-showtimes',
  templateUrl: './showtimes.component.html',
  styleUrls: ['./showtimes.component.css']
})
export class ShowtimesComponent implements OnInit {
  @Input() movie: Movie;
  @Input() showAllTimes: boolean;
  @Input() filterDate: string;

  showtimes: ShowtimeDate[];

  constructor(private db: MovieSearchService,
    private ms: MoviesService) {
  }

  ngOnInit() {
    // this.getShowtimes();
    this.getMyShowTimes()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showAllTimes']) {
      this.getShowtimes();
    }
  }

  getShowtimes(): void {
    this.db.getMovieShowtimes(this.movie, this.filterDate, this.showAllTimes).subscribe(showtimes => this.showtimes = showtimes);
    // todo
    
  }

  getMyShowTimes(): void {
    this.ms.getMovieShowTimes(String(this.movie.id)).subscribe(res=>{
      this.showtimes = this.showtimesFilter(res['content'])
    });
  }

  getBuyUrl(movieId, BuyId) {
    return "movie/"+String(movieId)+"/buy/"+ String(BuyId)
  }

  showtimesFilter(con: any[]) {
    con = con.filter(m=>{return m['scheduleItemList'].length>0})
    con = con.map(m=> {
      return {
        date: this.getDate(m[ "date"]), // 11/21/2019 "2020-12-11T00:00:00.000+0800"
        times: m['scheduleItemList'].map(m1=> {
          return {
            type: '3D',
            time: this.getDayTime(m1["startTime"]), //'2:00 PM' "2020-12-11T00:00:00.000+0800"
            id: m1["id"],
            hallId: m1["hallId"],
            hallName: m1["hallName"],
            movieId: m1["movieId"],
            movieName: m1["movieName"],
            startTime: m1["startTime"],
            endTime: m1["endTime"],
            fare: m1["fare"]
          }
        })
      }
    })
    return con
  }


  getDate(date: string): string {
    let year: string = date.slice(0, 4)
    let month: string = date.slice(5, 7)
    let day: string = date.slice(8, 10)
    return month + '/' + day + '/' + year
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

}
