import { getProducts } from '../controller/controller';
import { components } from './comp-factory';
import { iCartData } from './model';

describe('Tests: "AllComponents" module', () => {
    it('getMainShopPage - test for getting the same Class', () => {
        const products = getProducts();
        const card1 = components.getCard(products[0] as iCartData);
        const card2 = components.getCard(products[1] as iCartData);
        expect(card1).not.toEqual(card2);
    });

    it('getCardList - test for getting the same Class', () => {
        expect(components.getCardList()).toEqual(components.getCardList());
    });

    it('getCart - test for getting the same Class', () => {
        expect(components.getCart()).toEqual(components.getCart());
    });

    it('getFilter - test for getting the same Class', () => {
        expect(components.getFilter()).toEqual(components.getFilter());
    });

    it('getFooter - test for getting the same Class', () => {
        expect(components.getFooter()).toEqual(components.getFooter());
    });

    it('getHeader - test for getting the same Class', () => {
        expect(components.getHeader()).toEqual(components.getHeader());
    });

    it('getMainShopPage - test for getting the same Class', () => {
        expect(components.getMainShopPage()).toEqual(components.getMainShopPage());
    });

    it('getNotFound - test for getting the same Class', () => {
        expect(components.getNotFound()).toEqual(components.getNotFound());
    });

    it('getProduct - test for getting the same Class', () => {
        expect(components.getProduct()).toEqual(components.getProduct());
    });

    it('getSortContainer - test for getting the same Class', () => {
        expect(components.getSortContainer()).toEqual(components.getSortContainer());
    });
});
