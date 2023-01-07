import {describe, expect, test} from '@jest/globals';
import Constructor from './src/model/html-constructor';
import { params } from './src/controller/routing';
import { Filter } from './src/view/components/filter/index';
// import {getProducts} from './src/controller/controller'
import products from './src/model/products.json';


test('Class Constructor create HTMElement', () => {
    const div = document.createElement('div')
    div.className = 'test'
    expect(new Constructor('div', 'test').create()).toStrictEqual(div);
    const element = new Constructor('div', 'test');
    expect(element).not.toBeNull();
  });

test('Metod getMinMax return min or max value', () => {
    let arr = []
    expect(new Filter().getMinMax(arr,true,true)).toBe(0);
    expect(new Filter().getMinMax(products,true,true)).toBe(10);
    expect(new Filter().getMinMax(products,false,true)).toBe(1749);
  });

  test('Metod getMultiRange return multirange', () => {
    expect(new Filter().getMultiRange('slider')).not.toBeNull();
  });

  test('Metod getObjBrand return object', () => {
    expect(new Filter().getObjBrand(products)).not.toBeNull();
  });

  test('Metod getObjBrand return Error witn no params', () => {
    expect(() => new Filter().getObjBrand()).toThrow();
  });

  test('Metod getObjCategory return object', () => {
    expect(new Filter().getObjCategory(products)).not.toBeNull();
  });

  test('Metod getObjCategory return Error witn no params', () => {
    expect(() => new Filter().getObjCategory()).toThrow();
  });

