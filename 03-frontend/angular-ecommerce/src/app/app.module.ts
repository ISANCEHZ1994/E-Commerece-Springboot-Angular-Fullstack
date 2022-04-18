import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule }     from '@angular/common/http';
import { BrowserModule }        from '@angular/platform-browser';
import { NgbModule }            from '@ng-bootstrap/ng-bootstrap';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { ReactiveFormsModule }     from '@angular/forms';

import { AppComponent }         from './app.component';
import { ProductService }       from './services/product.service';
import { SearchComponent }      from './components/search/search.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent }     from './components/cart-status/cart-status.component';
import { CartDetailsComponent }    from './components/cart-details/cart-details.component';
import { CheckoutComponent }       from './components/checkout/checkout.component';
import { LoginComponent }          from './components/login/login.component';
import { LoginStatusComponent }    from './components/login-status/login-status.component';

// import { Luv2ShopValidatorsComponent } from './validators/luv2-shop-validators/luv2-shop-validators.component';

const routes: Routes = [
    { path: 'checkout',           component: CheckoutComponent },
    { path: 'cart-details',       component: CartDetailsComponent },
    { path: 'products/:id',       component: ProductDetailsComponent },
    { path: 'search/:keyword',    component: ProductListComponent },
    { path: 'category/:id/:name', component: ProductListComponent },
    { path: 'category',           component: ProductListComponent },
    { path: 'products',           component: ProductListComponent },
    { path: '',                   redirectTo: '/products', pathMatch: 'full' },
    { path: '**',                 redirectTo: '/products', pathMatch: 'full' }
    // ** <== means generic wildcard
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    
    // ProductListTableComponent
  ],
  imports: [
    RouterModule.forRoot( routes ),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [
    ProductService,
    // { 
    //   provide: OKTA_CONFIG
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {  };
