import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>{{title}}</h1>
  <h2>My favorite hero is: {{myHero}}</h2>
  <p>Heroes:</p>
  <ul>
    <li *ngFor="let hero of heroes">
      {{ hero }}
    </li>
  </ul>

  `
  /*
  Notice the hero in the ngFor double-quoted instruction; it is an example of a template input variable.
  Read more about template input variables in the microsyntax section of the Template Syntax page.
  Angular duplicates the <li> for each item in the list, setting the hero variable to the item (the hero) in the current iteration.
  Angular uses that variable as the context for the interpolation in the double curly braces.
  In this case, ngFor is displaying an array, but ngFor can repeat items for any iterable object.
  Now the heroes appear in an unordered list.
  */
})
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = ['Windstorm','Bombasto','Magneta','Tornado'];
  myHero = this.heroes[0];
}
