import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product }          from '../common/product';
import { ProductCategory }  from '../common/product-category';
import { GetResponse }      from '../interfaces/get-response';
import { GetResponseProducts } from '../interfaces/get-response-products';
import { GetResponseProductCategory } from '../interfaces/get-response-product-category';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // by default Angular only recieves the first 20 items so we must specify it..
  // private baseUrl = "http://localhost:8080/api/products?size=100";
  private baseURL = "http://localhost:8080/api/products";

  private categoryURL = "http://localhost:8080/api/product-category";

  constructor( private httpClient: HttpClient ) { };

  // fetching data from MySQL database
  getProductList(theCategoryId: number): Observable<Product[]>{

      // @TODO: need to build URL based on category id
      const searchURL = `${ this.baseURL }/search/findByCategoryId?id=${ theCategoryId }`;

      return this.httpClient
        // .get< GetResponse >(searchURL)
        .get< GetResponseProducts >(searchURL)
        .pipe(
          map( response => response._embedded.products )
        );
  };

  getProductCategories(): Observable<ProductCategory[]>{
        return this.httpClient      
        .get< GetResponseProductCategory >(this.categoryURL)
        .pipe(
          map( response => response._embedded.productCategory )
        );
  };

};

