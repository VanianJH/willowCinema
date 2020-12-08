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

const routes: Routes = [
  {path: '', redirectTo: '/frontpage', pathMatch: 'full'},
  {path: 'frontpage', component: FrontpageComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movie/:id', component: MovieDetailComponent},
  {path: 'movie/:id/buy', component: TicketBuyComponent},
  {path: 'test', component: ConfirmSeatComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: UserCenterComponent},
  {path: 'user/orders', component: UserCenterComponent},
  {path: 'user/profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
