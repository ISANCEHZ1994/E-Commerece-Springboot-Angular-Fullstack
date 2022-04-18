import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';

// import myAppConfig from '../../config/my-app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignIn: any;

  constructor( private oktaAuthServ: OktaAuthStateService ) { 
      this.oktaSignIn = new OktaSignIn({
        logo: 'assets/images/logo.png',
        // baseUrl: ,
      })
   };

  ngOnInit(): void {

  };


  
};
