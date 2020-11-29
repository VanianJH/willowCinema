import {Component, OnInit, Input, SimpleChange, SimpleChanges, OnChanges} from '@angular/core';
import {Movie} from '../../interface/movie';
import {MovieSearchService} from '../../service/movie-search/movie-search.service';
import {ShowtimeDate} from '../../interface/showtime-date';

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

  constructor(private db: MovieSearchService) {
  }

  ngOnInit() {
    this.getShowtimes();
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

}
