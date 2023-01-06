interface iPromoCode {
    title: string;
    code: string;
    percent: number;
}

const promoCodes: Array<iPromoCode> = [
    { title: 'Rolling Scopes School (10%)', code: 'RS', percent: 10 },
    { title: 'EPAM Systems (15%)', code: 'EPAM', percent: 15 },
    { title: 'All For Free (100%)', code: 'FREE', percent: 100 },
];

const applyedCodes: Array<iPromoCode> = [{ title: 'Rolling Scopes School (10%)', code: 'RS', percent: 10 }];

export const addPromo = (promo: iPromoCode) => applyedCodes.push(promo);

export const removePromo = (promo: iPromoCode) => applyedCodes.filter((p) => p != promo);

export const getPromoLength = () => applyedCodes.length;

export const findPromo = (code: string) => promoCodes.find((promo) => promo.code.toUpperCase() === code.toUpperCase());

export const getTotalPercent = () => {
    const percent = applyedCodes.reduce((sum, promo) => sum + promo.percent, 0);
    return percent > 100 ? 100 : percent;
};

export const getNewPrice = (price: number): number => {
    const percent = getTotalPercent();
    return price - (price * percent) / 100;
};
