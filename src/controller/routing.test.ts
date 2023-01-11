import { sortingParams } from '../view/entyties';
import * as routing from './routing';

describe('Tests: "routing.ts" module', () => {
    beforeEach(() => {
        routing.goToMain();
        window.open = jest.fn();
        window.open = open;
    });

    it('goToMain - check changing location url', () => {
        routing.goToMain();
        expect(window.location.pathname).toEqual('/');
    });

    it('goToCart - check changing location url', () => {
        routing.goToCart();
        expect(window.location.pathname).toEqual('/cart');
    });

    it('goToProduct - check changing location url', () => {
        routing.goToProduct();
        expect(window.location.pathname).toContain('/product');
        routing.goToProduct(22);
        expect(window.location.search).toContain('22');
    });

    it('setCartParams - check changing query params', () => {
        routing.setParams({});
        expect(window.location.search).toEqual('');

        const paramString = 'param';
        routing.setParams({ brand: paramString });
        expect(window.location.search).toContain(`brand=${paramString}`);
        routing.setParams({ category: paramString });
        expect(window.location.search).toContain(`category=${paramString}`);
        routing.setParams({ list: paramString });
        expect(window.location.search).toContain(`list=${paramString}`);
        routing.setParams({ search: paramString });
        expect(window.location.search).toContain(`search=${paramString}`);

        routing.setParams({ brand: '', category: '', list: '', search: '' });
        expect(window.location.search).toEqual('');

        routing.setParams({ sorting: sortingParams.alphabetBack });
        let queryObj = Object.fromEntries(new URLSearchParams(window.location.search));
        expect(queryObj.sorting).toBeDefined();
        expect(queryObj.sorting).toContain(sortingParams.alphabetBack);

        routing.setParams({ sorting: sortingParams.def });
        queryObj = Object.fromEntries(new URLSearchParams(window.location.search));
        expect(queryObj.sorting).toBeUndefined();
        expect(window.location.search).toEqual('');
    });

    it('setCartParams - check changing query params', () => {
        routing.setCartParams({});
        expect(window.location.search).toEqual('');

        routing.setCartParams({ limit: 1 });
        expect(window.location.search).toContain('limit');

        routing.setCartParams({ page: 2 });
        expect(window.location.search).toContain('page');

        routing.setCartParams({ page: 2, limit: 1 });
        expect(window.location.search).toContain('limit');
        expect(window.location.search).toContain('page');

        routing.setCartParams({ page: 1, limit: 4 });
        expect(window.location.search).toEqual('');
    });
});
