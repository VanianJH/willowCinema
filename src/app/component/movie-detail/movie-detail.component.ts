import { Movie } from './../../interface/movie';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MovieSearchService } from '../../service/movie-search/movie-search.service';
import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MoviesService } from 'src/app/service/movies/movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  showAllTimes = false;
  modalRef: BsModalRef;
  isLiked: boolean = false;
  likeAmount: number = 0;

  likeMsg = "想看";

  constructor(
    private route: ActivatedRoute,
    private db: MovieSearchService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private cookie: CookieService,
    private movieService: MoviesService) {
  }

  ngOnInit() {
    this.getMovie();
  }

  moviesFilter(ms) {
    return ms.map(m => this.oneMovieFilter(m))
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
    this.isLiked = m['islike'];
    this.likeAmount = m['likeCount'];
    return {
      id: m['id'],
      title: m["name"],
      poster:  (m["posterUrl"]),
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

  getMovie(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const userId = JSON.parse(this.cookie.get('userMsg'))['id']
    this.movieService.getMovieDetail(String(id), String(userId)
    ).subscribe(movie => this.movie = this.oneMovieFilter(movie['content']));
  }

  // show all showtimes
  showAllShowtimes(): void {
    this.showAllTimes = true;
  }

  // hide all showtimes
  hideAllShowtimes(): void {
    this.showAllTimes = false;
  }

  getBackdropUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.backdrop);
  }

  openModal(template: TemplateRef<any>, previewUrl: string) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-lg');
  }

  getPreviewUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.getEmbedUrl(this.movie.trailer));
  }

  getEmbedUrl(url: string) {
    return url.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
  }

  likeMovie() {
    const id = +this.route.snapshot.paramMap.get('id');

    if (this.isLiked) {
      this.likeAmount--;
      this.movieService.unlikeMovie(String(id), String(JSON.parse(this.cookie.get('userMsg'))['id'])).subscribe(
        res=> {
          if(res['success']) {
            console.log('success')
          } else {
            console.log(res['message'])
          }
        }
      )
    } else {
      this.likeAmount++;
      this.movieService.likeMovie(String(id), String(JSON.parse(this.cookie.get('userMsg'))['id'])).subscribe(
        res=> {
          if(res['success']) {
            console.log('success')
          } else {
            console.log(res['message'])
          }
        }
      )
    }
    this.isLiked = !this.isLiked;
  }
}
