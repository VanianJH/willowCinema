import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Movie } from "../../interface/movie";
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MovieSearchService } from "../../service/movie-search/movie-search.service";
@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  movies$: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  constructor(private db: MovieSearchService) { }

  ngOnInit() {
    this.movies$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.db.searchMovies(term))
    );
  }


  search(term: string): void {
    this.searchTerms.next(term);
  }

}
