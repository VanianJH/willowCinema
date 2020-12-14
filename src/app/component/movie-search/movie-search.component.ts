import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Movie } from "../../interface/movie";
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {MovieSearchService} from '../../service/movie-search/movie-search.service';
import {Router} from '@angular/router';
import { MoviesService } from 'src/app/service/movies/movies.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  movies$: Observable<Movie[]>;
  SearchRes: Observable<any>;
  private searchTerms = new Subject<string>();

  constructor(private db: MovieSearchService,
              private router: Router,
              private ms: MoviesService) { }

  ngOnInit() {

  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  searchJump(term: string) {
      this.ms.searchMovie(term)  
    this.router.navigateByUrl("movies");
  }
}

// todo :fff2 123456 
// 1 use coupon buy
// 2 tickets
// 3 bank card and coupons
// 4 user msg