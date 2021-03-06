import { Injectable } from "@angular/core";
import { CartItem } from "../common/cart-item";
import { Subject, BehaviorSubject } from 'rxjs';
// Subject:
//      - Does not keep a buffer of previous events
//      - Subscriber only receives new events after they are subscribed

// ReplaySubject:
//      - Has a buffer of all previous events
//      - Once subscribed, subscriber receives a replay of all previous events

// BehaviorSubject:
//      - Has a buffer of the last event
//      - Once subscribed, subcriber recieves the latest event sent prior to subscribing

@Injectable({
    providedIn: 'root'
}) 
export class CartService {

    cartItems: CartItem[] = [];

    //  remember: BehaviorSubject is a SUBCLASS of Subject
    totalPrice:     Subject<number> = new BehaviorSubject<number>(0);
    totalQuantity:  Subject<number> = new BehaviorSubject<number>(0);

    // so that we can save the items in the cart even if refresh
    storage: Storage = localStorage; // Reference to web browser's session storage
    // sessionStorage: once a web broswer tab is closed then data is no longer available 
    // swtiched to localStorage instead of sessionStorage
    // now if we close tab - items in cart are still there

    constructor(){ 
        // read data from storage - so items can be 'saved' instead of losing with refresh..
        let data = JSON.parse( this.storage.getItem('cartItems')); 

        if( data != null ){
            this.cartItems = data;
            // compute totals based on the data that is read from storage
            this.computeCartTotals();
        };
    };

    addToCart( theCartItem: CartItem ){
        // check if we already have the item in our cart
        let alreadyExistsInCart: boolean = false;
        let existingCartItem: CartItem = undefined;

        if( this.cartItems.length > 0 ){          
            // find the item in the cart based on            
            existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id );

            // check if we found it  
            alreadyExistsInCart = ( existingCartItem != undefined );              
        };
        if( alreadyExistsInCart ){
            // increment the quantity
            existingCartItem.quantity++;
        } else {
            // just add the item to the array
            this.cartItems.push(theCartItem);
        }; 
        // compute cart total price and total quantity
        this.computeCartTotals();        
    };

    computeCartTotals(){
        let totalPriceValue:    number = 0; 
        let totalQuantityValue: number = 0;

        for( let currentCartItem of this.cartItems ){
            totalPriceValue     += currentCartItem.quantity * currentCartItem.unitPrice;
            totalQuantityValue  += currentCartItem.quantity;
        };
        // publish the new values - all subscribers will receive the new data
        this.totalPrice.next(totalPriceValue);
        this.totalQuantity.next(totalQuantityValue);

        // log cart data just for debugging purposes
        this.logCartData(totalPriceValue, totalQuantityValue);

        // persist cart data - that we set up 
        this.persistCartItems();
    };

    logCartData( totalPriceValue: number, totalQuantityValue: number ) {
        console.log('Content of the cart');
        for( let tempCartItem of this.cartItems ){
            const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
            console.log(`
                name:           ${ tempCartItem.name }, 
                quantity =       ${ tempCartItem.quantity }, 
                unitPrice =      ${ tempCartItem.unitPrice },
                subTotalPrice =  ${ subTotalPrice }
            `);
        };
        console.log(`
            totalPrice:     ${ totalPriceValue.toFixed(2)},
            totalQuantity:  ${ totalQuantityValue }
        `);
        console.log('----------')
    };

    subtractFromCart(theCartItem: CartItem){
        theCartItem.quantity--;

        if( theCartItem.quantity === 0 ){
            this.remove(theCartItem);
        } else {
            this.computeCartTotals();
        };
    };

    remove(theCartItem: CartItem){        
        // get index of item in the array
        const itemIndex = this.cartItems.findIndex(
            tempCartItem => tempCartItem.id == theCartItem.id
        );

        // if found, remove the item from the array at the give index
        if( itemIndex > -1 ){
            this.cartItems.splice( itemIndex, 1 );
            this.computeCartTotals();
        };
    };

    persistCartItems(){  // key: cartItems, value: this.cartItems
        this.storage.setItem( 'cartItems', JSON.stringify(this.cartItems) );
    };

};
