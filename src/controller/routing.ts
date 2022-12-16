import { components } from '../model/comp-factory';
import { Component } from '../view/components/component';
import { List } from '../view/entyties';

export const route = (e: Event) => {
    const event: Event = e || window.event;
    event.preventDefault();
    const link: HTMLBaseElement = event.target as HTMLBaseElement;
    window.history.pushState({}, '', link.href);
};

const routeHandler: List<Component> = {
    '/': components.getMainShopPage(),
    '/cart': components.getCart(),
    '404': components.getNotFound(),
};

export const handleLocation = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const path = window.location.pathname;
    const route = (routeHandler[path] || routeHandler['404']) as Component;
    const params = Object.fromEntries(urlSearchParams.entries());
    route.render(document.body, params);
};
