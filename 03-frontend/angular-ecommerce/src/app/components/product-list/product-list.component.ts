import { Component, OnInit }  from '@angular/core';
import { ProductService }     from 'src/app/services/product.service';
import { Product }            from 'src/app/common/product';
import { ActivatedRoute }     from '@angular/router';

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
  products:             Product[];
  currentCategoryId:    number;
  previousCategoryId:   number;
  currentCategoryName:  string;
  searchMode:           boolean;

  // new properties for pagination
  thePageNumber:    number = 1;
  thePageSize:      number = 10;
  theTotalElements: number = 0;  
  
  // Inject the ActivatedRoute
  constructor(
     private productService: ProductService,
     private route: ActivatedRoute 
  ) {  };
  // The Current active route that loaded the component 
  // Useful for accessing route parameters

  ngOnInit() {
      this.route.paramMap.subscribe( () => {  
          this.listProducts();
      });
  };

  listProducts(){
      // note: 'keyword' parameter same as the route/Routes in App.module.ts => /:keyword
      // 'keyword' passed in from SearchComponent
      this.searchMode = this.route.snapshot.paramMap.has('keyword');
      if( this.searchMode ){
        this.handleSearchProducts();
      }else{
        this.handleListProducts();
      }; 

  };

  handleListProducts(){
     // check if "id" parameter is availiable
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    // route => use the activated route
    // snapshot => state of route at this given moment in time
    // paramMap => map of all the route parameters
    // has => returns true or false
    // 'id' => read the id parameter
    if( hasCategoryId ){
      // get the "id" param string. convert string to a number using the "+" symbol 
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
       // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    }else{
      // no category id available...default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }; 

    // check if we have a different category than previous
    // NOTE: Angular will reuse a component if it is currently being viewed
    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if( this.previousCategoryId != this.currentCategoryId ){
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${ this.currentCategoryId }, thePageNumber=${ this.thePageNumber }`)

    this.productService
      // now get the products for the given category id
      .getProductList( this.currentCategoryId )
      .subscribe( data => {
          this.products = data;
      })
  };

  handleSearchProducts(){
      const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

      // now search for the products using keyword
      this.productService.searchProducts(theKeyword).subscribe(
        data => {
          this.products = data;
        }
      );
  };

};
