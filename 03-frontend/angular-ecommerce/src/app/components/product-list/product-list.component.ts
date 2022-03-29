import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // remember the variable below can be used in any html file!
  // NOTE: the chages to the templateUrl ABOVE
  // placing the fetched data from the Service into the below variable: products - using Model 
  products: Product[];
  currentCategoryId: number;

  // Inject the ActivatedRoute
  constructor(
     private productService: ProductService,
     private route: ActivatedRoute 
  ) {};
  // The Current active route that loaded the component 
  // Useful for accessing route parameters

  ngOnInit() {
    this.route.paramMap.subscribe( () => {  
    this.listProducts();
    });
  };

  listProducts(){

    // check if "id" parameter is availiable
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    // route => use the activated route
    // snapshot => state of route at this given moment in time
    // paramMap => map of all the route parameters
    // has => returns true or false
    // 'id' => read the id parameter

    if( hasCategoryId ){
      // get the "id" param string. convert string to a number using the "+"
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      // using the "+" symbol to convert to number
    }else{
      this.currentCategoryId = 1;
    }

    // now get the products for the given category id
    this.productService
      .getProductList()
      .subscribe( data => {
          this.products = data;
      })
  };

};
