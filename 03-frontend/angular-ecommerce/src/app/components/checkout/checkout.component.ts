import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice:     number = 0;
  totalQuantity:  number = 0;
  
  // since we are using luv2ShopService
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates:  State[] = [];
  billingAddressStates:   State[] = [];

  constructor( 
    private formBuilder:     FormBuilder, 
    private l2FormService:   Luv2ShopFormService,
    private cartService:     CartService,
    private checkoutService: CheckoutService,
    private router:          Router
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
          [ Validators.required ]
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
          [ Validators.required ]
        ),
        zipCode: new FormControl('',
        [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace
        ]
      )
      }),
      billingAddress: this.formBuilder.group({
        country: new FormControl('', 
          [ Validators.required ]
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
          [ Validators.required ]
        ),
        zipCode: new FormControl('',
        [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace
        ]
      )
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', 
          [ Validators.required ]
        ),
        nameOnCard: new FormControl('',
          [
            Validators.required,
            Validators.minLength(2),
            Luv2ShopValidators.notOnlyWhitespace
          ]
        ),
        cardNumber: new FormControl('', 
          [ 
            Validators.required, 
            Validators.pattern('[0-9]{16}') // Regular Expression ONLY 16 digits
          ]
        ),
        securityCode: new FormControl('', 
          [ 
            Validators.required, 
            Validators.pattern('[0-9]{3}') // Regular Expression ONLY 3
          ]
        ),
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

    this.reviewCartDetails();

  }; // CLOSES ngOnInit 

  onSubmit(){
    console.log('handling the submit button');

    if (this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    };

    // set up order
    let order = new Order();
    order.totalPrice =    this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;    

    // create orderItems from cartItems    
    let orderItems: OrderItem[] = cartItems.map( item => new OrderItem( item ));

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase -  shipping address
    purchase.shippingAddress   = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shipState: State     = JSON.parse(JSON.stringify( purchase.shippingAddress.state ));
    const shipCountry: Country = JSON.parse(JSON.stringify( purchase.shippingAddress.country ));
    purchase.shippingAddress.state   = shipState.name;
    purchase.shippingAddress.country = shipCountry.name;    

    // populate purchase - billing address
    purchase.billingAddress    = this.checkoutFormGroup.controls['billingAddress'].value;
    const billState: State     = JSON.parse(JSON.stringify( purchase.billingAddress.state ));
    const billCountry: Country = JSON.parse(JSON.stringify( purchase.billingAddress.country ));
    purchase.billingAddress.state   = billState.name;
    purchase.billingAddress.country = billCountry.name;

    // populate purchase - order and orderItems
    purchase.order      = order;
    purchase.orderItem  = orderItems;

    // call REST API via the CheckoutService

  };

  // GETTERS 
  get firstName(){ return this.checkoutFormGroup.get('customer.firstName')};
  get lastName(){  return this.checkoutFormGroup.get('customer.lastName')};
  get email(){     return this.checkoutFormGroup.get('customer.email')};

  get shippingStreet() { return this.checkoutFormGroup.get('shippingAddress.street')};
  get shippingCity()   { return this.checkoutFormGroup.get('shippingAddress.city') };
  get shippingState()  { return this.checkoutFormGroup.get('shippingAddress.state')};
  get shippingZipCode(){ return this.checkoutFormGroup.get('shippingAddress.zipCode')};
  get shippingCountry(){ return this.checkoutFormGroup.get('shippingAddress.country')};
  
  get billingStreet() { return this.checkoutFormGroup.get('billingAddress.street')};
  get billingCity()   { return this.checkoutFormGroup.get('billingAddress.city') };
  get billingState()  { return this.checkoutFormGroup.get('billingAddress.state')};
  get billingZipCode(){ return this.checkoutFormGroup.get('billingAddress.zipCode')};
  get billingCountry(){ return this.checkoutFormGroup.get('billingAddress.country')};

  get creditCardType(){   return this.checkoutFormGroup.get('creditCard.cardType')};
  get creditNameOnCard(){ return this.checkoutFormGroup.get('creditCard.nameOnCard')};
  get creditCardNumber(){ return this.checkoutFormGroup.get('creditCard.cardNumber')};
  get creditSecurityCode(){ return this.checkoutFormGroup.get('creditCard.securityCode')};

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

  reviewCartDetails(){       
      this.cartService.totalQuantity.subscribe(
          totalQuantity => this.totalQuantity = totalQuantity
      );
      this.cartService.totalPrice.subscribe(
          totalPrice => this.totalPrice = totalPrice
      );
  };


};
