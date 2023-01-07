import { iCartData } from '../model/model';
import { QueryParams } from '../view/entyties';
import products from '../model/products.json';
import { getQueryParams } from './routing';

const SPLIT_SYMBOL = '|';

const fileterByParams = (_products: Array<iCartData>, params?: QueryParams): Array<iCartData> => {
    if (!params) return _products;
    let __products = _products;

    __products = __products.filter(
        (data) =>
            !params.brand ||
            params.brand
                .toLocaleLowerCase()
                .split(SPLIT_SYMBOL)
                .some((val) => data.brand?.toLocaleLowerCase().includes(val))
    );
    __products = __products.filter(
        (data) =>
            !params.category ||
            params.category
                .toLocaleLowerCase()
                .split(SPLIT_SYMBOL)
                .some((val) => data.category?.toLocaleLowerCase().includes(val))
    );
    __products = __products.filter((data) => !params.minprice || data.price >= params.minprice);
    __products = __products.filter((data) => !params.maxprice || data.price <= params.maxprice);
    __products = __products.filter((data) => !params.minstock || data.stock >= params.minstock);
    __products = __products.filter((data) => !params.maxstock || data.stock <= params.maxstock);

    __products = __products.filter(
        (data) =>
            !params.search ||
            data.brand?.toLocaleLowerCase().includes(params.search.toLocaleLowerCase()) ||
            data.category?.toLocaleLowerCase().includes(params.search.toLocaleLowerCase()) ||
            data.description?.toLocaleLowerCase().includes(params.search.toLocaleLowerCase()) ||
            data.title?.toLocaleLowerCase().includes(params.search.toLocaleLowerCase())
    );
    return __products;
};

export const getProducts = (params: QueryParams = getQueryParams()): Array<iCartData> => {
    const data = fileterByParams(products as Array<iCartData>, params);
    return data;
};
