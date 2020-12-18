import {Movie} from '../../interface/movie';
import {MovieSearchService} from '../../service/movie-search/movie-search.service';
import {Component, OnInit, Input, TemplateRef} from '@angular/core';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { MoviesService } from 'src/app/service/movies/movies.service';

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
              private sanitizer: DomSanitizer,
              private movieService: MoviesService) {
  }

  ngOnInit(): void {
    this.getMovies();
  }

  moviesFilter(ms) {
    return ms.map(m=>this.oneMovieFilter(m))
  }

  oneMovieFilter(m) {
    const prefix = "https://images.weserv.nl/?url=";
    return {
      id: m['id'],
      title: m["name"],
      // poster: prefix + m["posterUrl"],
      // backdrop: prefix+  m["bigPosterUrl"],
      poster:  m["posterUrl"],
      backdrop: m["bigPosterUrl"],
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
    this.movieService.getFrontPageMovies(12).subscribe(res => {
      this.movies = this.moviesFilter(res['content'])
    })
    // this.ms.getTopMovies(10).subscribe(movies => this.movies = movies);
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
