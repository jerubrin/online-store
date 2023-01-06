import {describe, expect, test} from '@jest/globals';
const sum = require('./sum');
// const Constructor = require('./src/model/html-constructor')
// const Filter = require('./src/view/components/filter/index')
import Constructor from './src/model/html-constructor';
// import { Filter } from './src/view/components/filter/index';
// import {getProducts} from './src/controller/controller'
// import Classes from './allClasses'


test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('Create HTMElement', () => {
    const div = document.createElement('div')
    div.className = 'test'
    expect(new Constructor('div', 'test').create()).toStrictEqual(div);
    const element = new Constructor('div', 'test');
    expect(element).not.toBeNull();
  });

// test('Return min or max value', () => {
//     let arr = []
//     expect(new Filter.getMinMax(arr,true,true)).toBe(0);
//   });

