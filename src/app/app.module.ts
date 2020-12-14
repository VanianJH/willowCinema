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
import { LoginComponent } from './component/login/login.component';
import { InstantTestComponent } from './component/instant-test/instant-test.component';
import { CookieService } from "ngx-cookie-service";
import { ConfirmSeatComponent } from './component/confirm-seat/confirm-seat.component';
import { UserCenterComponent } from './component/user-center/user-center.component';
import { ProfileComponent } from './component/profile/profile.component';
import { PayResultComponent } from './component/pay-result/pay-result.component';
import { RegisterComponent } from './component/register/register.component';
import {HttpClientModule} from '@angular/common/http';

import {CarouselModule} from 'ngx-bootstrap/carousel';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {AlertModule} from 'ngx-bootstrap/alert';
import { CouponSelectComponent } from './component/coupon-select/coupon-select.component';
import { UserCardsComponent } from './component/user-cards/user-cards.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    TicketChartComponent,
    LoginComponent,
    InstantTestComponent,
    ConfirmSeatComponent,
    UserCenterComponent,
    ProfileComponent,
    PayResultComponent,
    RegisterComponent,
    CouponSelectComponent,
    UserCardsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
  ],
  providers: [MovieSearchService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
