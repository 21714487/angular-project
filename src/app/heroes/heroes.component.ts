import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  //selectedHero: Hero;
  heroes: Hero[];
  constructor(private heroService: HeroService) {
    /*
        The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.
        When Angular creates a HeroesComponent, the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService.
    */
  }

  ngOnInit() {
  console.log("ngOnInit");
    this.getHeroes();
      /*
      While you could call getHeroes() in the constructor, that's not the best practice.
      Reserve the constructor for simple initialization such as wiring constructor parameters to properties.
      The constructor shouldn't do anything. It certainly shouldn't call a function that makes HTTP requests to a remote server as a real data service would.
      Instead, call getHeroes() inside the ngOnInit lifecycle hook and let Angular call ngOnInit at an appropriate time after constructing a HeroesComponent instance.
      */
  }

  /*onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }*/

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);

  /*
  Subscribe in HeroesComponent
      The HeroService.getHeroes method used to return a Hero[]. Now it returns an Observable<Hero[]>.
      Observable.subscribe() is the critical difference.
      The previous version assigns an array of heroes to the component's heroes property.
      The assignment occurs synchronously, as if the server could return heroes instantly or the browser could freeze the UI while it waited for the server's response.
      That won't work when the HeroService is actually making requests of a remote server.
      The new version waits for the Observable to emit the array of heroes— which could happen now or several minutes from now.
      Then subscribe passes the emitted array to the callback, which sets the component's heroes property.
      This asynchronous approach will work when the HeroService requests heroes from the server.
  */
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}


