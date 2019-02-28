import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
/*
Provide the HeroService
You must make the HeroService available to the dependency injection system before Angular can inject it into the HeroesComponent, as you will do below.
You do this by registering a provider.
A provider is something that can create or deliver a service; in this case, it instantiates the HeroService class to provide the service.

Now, you need to make sure that the HeroService is registered as the provider of this service.
You are registering it with an injector, which is the object that is responsible for choosing and injecting the provider where it is required.

By default, the Angular CLI command ng generate service registers a provider with the root injector for your service by including provider metadata in the @Injectable decorator.

If you look at the @Injectable() statement right before the HeroService class definition, you can see that the providedIn metadata value is 'root':
*/
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable({
  providedIn: 'root'
})
/*
When you provide the service at the root level, Angular creates a single, shared instance of HeroService and injects into any class that asks for it.
Registering the provider in the @Injectable metadata also allows Angular to optimize an app by removing the service if it turns out not to be used after all.

To learn more about providers, see the Providers section.
To learn more about injectors, see the Dependency Injection guide.

The HeroService is now ready to plug into the HeroesComponent.
*/

export class HeroService {
  private heroesUrl = 'api/heroes';//URL to the web api
  constructor(private http:HttpClient,private messageService: MessageService) {// Angular will inject the singleton MessageService into that property when it creates the HeroService.
   /*
   This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService which is injected into the HeroesComponent
   */
   }
   /*
     When you're up to here on: https://angular.io/tutorial/toh-pt6#get-heroes-with-httpclient
     Refresh the browser. The hero data should successfully load from the mock server.
     You've swapped of for http.get and the app keeps working without any other changes because both functions return an Observable<Hero[]>.
     Http methods return one value.
     All HttpClient methods return an RxJS Observable of something.
     HTTP is a request/response protocol. You make a request, it returns a single response.
     In general, an observable can return multiple values over time. An observable from HttpClient always emits a single value and then completes, never to emit again.
     This particular HttpClient.get call returns an Observable<Hero[]>, literally "an observable of hero arrays". In practice, it will only return a single hero array.
     HttpClient.get returns response data.
     HttpClient.get returns the body of the response as an untyped JSON object by default. Applying the optional type specifier, <Hero[]> , gives you a typed result object.
     The shape of the JSON data is determined by the server's data API. The Tour of Heroes data API returns the hero data as an array.
     Other APIs may bury the data that you want within an object. You might have to dig that data out by processing the Observable result with the RxJS map operator.
     Although not discussed here, there's an example of map in the getHeroNo404() method included in the sample source code.
     */
  /** GET heroes from the server */
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
    /*
    Things go wrong, especially when you're getting data from a remote server. The HeroService.getHeroes() method should catch errors and do something appropriate.
    To catch errors, you "pipe" the observable result from http.get() through an RxJS catchError() operator.
    */
  }
  /*GET heroes whose name contains the search term */
  searchHeroes(term:string): Observable<Hero[]>{
  if(!term.trim()){//if not search term, return an empty array
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
  tap(_=>this.log(`found heroes matching "${term}"`)),
  catchError(this.handleError<Hero[]>('searchHeroes',[]))
  );
  }
  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`HeroService: ${message}`);
    }
}
/*
@Injectable() services
Notice that the new service imports the Angular Injectable symbol and annotates the class with the @Injectable() decorator.
This marks the class as one that participates in the dependency injection system.
The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies. It doesn't have any dependencies yet, but it will soon.

The @Injectable() decorator accepts a metadata object for the service, the same way the @Component() decorator did for your component classes.

Get hero data
The HeroService could get hero data from anywhere—a web service, local storage, or a mock data source.

Removing data access from components means you can change your mind about the implementation anytime, without touching any components.
They don't know how the service works.
*/
