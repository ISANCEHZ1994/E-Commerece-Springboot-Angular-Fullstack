import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule }     from '@angular/common/http';
import { BrowserModule }        from '@angular/platform-browser';
import { NgbModule }            from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }         from './app.component';
import { ProductService }       from './services/product.service';
import { SearchComponent }      from './components/search/search.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    // ProductListTableComponent
  ],
  imports: [
    RouterModule.forRoot( routes ),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {  };
