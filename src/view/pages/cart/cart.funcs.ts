import { iCartData } from '../../../model/model';

const cart: Array<iCartData> = [];

export const addToCart = (product: iCartData) => cart.push(product);

export const deleteFromCart = (id: number) => {
    const i = cart.findIndex((product) => product.id !== id);
    if (i > -1) cart.splice(i, 1);
};

export const getTotalPrice = (): number => cart.reduce((sum, product) => sum + product.price, 0);

export const getTotalProducts = (): number => cart.length;
