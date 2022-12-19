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

export class List<T> {
    [index: string]: T;
}
