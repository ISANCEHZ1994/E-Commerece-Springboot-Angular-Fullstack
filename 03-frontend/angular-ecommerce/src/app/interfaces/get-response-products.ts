import { Product } from "../common/product";

export interface GetResponseProducts {
    _embedded: {
        products: Product[];
    };
};
