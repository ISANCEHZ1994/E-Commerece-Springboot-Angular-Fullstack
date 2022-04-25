import { NgModule }             from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { HttpClientModule }     from '@angular/common/http';
import { BrowserModule }        from '@angular/platform-browser';
import { NgbModule }            from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule }  from '@angular/forms';
import { AppComponent }         from './app.component';
import { ProductService }       from './services/product.service';
import { SearchComponent }      from './components/search/search.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent }     from './components/cart-status/cart-status.component';
import { CartDetailsComponent }    from './components/cart-details/cart-details.component';
import { CheckoutComponent }       from './components/checkout/checkout.component';
import { LoginComponent }          from './components/login/login.component';
import { LoginStatusComponent }    from './components/login-status/login-status.component';
import { MembersPageComponent }    from './components/members-page/members-page.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';

import { 
  OktaAuthModule, 
  OKTA_CONFIG, 
  OktaCallbackComponent, 
  OktaAuthGuard
} from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig  from './config/my-app-config';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

const oktaConfig = Object.assign({

    onAuthRequired: ( oktaAuth, injector ) => {
      const router = injector.get(Router);
      // Redirect the user to your custom login page
      router.navigate(['/login']);
    }

}, myAppConfig.oidc );

const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes = [
    // https://manage.auth0.com/dashboard/us/dev-neex6mmz/applications/NxDLKox3ItnE6JEFpuOcnVDY6a3pJYu0/settings
    // https://dev-31079651-admin.okta.com/admin/app/oidc_client/client/0oa4qxxxsdmp89wKH5d7#tab-general
    { path: 'login/callback', component: OktaCallbackComponent },
    { path: 'login',          component: LoginComponent },

    // <canActivate> Route Guard: if authenticated give access to route else, send to login page
    { path: 'members',        component: MembersPageComponent, canActivate: [ OktaAuthGuard ]},    
    { path: 'order-history',  component: OrderHistoryComponent, canActivate: [ OktaAuthGuard ]},
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
    MembersPageComponent,
    OrderHistoryComponent,
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
    { 
      provide: OKTA_CONFIG, 
      useValue: { oktaAuth } 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {  };
