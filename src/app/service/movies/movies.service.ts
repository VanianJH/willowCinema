import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';
import { Movie } from 'src/app/interface/movie';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };
  getFrontPageMovies(num: number) {
    return this.http.get(
      baseUrl + '/movie/like/list?num=' + num,
    )
  }

  movieListComponent: any;
  setMovieListComponent(l) {
    this.movieListComponent = l
  }
  getMovieListComponent(l) {
    return this.movieListComponent
  }

  getMovieDetail(movieId: string, userId: string) {
    return this.http.get(
      baseUrl + '/movie/' + movieId + '/' + userId
    )
  }

  likeMovie(movieId: string, userId: string) {
    return this.http.post(
      baseUrl + '/movie/' + movieId + '/like?userId=' + userId,
      {},
      this.options
    )
  }

  unlikeMovie(movieId: string, userId: string) {
    return this.http.post(
      baseUrl + '/movie/' + movieId + '/unlike?userId=' + userId,
      {},
      this.options
    )
  }

  getMovieShowTimes(movieId: string) {
    return this.http.get(
      baseUrl + '/schedule/search/audience?movieId=' + movieId
    )
  }

  moviesFilter(ms) {
    return ms.map(m => this.oneMovieFilter(m))
  }
  imgFilter(url: string) {
    const prefix = "https://images.weserv.nl/?url=";
    const searchUrl = "images.weserv.nl";
    let res;
    if (url.search(searchUrl) === -1) {
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
      backdrop: (m["bigPosterUrl"]),
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

  searchedMovies: any = undefined;
  nowTerm: string = ""
  nowA: string = ""
  nowB: string = ""

  getSearchMovies() {
    if (this.searchedMovies !== undefined) {
      return of(this.searchedMovies)
    } else {
      return this.getFrontPageMovies(10)
    }
  }

  searchMovie(a, b, c: string) {
    if(a.length>0) {
      this.nowTerm = a;
    }
    if(b.length>0) {
      this.nowA = b;
    }
    if(c.length>0) {
      this.nowB = c;
    }

    console.log(baseUrl + "/movie/search?keyword=" + this.nowTerm + "&type=" +this.nowA + "&region=" + this.nowB)

    this.http.get(
      baseUrl + "/movie/search?keyword=" + this.nowTerm + "&type=" +this.nowA + "&region=" + this.nowB
    ).subscribe(res => {
      if (res['success']) {
        this.searchedMovies = res
        this.movieListComponent.getMovies()
      } else {

      }
    })
  }

  constructor(private http: HttpClient) { }
}
