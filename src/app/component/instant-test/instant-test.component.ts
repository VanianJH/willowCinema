import {Component, Input, OnInit} from '@angular/core';
import { MoviesService } from 'src/app/service/movies/movies.service';
import {Movie} from '../../interface/movie';
import {MovieSearchService} from '../../service/movie-search/movie-search.service';

@Component({
  selector: 'app-instant-test',
  templateUrl: './instant-test.component.html',
  styleUrls: ['./instant-test.component.css'],
})
export class InstantTestComponent implements OnInit {
  @Input() limit: number= 1;

  movies: Movie[];

  constructor(private ms: MovieSearchService, 
    private movieService: MoviesService) {
  }

  ngOnInit(): void {
    this.getMovies();
    console.log(this.movies);
  }

  moviesFilter(ms) {
    return ms.map(m=>this.oneMovieFilter(m))
  }

  oneMovieFilter(m) {
    const prefix = "https://images.weserv.nl/?url=";
    return {
      id: m['id'],
      title: m["name"],
      poster: prefix + m["posterUrl"],
      backdrop: prefix+  m["bigPosterUrl"],
      trailer: '',
      overview: m["description"],
      director: m["director"],
      cast: m["starring"],
      type: m["type"],
      release_date: m["startDate"],
      start_date: m["startDate"],
      end_date: m["endDate"],
      runtime: m["length"],
      is_like: m["islike"],
      like_count: m["likeCount"],
      mpaa: "PG"
    };
  }

  getMovies(): void {
    this.movieService.getFrontPageMovies(1).subscribe(res=>{
      this.movies = this.moviesFilter(res['content'].slice(0, 1));
    })
    // this.ms.getTopMovies(this.limit).subscribe(movies => this.movies = movies);
  }
}

