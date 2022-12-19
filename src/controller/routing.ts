import { components } from '../model/comp-factory';
import { iComponent } from '../view/components/component';
import { List, QueryParams } from '../view/entyties';

let queryParams: QueryParams = {} as QueryParams;

export const route = (e: Event) => {
    const event: Event = e || window.event;
    event.preventDefault();
    const link: HTMLBaseElement = event.target as HTMLBaseElement;
    window.history.pushState({}, '', link.href);
};

const routeHandler: List<iComponent> = {
    '/': components.getMainShopPage(),
    '/cart': components.getCart(),
    '404': components.getNotFound(),
};

export const handleLocation = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const path = window.location.pathname;
    const route = (routeHandler[path] || routeHandler['404']) as iComponent;
    queryParams = Object.fromEntries(urlSearchParams.entries());
    route.render(document.body, queryParams);
};

export const setParams = (nesParam: Partial<QueryParams>) => {
    Object.assign(queryParams, nesParam);
    Object.keys(queryParams).forEach((key) => {
        if (!queryParams[key]) delete queryParams[key];
    });

    const urlSearchParams = new URLSearchParams();
    for (const key in queryParams) {
        urlSearchParams.append(key, queryParams[key]?.toString() ?? '');
    }
    window.location.search = '?' + urlSearchParams.toString();

    const path = window.location.pathname;
    const route = (routeHandler[path] || routeHandler['404']) as iComponent;
    route.render(document.body, queryParams);
};
