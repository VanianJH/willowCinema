import {Movie} from '../../interface/movie';
import {MovieSearchService} from '../../service/movie-search/movie-search.service';
import {Component, OnInit, Input, TemplateRef} from '@angular/core';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

// TODO: 爬取规整的电影数据 图片
@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent implements OnInit {
  @Input() limit: number;
  @Input() columns: number;
  @Input() exclude?: number | number[];

  movies: Movie[];
  // note: how to use modal
  modalRef: BsModalRef;
  previewUrl = '';

  constructor(private ms: MovieSearchService,
              private modalService: BsModalService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.ms.getTopMovies(10).subscribe(movies => this.movies = movies);
  }

  openModal(template: TemplateRef<any>, previewUrl: string) {
    this.previewUrl = previewUrl;
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-lg');
  }

  getPreviewUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.previewUrl);
  }

  getEmbedUrl(url: string): string {
    return url.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
  }

}
