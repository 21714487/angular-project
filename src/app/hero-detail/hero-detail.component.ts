import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.scss' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  save(): void {
     this.heroService.updateHero(this.hero)
       .subscribe(() => this.goBack());
   }
  goBack(): void {
    this.location.back();
  }


}

/*
Show the HeroDetailComponent
The HeroesComponent is still a master/detail view.

It used to display the hero details on its own, before you cut that portion of the template. Now it will delegate to the HeroDetailComponent.

The two components will have a parent/child relationship.
The parent HeroesComponent will control the child HeroDetailComponent by sending it a new hero to display whenever the user selects a hero from the list.

You won't change the HeroesComponent class but you will change its template.

Update the HeroesComponent template
The HeroDetailComponent selector is 'app-hero-detail'.
Add an <app-hero-detail> element near the bottom of the HeroesComponent template, where the hero detail view used to be.

Bind the HeroesComponent.selectedHero to the element's hero property like this.

heroes.component.html (HeroDetail binding)
  <app-hero-detail [hero]="selectedHero"></app-hero-detail>
[hero]="selectedHero" is an Angular property binding.

It's a one way data binding
- from the selectedHero property of the HeroesComponent
- to the hero property of the target element,
which maps to the hero property of the HeroDetailComponent.

Now when the user clicks a hero in the list, the selectedHero changes.
When the selectedHero changes, the property binding updates hero and the HeroDetailComponent displays the new hero.

*/
