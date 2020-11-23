import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../interface/movie';
import {MovieSearchService} from '../../service/movie-search/movie-search.service';

@Component({
  selector: 'app-movie-slider',
  templateUrl: './movie-slider.component.html',
  styleUrls: ['./movie-slider.component.css']
})
export class MovieSliderComponent implements OnInit {
  @Input() limit: number;

  movies: Movie[];

  constructor(private ms: MovieSearchService) {
  }

  ngOnInit(): void {
    this.getMovies();
    console.log(this.movies);
  }

  getMovies(): void {
    this.ms.getTopMovies(this.limit).subscribe(movies => this.movies = movies);
  }
}
