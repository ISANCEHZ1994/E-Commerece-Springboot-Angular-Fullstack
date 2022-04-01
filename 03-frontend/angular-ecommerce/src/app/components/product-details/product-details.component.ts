import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  // product: Product; <== would give an error when you get the image..would still work but now no errors
  product: Product = new Product;

  constructor( private productService: ProductService, private route: ActivatedRoute ) { };

  ngOnInit() {
      this.route.paramMap.subscribe(() => {
          this.handleProductDetails();
      })
  };

  handleProductDetails(){
      const theProductId: number = +this.route.snapshot.paramMap.get('id');
      // we are getting an error for our image - although everything works
      // we need to fix it and it is happening because product variable above is technically not assigned yet
      // the variable is not assigned a value UNTIL data arrives via ProductService call 
      this.productService.getProduct(theProductId).subscribe(
        data => {
            this.product = data;
        }
      );
  };

};
