import './style.scss';
import { iComponent } from '../../components/component';
import Constructor from '../../../model/html-constructor';
import { components } from '../../../model/comp-factory';
import * as cartList from '../../pages/cart/cart.funcs';

export class Cart implements iComponent {
    render(root: HTMLElement) {
        const $header = document.createElement('header');
        const $footer = document.createElement('footer');
        const $main = new Constructor('main', 'cart').create();

        if (cartList.getTotalProducts() > 0) {
            const $products = new Constructor('div', 'empty-cart').create();

            $main.append($products);
        } else {
            const $emptyCart = new Constructor('div', 'empty-cart').create();
            const $picture = new Constructor('div', 'empty-cart__picture').create();
            const $title = new Constructor('h1', 'empty-cart__title', 'Your Cart is empty').create();

            $emptyCart.append($picture, $title);
            $main.append($emptyCart);
        }

        components.getHeader().render($header);
        components.getFooter().render($footer);

        root.append($header, $main, $footer);
    }
}
