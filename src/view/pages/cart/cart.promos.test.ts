import * as promos from './promos';

const RS = 'RS';
const EPAM = 'EPAM';
const FREE = 'FREE';
const WRONG = 'WRONG';

describe('Tests: "cart.promos.ts" module', () => {
    let rsPromo: promos.iPromoCode;
    let epamPromo: promos.iPromoCode;
    let freePromo: promos.iPromoCode;

    beforeAll(() => {
        rsPromo = promos.findPromo(RS) as promos.iPromoCode;
        epamPromo = promos.findPromo(EPAM) as promos.iPromoCode;
        freePromo = promos.findPromo(FREE) as promos.iPromoCode;
    });

    it('findPromo - test for serching promo codes', () => {
        const _rsPromo = promos.findPromo(RS);
        const _epamPromo = promos.findPromo(RS);
        const _wrong = promos.findPromo(WRONG);
        expect(_rsPromo).toBeDefined();
        expect(_epamPromo).toBeDefined();
        expect(_wrong).toBeUndefined();
    });

    it('addPromo - test for adding new promo', () => {
        promos.addPromo(rsPromo);
        let allPromos: Array<promos.iPromoCode> = promos.getAllPromos();

        expect(allPromos.length).toEqual(1);
        expect(allPromos).toContain(rsPromo);

        promos.addPromo(epamPromo);
        allPromos = promos.getAllPromos();
        expect(allPromos.length).toEqual(2);
        expect(allPromos).toContain(rsPromo);
        expect(allPromos).toContain(epamPromo);
    });

    it('removePromo - test for removing promo code', () => {
        promos.addPromo(rsPromo);
        let allPromos: Array<promos.iPromoCode> = promos.getAllPromos();
        expect(allPromos).toContain(rsPromo);

        promos.removePromo(rsPromo);
        allPromos = promos.getAllPromos();
        expect(allPromos.length).toBeLessThanOrEqual(0);
    });

    it('hasPromo - test for avaible adding promo', () => {
        expect(promos.hasPromo(rsPromo)).toBeFalsy();
        promos.addPromo(rsPromo);
        expect(promos.hasPromo(rsPromo)).toBeTruthy();

        promos.removePromo(rsPromo);
        expect(promos.hasPromo(rsPromo)).toBeFalsy();
    });

    it('getPromoLength - test correct length', () => {
        expect(promos.getPromoLength()).toEqual(promos.getAllPromos().length);
    });

    it('getTotalPercent', () => {
        let percent = promos.getTotalPercent();
        expect(percent).toEqual(0);

        promos.addPromo(rsPromo);
        percent = promos.getTotalPercent();
        expect(percent).toEqual(rsPromo.percent);

        promos.addPromo(epamPromo);
        percent = promos.getTotalPercent();
        expect(percent).toEqual(rsPromo.percent + epamPromo.percent);

        promos.addPromo(freePromo);
        percent = promos.getTotalPercent();
        expect(percent).toEqual(100);
    });

    it('getNewPrice', () => {
        const totalPrice = 1000;
        let promoPrice = promos.getNewPrice(totalPrice);
        expect(promoPrice).toEqual(totalPrice);

        promos.addPromo(rsPromo);
        promoPrice = promos.getNewPrice(totalPrice);
        let percent = promos.getTotalPercent();
        expect(promoPrice).toEqual(totalPrice - (totalPrice * percent) / 100);

        promos.addPromo(epamPromo);
        promoPrice = promos.getNewPrice(totalPrice);
        percent = promos.getTotalPercent();
        expect(promoPrice).toEqual(totalPrice - (totalPrice * percent) / 100);

        promos.addPromo(freePromo);
        promoPrice = promos.getNewPrice(totalPrice);
        expect(promoPrice).toEqual(0);
    });

    afterEach(() => {
        promos.removePromo(rsPromo);
        promos.removePromo(epamPromo);
        promos.removePromo(freePromo);
    });
});
