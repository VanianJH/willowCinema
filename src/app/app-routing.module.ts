import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontpageComponent } from './component/frontpage/frontpage.component';

const routes: Routes = [
  { path: '', redirectTo: '/frontpage', pathMatch: 'full' },
  { path: 'frontpage', component: FrontpageComponent },
  // { path: 'movies', component: MoviesComponent },
  // { path: 'movie/:id', component: MovieDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
