import { storageNames } from '../../../model/local-storage-enum';

export interface iPromoCode {
    title: string;
    code: string;
    percent: number;
}

const promoCodes: Array<iPromoCode> = [
    { title: 'Rolling Scopes School (10%)', code: 'RS', percent: 10 },
    { title: 'EPAM Systems (15%)', code: 'EPAM', percent: 15 },
    { title: 'All For Free (100%)', code: 'FREE', percent: 100 },
];

let applyedCodes: Array<iPromoCode> = [];

export const addPromo = (promo: iPromoCode) => {
    if (promoCodes.includes(promo)) {
        applyedCodes.push(promo);
        saveData();
    }
};

export const removePromo = (promo?: iPromoCode) => {
    applyedCodes = applyedCodes.filter((p) => p != promo);
    saveData();
};

export const getPromoLength = () => applyedCodes.length;

export const findPromo = (code: string) => promoCodes.find((promo) => promo.code.toUpperCase() === code.toUpperCase());

export const hasPromo = (promo: iPromoCode) => applyedCodes.find((value) => value.code == promo.code);

export const getTotalPercent = () => {
    const percent = applyedCodes.reduce((sum, promo) => sum + promo.percent, 0);
    return percent > 100 ? 100 : percent;
};

export const getNewPrice = (price: number): number => {
    const percent = getTotalPercent();
    return price - (price * percent) / 100;
};

export const getAllPromos = (): Array<iPromoCode> => [...applyedCodes];

const saveData = () => {
    const _applyedCodes = JSON.stringify(applyedCodes);
    localStorage.setItem(storageNames.promoData, _applyedCodes);
};

const loadData = () => {
    const __applyedCodes = localStorage.getItem(storageNames.promoData);
    if (__applyedCodes) {
        const _applyedCodes = JSON.parse(__applyedCodes) as Array<iPromoCode>;
        applyedCodes = _applyedCodes
            .filter((promo) => promoCodes.find((p) => p.code == promo.code))
            .map((promo) => promoCodes.find((p) => p.code == promo.code)) as Array<iPromoCode>;
    }
};
loadData();
