import { getProducts } from './controller';
import productsBase from '../model/products.json';

describe('Tests: "routing.ts" module', () => {
    it('getProducts - General tests', () => {
        const products = getProducts();
        expect(products).toBeDefined();
        expect(products.length).toBeGreaterThan(0);
        expect(products.length).toEqual(productsBase.length);
        expect(products[0]).toEqual(productsBase[0]);
    });

    it('getProducts - Filter by brand test', () => {
        const filter = 'Apple';
        const products = getProducts({ brand: filter });
        const productsFromBase = productsBase.filter((product) => product.brand == filter);
        expect(products).toBeDefined();
        expect(products.length).toEqual(productsFromBase.length);
        expect(products[0]).toEqual(productsFromBase[0]);
    });

    it('getProducts - Filter by category test', () => {
        const filter = 'smartphones';
        const products = getProducts({ category: filter });
        const productsFromBase = productsBase.filter((product) => product.category == filter);
        expect(products).toBeDefined();
        expect(products.length).toEqual(productsFromBase.length);
        expect(products[0]).toEqual(productsFromBase[0]);
    });

    it('getProducts - Filter by price test', () => {
        const minprice = 100;
        const products = getProducts({ minprice: minprice });
        const productsFromBase = productsBase.filter((product) => product.price >= minprice);
        expect(products).toBeDefined();
        expect(products.length).toEqual(productsFromBase.length);
        expect(products[0]).toEqual(productsFromBase[0]);
    });
});
