import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { GetResponse } from '../interfaces/get-response';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // by default Angular only recieves the first 20 items so we must specify it..
  // private baseUrl = "http://localhost:8080/api/products?size=100";
  private baseUrl = "http://localhost:8080/api/products";

  constructor( private httpClient: HttpClient ) { };

  // fetching data from MySQL database
  getProductList(): Observable<Product[]>{
      return this.httpClient
          .get<GetResponse>(this.baseUrl)
          .pipe(
            map( response => response._embedded.products )
          );
  };

};

