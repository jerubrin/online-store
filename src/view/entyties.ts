import { iCartData } from '../model/model';

export type renderFunc = (root: HTMLElement, params?: QueryParams) => void;

export interface QueryParams {
    search?: string;
    brand?: string;
    category?: string;
    minprice?: number;
    maxprice?: number;
    minstock?: number;
    maxstock?: number;
    [index: string]: string | number;
}

export interface ProductsQueryParams {
    id?: number;
    [index: string]: string | number;
}

export class List<T> {
    [index: string]: T;
}

export interface ImultiRange {
    conteiner: HTMLElement | HTMLFormElement | HTMLInputElement;
    range1: HTMLInputElement;
    range2: HTMLInputElement;
    value1: HTMLElement | HTMLInputElement;
    value2: HTMLElement | HTMLInputElement;
    fillTRack: () => void;
}

export type SortFunction = (a: iCartData, b: iCartData) => number;

export interface RangeObject {
    conteiner: HTMLElement;
    range1: HTMLInputElement;
    range2: HTMLInputElement;
    value1: HTMLElement;
    value2: HTMLElement;
    fillTRack: () => void;
}
