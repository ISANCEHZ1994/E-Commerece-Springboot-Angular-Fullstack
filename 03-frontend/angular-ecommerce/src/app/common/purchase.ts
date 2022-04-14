import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./order-item";

export class Purchase {     
    order:           Order;
    orderItem:       OrderItem[];
    shippingAddress: Address;
    billingAddress:  Address;
    customer:        Customer;   
};
