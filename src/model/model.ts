export interface iCartData {
    id?: number;
    title: string;
    description?: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail?: string;
    images: Array<string>;
    // addedToCart?: boolean;
}

export class CartItem {
    constructor(public product: iCartData, public count: number) {}
}
