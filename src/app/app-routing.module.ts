import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FrontpageComponent} from './component/frontpage/frontpage.component';
import {MoviesComponent} from './component/movies/movies.component';
import {MovieDetailComponent} from './component/movie-detail/movie-detail.component';
import {TicketBuyComponent} from './component/ticket-buy/ticket-buy.component';
import {SeatChartComponent} from './component/seat-chart/seat-chart.component';
import {TicketChartComponent} from './component/ticket-chart/ticket-chart.component';

const routes: Routes = [
  {path: '', redirectTo: '/frontpage', pathMatch: 'full'},
  {path: 'frontpage', component: FrontpageComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movie/:id', component: MovieDetailComponent},
  {path: 'movie/:id/buy', component: TicketBuyComponent},
  {path: 'test', component: TicketChartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
