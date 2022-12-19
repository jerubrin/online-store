import { iCartData } from '../model/model';
import { QueryParams } from '../view/entyties';
import products from '../model/products.json';

const fileterByParams = (_products: Array<iCartData>, params?: QueryParams): Array<iCartData> => {
    if (!params) return _products;
    let __products = _products;

    __products = __products.filter(
        (data) => !params.brand || data.brand?.toLocaleLowerCase().includes(params.brand.toLocaleLowerCase())
    );
    __products = __products.filter(
        (data) => !params.category || data.category?.toLocaleLowerCase().includes(params.category.toLocaleLowerCase())
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

export const getProducts = (params?: QueryParams): Array<iCartData> => {
    const data = fileterByParams(products as Array<iCartData>, params);
    return data;
};
