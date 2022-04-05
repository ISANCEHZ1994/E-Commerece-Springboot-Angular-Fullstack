import { Component, OnInit }  from '@angular/core';
import { ProductService }     from 'src/app/services/product.service';
import { Product }            from 'src/app/common/product';
import { ActivatedRoute }     from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

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
  thePageSize:      number = 5;
  theTotalElements: number = 0;
  
  previousKeyword: string = null;
  
  // Inject the ActivatedRoute
  constructor(
     private productService: ProductService,
     private cartService:    CartService,
     private route:          ActivatedRoute 
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
      .getProductListPaginate( 
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId
      ).subscribe( this.processResult() );
      
  };

  processResult(){
      return data => {
          this.products      = data._embedded.products;
          this.thePageNumber = data.page.number + 1;
          this.thePageSize   = data.page.size;
          this.theTotalElements = data.page.totalElements;
      }
  };

  handleSearchProducts(){
      const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

      // if we have a different keyword than previous
      // then set thePageNumber to 1
      if( this.previousKeyword != theKeyword ){
        this.thePageNumber = 1;
      }

      this.previousKeyword = theKeyword;

      console.log(`keyword=${ theKeyword }, thePageNumber=${ this.thePageNumber }`);

      // now search for the products using keyword
      this.productService.searchProductsPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        theKeyword
        ).subscribe( this.processResult() );
  };

  updatePageSize(pageSize: number){
      this.thePageSize = pageSize;
      this.thePageNumber = 1;
      this.listProducts();
  };

  addToCart(theProduct: Product){
    console.log(`Adding to cart: ${ theProduct.name }, ${ theProduct.unitPrice }`);

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  };


};
