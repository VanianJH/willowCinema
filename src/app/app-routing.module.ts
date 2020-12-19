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
import { VipCardComponent } from './component/vip-card/vip-card.component';
import { TermsServiceComponent } from './component/terms-service/terms-service.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'frontpage', component: FrontpageComponent, data: {which: 0}},
  {path: 'movies', component: MoviesComponent, data: {which: 1}},
  {path: 'movie/:id', component: MovieDetailComponent, data: {which: 2}},
  {path: 'movie/:id/buy/:sid', component: TicketBuyComponent, data: {which: 2}},
  {path: 'test', component: VipCardComponent, data: {which: 2}},
  {path: 'instant', component: InstantTestComponent, data: {which: 2}},
  {path: 'user', component: UserCenterComponent, data: {which: 2}},
  {path: 'user/orders', component: UserCenterComponent, data: {which: 2}},
  {path: 'user/profile', component: ProfileComponent, data: {which: 2}},
  {path: 'user/cards', component: UserCardsComponent, data: {which: 2}},
  {path: 'login', component: LoginComponent, data: {which: 2}},
  {path: 'register', component: RegisterComponent, data: {which: 2}},
  {path: 'termsofservice', component: TermsServiceComponent, data: {which: 2}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
