import { BrowserModule } from '@angular/platform-browser';
/*
Angular needs to know how the pieces of your application fit together and what other files and libraries the app requires.
This information is called metadata
Some of the metadata is in the @Component decorators that you added to your component classes.
Other critical metadata is in @NgModule decorators.
The most important @NgModule decorator annotates the top-level AppModule class.
The Angular CLI generated an AppModule class in src/app/app.module.ts when it created the project.
This is where you opt-in to the FormsModule.
*/
import {FormsModule} from '@angular/forms';/* <-- NgModel lives here
[(ngModel)] is Angular's two-way data binding syntax.

Here it binds the hero.name property to the HTML textbox so that data can flow in both directions:
 - from the hero.name property to the textbox
 - from the textbox back to the hero.name.
 */
import {NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

                        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
                        // and returns simulated server responses.
                        // Remove it when a real server is ready to receive requests.
                        HttpClientInMemoryWebApiModule.forRoot(
                          InMemoryDataService, { dataEncapsulation: false }
                        )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
