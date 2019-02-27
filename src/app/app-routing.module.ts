import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
const routes: Routes = [
  { path: '', redirectTo:'/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent }, //Displays the dashboard.component.html
  { path: 'hero/:id',component:HeroDetailComponent}, //Displays each separate Hero based upon their id within the hero-detail.component.html
  { path: 'heroes', component: HeroesComponent } //Displays the heroes.component.html
];
@NgModule({
  imports: [ RouterModule.forRoot(routes)], //listens for browser location requests
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
//.
