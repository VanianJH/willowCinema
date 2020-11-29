import { Movie } from './../../interface/movie';
import {MovieSearchService} from '../../service/movie-search/movie-search.service';
import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.css']
})
export class MoviesGridComponent implements OnInit {
  @Input() limit: number;
  @Input() columns: number;
  @Input() exclude?: number | number[];
  movies: Movie[];
  modalRef: BsModalRef;
  previewUrl = '';

  constructor(private db: MovieSearchService, private modalService: BsModalService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getMovies();
    console.log(this.movies);
  }

  getMovies() {
    this.db.getTopMovies(this.limit).subscribe(movies => this.movies = movies);
  }

  openModal(template: TemplateRef<any>, previewUrl: string) {
    this.previewUrl = previewUrl;
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-lg');
  }

  getPreviewUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.previewUrl);
  }

  getEmbedUrl(url: string) {
    return url.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
  }
}
