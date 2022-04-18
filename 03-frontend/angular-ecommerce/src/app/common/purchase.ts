import { Address }      from "./address";
import { Customer }     from "./customer";
import { Order }        from "./order";
import { OrderItem }    from "./order-item";

export class Purchase {       
    order:           Order;
    // make sure orderItems <== or any other key is the same as backend..
    // was missing the s and threw error in backend..
    orderItems:      OrderItem[];
    shippingAddress: Address;
    billingAddress:  Address;
    customer:        Customer;   
};
