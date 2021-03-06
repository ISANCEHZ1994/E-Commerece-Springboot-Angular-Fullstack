import { Component, OnInit, Inject } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import * as OktaSignIn from '@okta/okta-signin-widget';

import myAppConfig from '../../config/my-app-config';

// https://dev-31079651-admin.okta.com/admin/app/oidc_client/client/0oa4qxxxsdmp89wKH5d7#tab-general
// an account must be created with: http://developer.okta.com/login/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignIn: any;

  constructor( 
    private oktaAuthServ: OktaAuthStateService, 
    @Inject( OKTA_AUTH ) private oktaAuth: OktaAuth 
  ) { 
      this.oktaSignIn = new OktaSignIn({        
        logo:        'assets/images/logo.png',
        features:     { 
          registration: true 
        },
        baseUrl:      myAppConfig.oidc.issuer.split('/oauth2')[0],
        clientId:     myAppConfig.oidc.clientId,
        redirectUri:  myAppConfig.oidc.redirectUri,
        authParams:  {
          pkce:   true,
          issuer: myAppConfig.oidc.issuer,
          scopes: myAppConfig.oidc.scopes
        }
      }); 
   };

  ngOnInit(): void {
    this.oktaSignIn.remove();

    this.oktaSignIn.renderEl(
      { el: '#okta-sign-in-widget' }, // this string should be same as id in div in login.html
      ( response ) => {
        if ( response.status  === 'SUCCESS' ) {
          this.oktaAuth.signInWithRedirect();
        }
      },
      ( error ) => {
        throw error;
      }
    );

  };



};
