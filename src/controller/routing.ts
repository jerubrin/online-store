import { components } from '../model/comp-factory';
import { iComponent } from '../view/components/component';
import { allParams, CardQueryParams, List, ProductsQueryParams, QueryParams } from '../view/entyties';
import { storageNames } from '../model/local-storage-enum';

export const route = (e: Event) => {
    const event: Event = e || window.event;
    event.preventDefault();
    const link: HTMLBaseElement = event.target as HTMLBaseElement;
    window.history.pushState({}, '', link.href);
};

const routeHandler: List<iComponent> = {
    '/': components.getMainShopPage(),
    '/cart': components.getCart(),
    '/product': components.getProduct(),
    '404': components.getNotFound(),
};

export const handleLocation = () => {
    const path = window.location.pathname;
    const route = (routeHandler[path] || routeHandler['404']) as iComponent;
    _getQueryParams();
    document.body.innerHTML = '';
    route.render(document.body);
};

export const setParams = (nesParam: Partial<QueryParams>) => {
    const queryParams = getQueryParams();
    Object.assign(queryParams, nesParam);
    Object.keys(queryParams).forEach((key) => {
        if (!queryParams[key]) delete queryParams[key];
        if (queryParams[key] === -1) delete queryParams[key];
    });

    const urlSearchParams = new URLSearchParams();
    for (const key in queryParams) {
        urlSearchParams.append(key, queryParams[key]?.toString() ?? '');
    }
    const paramsStr = urlSearchParams.toString();
    window.history.replaceState({}, '', paramsStr ? '?' + paramsStr : window.location.pathname);

    const cardList = components.getCardList();
    if (cardList?.root) {
        console.log('cardList render', queryParams);
        cardList.render(cardList.root);
    }
};

function _getQueryParams<T>(): T {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());
    for (const key in queryParams) {
        console.log(key);
        if (!allParams.has(key)) {
            const route = routeHandler['404'] as iComponent;
            document.body.innerHTML = '';
            route.render(document.body, {});
            throw Error('Wrong Query Params!');
        }
    }
    return queryParams as T;
}

export const getQueryParams = (): QueryParams => _getQueryParams<QueryParams>();
export const getProductsQueryParams = (): ProductsQueryParams => _getQueryParams<ProductsQueryParams>();
export const getCardQueryParams = (): CardQueryParams => _getQueryParams<CardQueryParams>();

export const goToCart = (openModal = false) => {
    localStorage.setItem(storageNames.openModal, openModal.toString());
    window.location.pathname = '/cart';
};

export const goToMain = () => {
    window.location.pathname = '/';
};

export const goToProduct = (id?: number) => {
    if (id) {
        window.location.href = `/product?id=${id}`;
    } else {
        window.location.pathname = `/product`;
    }
};
