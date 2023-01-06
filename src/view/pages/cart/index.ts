import './style.scss';
import { iComponent } from '../../components/component';
import Constructor from '../../../model/html-constructor';
import { components } from '../../../model/comp-factory';
import * as cartList from '../../pages/cart/cart.funcs';
import { ProductInCart } from '../../components/product-in-card';
import { iCartData } from '../../../model/model';

export class Cart implements iComponent {
    currentPage = 1;
    maxPage = 1;
    limit = 4;
    root?: HTMLElement;

    render(root: HTMLElement) {
        this.root = root;
        cartList.loadData();
        const $header = document.createElement('header');
        const $footer = document.createElement('footer');
        const $main = new Constructor('main', 'cart').create();

        if (cartList.getTotalProducts() > 0) {
            const $products = new Constructor('div', 'products').create();

            // Title
            const $products__title = new Constructor('div', 'products__title title').create();

            const $title__title = new Constructor('div', 'title__title', 'Products In Cart').create();

            const $title__limit = new Constructor('h2', 'title__limit', 'Limit:').create();
            const $title__limitTitle = new Constructor('h3', 'title__limit-title').create();
            const $title__limitInput = new Constructor('input', 'title__limit-title').create();
            $title__limitInput.setAttribute('type', 'number');

            ($title__limitInput as HTMLInputElement).value = this.limit.toString();
            $title__limitInput.setAttribute('min', '1');
            $title__limitInput.setAttribute('max', cartList.getLength().toString());
            $title__limit.append($title__limitTitle, $title__limitInput);

            this.setCorrectPages(+($title__limitInput as HTMLInputElement).value);

            const $title__page = new Constructor('div', 'title__page', 'Page:').create();
            const $title__pagePrev = new Constructor('button', 'title__page-prev', '<').create();
            const $title__pageNumber = new Constructor(
                'div',
                'title__page-number',
                this.currentPage.toString()
            ).create();
            const $title__pageNext = new Constructor('button', 'title__page-next', '>').create();
            $title__page.append($title__pagePrev, $title__pageNumber, $title__pageNext);

            //Handlers
            $title__pagePrev.onclick = () => {
                this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : this.currentPage;
                console.log(this.currentPage, this.limit);
                this.rerender();
            };
            $title__pageNext.onclick = () => {
                this.currentPage = this.currentPage < this.maxPage ? this.currentPage + 1 : this.currentPage;
                console.log(this.currentPage, this.limit);
                this.rerender();
            };
            $title__limitInput.onchange = () => {
                this.limit = +($title__limitInput as HTMLInputElement).value;
                this.rerender();
            };

            $products__title.append($title__title, $title__limit, $title__page);

            // List
            const $products__list = new Constructor('div', 'products__list').create();
            // TODO: Paging
            const products = cartList.getListByPage(this.currentPage, this.limit);
            console.log(products);
            for (let i = 0; i < products.length; i++) {
                const $curProduct = new Constructor('div', 'products__item').create();
                new ProductInCart(products[i]?.product as iCartData).render($curProduct);
                $products__list.append($curProduct);
            }

            $products.append($products__title, $products__list);

            const $totalPrice = new Constructor('div', 'total-price').create();

            $main.append($products, $totalPrice);
        } else {
            const $emptyCart = new Constructor('div', 'empty-cart').create();
            const $picture = new Constructor('div', 'empty-cart__picture').create();
            const $title = new Constructor('h1', 'empty-cart__title', 'Your Cart is empty').create();

            $emptyCart.append($picture, $title);
            $main.append($emptyCart);
        }

        components.getHeader().render($header);
        components.getFooter().render($footer);
        components.getHeader().refreshData();

        root.append($header, $main, $footer);
    }

    rerender() {
        if (this.root) {
            this.root.innerHTML = '';
            this.render(this.root);
        }
    }

    setCorrectPages(limit: number) {
        this.maxPage = Math.trunc(cartList.getLength() / limit) + (cartList.getLength() % limit == 0 ? 0 : 1);
    }
}
