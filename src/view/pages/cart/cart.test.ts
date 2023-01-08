import { iCartData } from '../../../model/model';
import * as cartList from './cart.funcs';

const mockProducts: Array<iCartData> = [1, 2, 3, 4, 5, 6].map((num) => ({
    id: num,
    title: `title ${num}`,
    price: num * 10,
    stock: num,
    brand: `brand ${num}`,
    category: `category ${num}`,
    images: [`image${num}_1.img`, `image${num}_2.img`],
}));

const mockProductOne = mockProducts[0] as iCartData;
const mockProductTwo = mockProducts[1] as iCartData;
const mockProductThree = mockProducts[2] as iCartData;

describe('Tests: "cart.funcs.ts" module', () => {
    beforeEach(() => {
        cartList.clearCart();
    });

    it('clearCart - check card clearing', () => {
        cartList.addToCart(mockProductTwo, 1);
        expect(cartList.getLength()).toBeGreaterThan(0);
        expect(cartList.hasItem(mockProductTwo.id)).toBeTruthy();
        cartList.clearCart();
        expect(cartList.getLength()).toEqual(0);
    });

    it('addToCart - check card adding product', () => {
        cartList.addToCart(mockProductOne, 1);
        expect(cartList.hasItem(mockProductOne.id)).toBeTruthy();
    });

    it('deleteFromCart - check card adding and removing product', () => {
        cartList.addToCart(mockProductThree, 1);
        expect(cartList.hasItem(mockProductThree.id)).toBeTruthy();
        cartList.deleteFromCart(mockProductThree.id);
        expect(cartList.hasItem(mockProductThree.id)).toBeFalsy();
    });

    it('getLength - test for correct length of positions', () => {
        cartList.addToCart(mockProductOne, 1);
        cartList.addToCart(mockProductTwo, 2);
        cartList.addToCart(mockProductThree, 3);
        expect(cartList.getLength()).toEqual(3);
    });

    it('getTotalProducts - test for correct products count', () => {
        cartList.addToCart(mockProductOne, 1);
        cartList.addToCart(mockProductTwo, 2);
        cartList.addToCart(mockProductThree, 3);
        expect(cartList.getTotalProducts()).toEqual(1 + 2 + 3);
    });

    it('getTotalPrice - test for correct total price', () => {
        cartList.addToCart(mockProductOne, 1);
        cartList.addToCart(mockProductTwo, 2);
        cartList.addToCart(mockProductThree, 3);
        const priceOne = mockProductOne.price * 1;
        const priceTwo = mockProductTwo.price * 2;
        const priceThree = mockProductThree.price * 3;
        expect(cartList.getTotalPrice()).toEqual(priceOne + priceTwo + priceThree);
    });

    it('incItemCount - add products correctly', () => {
        cartList.addToCart(mockProductOne, 1);
        cartList.addToCart(mockProductTwo, 1);

        cartList.incCount(mockProductOne.id);
        expect(cartList.getTotalProducts()).toBeLessThan(3);

        cartList.incCount(mockProductTwo.id);
        expect(cartList.getTotalProducts()).toBeGreaterThanOrEqual(3);
    });

    it('decCount - decremet count and remove products correctly', () => {
        cartList.addToCart(mockProductOne, 1);
        cartList.addToCart(mockProductTwo, 1);

        cartList.incCount(mockProductOne.id);
        cartList.decCount(mockProductOne.id);
        expect(cartList.hasItem(mockProductOne.id)).toBeFalsy();

        cartList.incCount(mockProductTwo.id);
        cartList.decCount(mockProductTwo.id);
        expect(cartList.hasItem(mockProductTwo.id)).toBeTruthy();
        cartList.decCount(mockProductTwo.id);
        expect(cartList.hasItem(mockProductTwo.id)).toBeFalsy();
    });

    it('getList - get all products in cart', () => {
        cartList.addToCart(mockProductOne, 1);
        cartList.addToCart(mockProductTwo, 1);
        const list = cartList.getList();
        expect(list).toBeDefined();
        expect(list).not.toBeNull();
        expect(list.length).toEqual(2);
        expect(list.map((item) => item.product)).toContain(mockProductOne);
    });

    it('getListByPage - get products in setted page', () => {
        mockProducts.forEach((product, i) => {
            cartList.addToCart(product, i + 1);
        });
        const listOne = cartList.getListByPage(1, 2);
        const listTwo = cartList.getListByPage(2, 2);

        expect(listOne).toBeDefined();
        expect(listOne.length).toEqual(2);
        const productsListOne = listOne.map((item) => item.product);
        expect(productsListOne).toContain(mockProductOne);
        expect(productsListOne).toContain(mockProductTwo);
        expect(productsListOne).not.toContain(mockProductThree);

        expect(listTwo).toBeDefined();
        expect(listTwo.length).toEqual(2);
        const productsListTwo = listTwo.map((item) => item.product);
        expect(productsListTwo).toContain(mockProducts[2]);
        expect(productsListTwo).toContain(mockProducts[3]);
        expect(productsListTwo).not.toContain(mockProducts[4]);
        expect(productsListTwo).not.toContain(mockProducts[1]);
    });
});
