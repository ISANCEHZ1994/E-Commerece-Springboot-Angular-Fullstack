import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetResponseOrderHistory } from '../interfaces/get-response-order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderURL = `http://localhost:8080/api/orders`;

  constructor( private httpClient: HttpClient ) { };

  getOrderHistory( theEmail: string ): Observable<GetResponseOrderHistory>{
      // need to build URL based on the customer email
      const orderHistoryURL =  `${this.orderURL}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`;

      return this.httpClient.get<GetResponseOrderHistory>(orderHistoryURL);
  };

};
