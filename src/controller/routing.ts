import { components } from '../model/comp-factory';
import { iComponent } from '../view/components/component';
import { List, ProductsQueryParams, QueryParams } from '../view/entyties';

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
    route.render(document.body, getQueryParams());
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
    window.history.replaceState({}, '', paramsStr ? '?' + paramsStr : '/');

    const cardList = components.getCardList();
    if (cardList?.root) {
        console.log('cardList render', queryParams);
        cardList.render(cardList.root);
    }
};

export const getQueryParams = (): QueryParams => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());
    return queryParams;
};

export const getProductsQueryParams = (): ProductsQueryParams => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());
    return queryParams;
};

export const goToCart = () => {
    window.location.pathname = '/cart';
};

export const goToProduct = (id?: number) => {
    if (id) {
        window.location.href = `/product?id=${id}`;
    } else {
        window.location.pathname = `/product`;
    }
};
