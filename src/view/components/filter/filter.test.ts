import { expect, test } from '@jest/globals';
import Constructor from '../../../model/html-constructor';
import { Filter } from './index';
import products from '../../../model/products.json';
import { iCartData } from '../../../model/model';

test('Class Constructor create HTMElement', () => {
    const div = document.createElement('div');
    div.className = 'test';
    expect(new Constructor('div', 'test').create()).toStrictEqual(div);
    const element = new Constructor('div', 'test');
    expect(element).not.toBeNull();
});

test('Metod getMinMax return min or max value', () => {
    const arr: Array<iCartData> = [];
    expect(new Filter().getMinMax(arr, true, true)).toBe(0);
    expect(new Filter().getMinMax(products, true, true)).toBe(10);
    expect(new Filter().getMinMax(products, false, true)).toBe(1749);
});

test('Metod getMultiRange return multirange', () => {
    expect(new Filter().getMultiRange('slider')).not.toBeNull();
});

test('Metod getObjBrand return object', () => {
    expect(new Filter().getObjBrand(products)).not.toBeNull();
});

test('Metod getObjCategory return object', () => {
    expect(new Filter().getObjCategory(products)).not.toBeNull();
});

test('Cant render without setting root element', () => {
    const filter = new Filter();
    expect(() => new Filter().render(filter.root as HTMLElement)).toThrow();
});
