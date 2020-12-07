import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DayPipe} from './pipe/day.pipe';
import {JoinPipe} from './pipe/join.pipe';
import {MinutePipe} from './pipe/minute.pipe';
import {SafePipe} from './pipe/safe.pipe';
import {FrontpageComponent} from './component/frontpage/frontpage.component';
import {MovieSearchComponent} from './component/movie-search/movie-search.component';
import {MovieSearchService} from './service/movie-search/movie-search.service';
import {MovieSliderComponent} from './component/movie-slider/movie-slider.component';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown'
import { MovieGridComponent } from './component/movie-grid/movie-grid.component';
import { UserAvatorComponent } from './component/user-avator/user-avator.component';
import { MoviesComponent } from './component/movies/movies.component';
import { MovieListComponent } from './component/movie-list/movie-list.component';
import { ShowtimesComponent } from './component/showtimes/showtimes.component';
import { MovieDetailComponent } from './component/movie-detail/movie-detail.component';
import { MoviesGridComponent } from './component/movies-grid/movies-grid.component';
import { TicketBuyComponent } from './component/ticket-buy/ticket-buy.component';
import { SeatChartComponent } from './component/seat-chart/seat-chart.component';
import { TicketChartComponent } from './component/ticket-chart/ticket-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    DayPipe,
    JoinPipe,
    MinutePipe,
    SafePipe,
    FrontpageComponent,
    MovieSearchComponent,
    MovieSliderComponent,
    MovieGridComponent,
    UserAvatorComponent,
    MoviesComponent,
    MovieListComponent,
    ShowtimesComponent,
    MovieDetailComponent,
    MoviesGridComponent,
    TicketBuyComponent,
    SeatChartComponent,
    SeatChartComponent,
    TicketChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [MovieSearchService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
