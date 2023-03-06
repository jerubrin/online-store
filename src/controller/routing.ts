import { components } from '../model/comp-factory';
import { iComponent } from '../view/components/component';
import { CardQueryParams, List, ProductsQueryParams, QueryParams } from '../view/entyties';
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
    document.body.innerHTML = '';
    route.render(document.body);
};

export const setCartParams = (params: CardQueryParams) => {
    const urlSearchParams = new URLSearchParams();
    if (params.limit == 4) delete params.limit;
    if (params.page == 1) delete params.page;
    for (const key in params) {
        urlSearchParams.append(key, params[key]?.toString() ?? '');
    }
    const paramsStr = urlSearchParams.toString();
    window.history.replaceState({}, '', paramsStr ? '?' + paramsStr : window.location.pathname);
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
        cardList.render(cardList.root);
    }
};

function _getQueryParams<T>(): T {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());
    return queryParams as T;
}

export const getQueryParams = (): QueryParams => _getQueryParams<QueryParams>();
export const getProductsQueryParams = (): ProductsQueryParams => _getQueryParams<ProductsQueryParams>();
export const getCardQueryParams = (): CardQueryParams => _getQueryParams<CardQueryParams>();

export const goToCart = (openModal = false) => {
    localStorage.setItem(storageNames.openModal, openModal.toString());
    window.history.pushState({}, 'Cart', '/cart');
    handleLocation();
};

export const goToMain = () => {
    window.history.pushState({}, 'Main page', '/');
    handleLocation();
};

export const goToProduct = (id?: number) => {
    if (id) {
        window.history.pushState({}, 'Main page', `/product?id=${id}`);
    } else {
        window.history.pushState({}, 'Main page', `/product`);
    }
    handleLocation();
};
