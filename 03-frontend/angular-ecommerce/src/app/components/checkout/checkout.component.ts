import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';

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
        firstName: new FormControl('',
            [ 
              Validators.required, 
              Validators.minLength(2), 
              Luv2ShopValidators.notOnlyWhitespace
            ]
        ),
        lastName: new FormControl('',
            [ 
              Validators.required, 
              Validators.minLength(2),
              Luv2ShopValidators.notOnlyWhitespace
            ]
        ),
        email: new FormControl('',
            [ 
              Validators.required, 
              Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
            ]
        )
      }),
      shippingAddress: this.formBuilder.group({
        country: new FormControl('', 
          [
            Validators.required
          ]
        ),
        street: new FormControl('',
          [
            Validators.required,
            Validators.minLength(2),
            Luv2ShopValidators.notOnlyWhitespace
          ]
        ),
        city: new FormControl('',
          [
            Validators.required,
            Validators.minLength(2),
            Luv2ShopValidators.notOnlyWhitespace
          ]
        ),
        state: new FormControl('', 
          [
            Validators.required
          ]
        ),
        zipCode: new FormControl('',
        [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace
        ]
      ),
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

    // populate countriews
    this.l2FormService.getCountries().subscribe(
      data => {
            console.log("Retrieved Countries: " + JSON.stringify(data));
            this.countries = data;
      }
    );

    // this.l2FormService.getStates().subscribe(
    //   data => {
    //     console.log("Retrieved States: " + JSON.stringify(data));
    //     this.states
    //   }
    // )

  }; // CLOSES ngOnInit 

  onSubmit(){
    console.log('handling the submit button');

    if (this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    };

    console.log(this.checkoutFormGroup.get('customer').value);    
    console.log("The first name is " + this.checkoutFormGroup.get('customer').value.firstName );
    console.log("The last name is " + this.checkoutFormGroup.get('customer').value.lastName );
    console.log("The email address is " + this.checkoutFormGroup.get('customer').value.email );

    console.log("The shipping address country is "  + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("The shipping state country is "    + this.checkoutFormGroup.get('shippingAddress').value.state.name);

  };

    get firstName(){ return this.checkoutFormGroup.get('customer.firstName') };
    get lastName(){ return this.checkoutFormGroup.get('customer.lastName') };
    get email(){ return this.checkoutFormGroup.get('customer.email') };

    get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street')};
    get shippingAddressCity()   { return this.checkoutFormGroup.get('shippingAddress.city') };
    get shippingAddressState()  { return this.checkoutFormGroup.get('shippingAddress.state')};
    get shippingAddressZipCode(){ return this.checkoutFormGroup.get('shippingAddress.zipCode')};
    get shippingAddressCountry(){ return this.checkoutFormGroup.get('shippingAddress.country')};
    // get shippingAddress(){ return this.checkoutFormGroup.get('') };

  sameAsShipping(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value        
      );

      // bug fix for states
        this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();

      // bug fix for states
      this.billingAddressStates = [];

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

    this.l2FormService.getStates( countryCode ).subscribe(
      data => {
          if(formGroupName === 'shippingAddress'){
              this.shippingAddressStates = data;
          } else {
              this.billingAddressStates = data;
          }
          // select first item by default
          formGroup.get('state').setValue(data[0]);
      }
    );
  };


};
