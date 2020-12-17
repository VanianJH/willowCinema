import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FrontpageComponent} from './component/frontpage/frontpage.component';
import {MoviesComponent} from './component/movies/movies.component';
import {MovieDetailComponent} from './component/movie-detail/movie-detail.component';
import {TicketBuyComponent} from './component/ticket-buy/ticket-buy.component';
import {SeatChartComponent} from './component/seat-chart/seat-chart.component';
import {TicketChartComponent} from './component/ticket-chart/ticket-chart.component';
import {LoginComponent} from './component/login/login.component';
import { InstantTestComponent } from './component/instant-test/instant-test.component';
import { ConfirmSeatComponent } from './component/confirm-seat/confirm-seat.component';
import { UserCenterComponent } from './component/user-center/user-center.component';
import { ProfileComponent } from './component/profile/profile.component';
import {PayResultComponent} from './component/pay-result/pay-result.component';
import {RegisterComponent} from './component/register/register.component';
import { CouponSelectComponent } from './component/coupon-select/coupon-select.component';
import { UserCardsComponent } from './component/user-cards/user-cards.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'frontpage', component: FrontpageComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movie/:id', component: MovieDetailComponent},
  {path: 'movie/:id/buy/:sid', component: TicketBuyComponent},
  {path: 'test', component: InstantTestComponent},
  {path: 'user', component: UserCenterComponent},
  {path: 'user/orders', component: UserCenterComponent},
  {path: 'user/profile', component: ProfileComponent},
  {path:'user/cards', component:UserCardsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
