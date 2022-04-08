import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  // since we are using luv2ShopService
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates:  State[] = [];
  billingAddressStates:   State[] = [];

  constructor( 
    private formBuilder:    FormBuilder, 
    private l2FormService:  Luv2ShopFormService
  ) { };

  ngOnInit() {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });
    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);

    this.l2FormService.getCreditCardMonths(startMonth).subscribe(
      data => {
          console.log("Retrieved credit card months: " + JSON.stringify(data));
          this.creditCardMonths = data;
      }
    );

    // populate credit card years 
    this.l2FormService.getCreditCardYears().subscribe(
      data => {
          console.log("Retrieved credit card years: " + JSON.stringify(data));
          this.creditCardYears = data;
      }
    );

    this.l2FormService.getCountries().subscribe(
      data => {
            console.log("Retrieved Countries: " + JSON.stringify(data));
            this.countries = data;
      }
    );

  };

  onSubmit(){
    console.log('handling the submit button');
    console.log(this.checkoutFormGroup.get('customer').value);    
    console.log("The first name is " + this.checkoutFormGroup.get('customer').value.firstName );
    console.log("The last name is " + this.checkoutFormGroup.get('customer').value.lastName );
    console.log("The email address is " + this.checkoutFormGroup.get('customer').value.email );
  };

  sameAsShipping(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    };
  };

  handleMonthsAndYears(){

    const creditCardFormGroup  = this.checkoutFormGroup.get('creditCard');

    const currentYear:  number = new Date().getFullYear();
    const selectedYear: number = Number( creditCardFormGroup.value.expirationYear );

    // if the current year equals the selected year, then start with current month

    let startMonth: number;

    if( currentYear === selectedYear ){
      startMonth = new Date().getMonth() + 1;
    } else{
      startMonth = 1;
    };

    this.l2FormService.getCreditCardMonths( startMonth ).subscribe(
        data => {
          console.log("Retrieved credit card months: " + JSON.stringify(data));
          this.creditCardMonths = data;
        }
    );

  };

  getStates( formGroupName: string ){
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${ formGroupName } country code: ${ countryCode }` )
    console.log(`${ formGroupName } country name: ${ countryName }` )

    this.l2FormService.getStates(countryCode).subscribe(
      data => {
          if(formGroupName === 'shippingAddress'){
              this.shippingAddressStates = data;
          } else {
              this.billingAddressStates = data
          }

          // select first item by default
          formGroup.get('state').setValue(data[0]);
      }
    );
  };

};
