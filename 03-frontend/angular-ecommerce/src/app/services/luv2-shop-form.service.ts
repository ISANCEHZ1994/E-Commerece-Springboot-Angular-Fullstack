import { Observable, of } from 'rxjs';
import { Injectable }     from '@angular/core';
import { HttpClient }     from '@angular/common/http';
import { Country }        from '../common/country';
import { State }          from '../common/state';
import { GetResponseCountries } from '../interfaces/get-response-countries'; 
import { GetResponseStates }    from '../interfaces/get-response-states'; 
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {  

  private countriesURL = 'http://localhost:8080/api/countries';
  private statesURL = "http://localhost:8080/api/states";

  constructor( private httpClient: HttpClient ) { };

  getCreditCardMonths(startMonth: number): Observable<number[]>{
    let data: number[] = [];

    // build an array for "Month" dropdown list
    // - start at desired startMonth and loop until 12
    
    for( let theMonth = startMonth; theMonth <= 12; theMonth++ ){
      data.push(theMonth);
    };

    return of(data);

  };

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    // build an array for "Year" dropdown list
    // - start at current year and loop for next 10

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for( let theYear = startYear; theYear <= endYear; theYear++ ){
      data.push( theYear );
    };

    return of( data );

  };

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesURL).pipe(
      map(response => response._embedded.countries)
    );
  };

  getStates( theCountryCode: string ): Observable<State[]>{
    const searchStatesURL = `${this.statesURL}/search/findByCountryCode?code=${ theCountryCode }`;

    return this.httpClient.get<GetResponseStates>(searchStatesURL).pipe(
      map(response => response._embedded.states)
    );
  };


};
