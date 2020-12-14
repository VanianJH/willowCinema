import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';
import { Movie } from 'src/app/interface/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  options = { headers: this.headers };
  getFrontPageMovies(num: number) {
    return this.http.get(
      'http://localhost:8080/movie/like/list?num=' + num,
    )
  }

  movieListComponent: any;
  setMovieListComponent(l){
    this.movieListComponent = l
  }
  getMovieListComponent(l) {
    return this.movieListComponent
  }

  getMovieDetail(movieId: string, userId: string) {
    return this.http.get(
      'http://localhost:8080/movie/' + movieId + '/' + userId
    )
  }

  likeMovie(movieId: string, userId: string) {
    return this.http.post(
      'http://localhost:8080/movie/' + movieId + '/like?userId=' + userId,
      {},
      this.options
    )
  }

  unlikeMovie(movieId: string, userId: string) {
    return this.http.post(
      'http://localhost:8080/movie/' + movieId + '/unlike?userId=' + userId,
      {},
      this.options
    )
  }

  getMovieShowTimes(movieId: string) {
    return this.http.get(
        'http://localhost:8080/schedule/search/audience?movieId='+ movieId
    )
  }
  
  moviesFilter(ms) {
    return ms.map(m => this.oneMovieFilter(m))
  }

  oneMovieFilter(m) {
    const prefix = "https://images.weserv.nl/?url=";
    return {
      id: m['id'],
      title: m["name"],
      poster: prefix + m["posterUrl"],
      backdrop: prefix + m["bigPosterUrl"],
      trailer: '',
      overview: m["description"],
      director: m["director"],
      cast: String(m['starring']).split(' \/ '),
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

  searchedMovies: any=undefined;
  nowTerm: string = ""
  nowA: string = ""
  nowB: string = ""

  getSearchMovies(){
    if(this.searchedMovies!==undefined) {
      return of(this.searchedMovies)
    } else {
      return this.getFrontPageMovies(10)
    }
  }
  
  searchMovie(term: string) {
    this.nowTerm = term;
    this.http.get(
      "http://localhost:8080/movie/search?keyword="+term+this.nowA+this.nowB
    ).subscribe(res=>{
      if(res['success']) {
        this.searchedMovies =  res
        this.movieListComponent.getMovies()
      } else {

      }
    })
  }

  searchMoviePlugin(a, b :string) {
    this.nowA = a 
    this.nowB = b
    this.http.get(
      "http://localhost:8080/movie/search?keyword="+this.nowTerm+a+b
    ).subscribe(res=>{
      if(res['success']) {
        this.searchedMovies =  res
        this.movieListComponent.getMovies()
      } else {

      }
    })
  }



  constructor(private http: HttpClient) { }
}