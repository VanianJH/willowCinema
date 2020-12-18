import {Component, Input, OnInit} from '@angular/core';
import { MoviesService } from 'src/app/service/movies/movies.service';
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

  imgFilter(url: string) {
    const prefix = "https://images.weserv.nl/?url=";
    const searchUrl  = "images.weserv.nl";
    let res;
    if(url.search(searchUrl)===-1) {
      res = prefix + url
    } else {
      res = url
    }
    console.log(url, res)
  }

  oneMovieFilter(m) {

    return {
      id: m['id'],
      title: m["name"],

            poster: (m["posterUrl"]),
      backdrop:   (m["bigPosterUrl"]),
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
    this.movieService.getFrontPageMovies(10).subscribe(res=>{
      this.movies = this.moviesFilter(res['content'].slice(0, 10));
    })
    // this.ms.getTopMovies(this.limit).subscribe(movies => this.movies = movies);
  }
}
