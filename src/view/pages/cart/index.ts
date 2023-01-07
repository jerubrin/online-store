import './style.scss';
import { iComponent } from '../../components/component';
import Constructor from '../../../model/html-constructor';
import { components } from '../../../model/comp-factory';
import * as cartList from '../../pages/cart/cart.funcs';
import { ProductInCart } from '../../components/product-in-card';
import * as promos from './promos';
import { modalWindow } from '../../components/modal-window';

export class Cart implements iComponent {
    currentPage = 1;
    maxPage = 1;
    limit = 4;
    root?: HTMLElement;
    promoInText = '';

    render(root: HTMLElement) {
        this.root = root;
        cartList.loadData();
        const $header = document.createElement('header');
        const $footer = document.createElement('footer');
        const $main = new Constructor('main', 'cart').create();

        if (cartList.getTotalProducts() > 0) {
            const $products = new Constructor('div', 'products').create();

            // Title
            const $products__top = new Constructor('div', 'products__top top').create();

            const $top__title = new Constructor('div', 'top__title', 'Products In Cart').create();

            const $top__limit = new Constructor('h2', 'top__limit').create();
            const $top__limitTitle = new Constructor('h3', 'top__limit-title', 'Limit:').create();
            const $top__limitInput = new Constructor('input', 'top__input').create();
            $top__limitInput.setAttribute('type', 'number');

            ($top__limitInput as HTMLInputElement).value = this.limit.toString();
            $top__limitInput.setAttribute('min', '1');
            $top__limitInput.setAttribute('max', cartList.getLength().toString());
            $top__limit.append($top__limitTitle, $top__limitInput);

            this.setCorrectPages(+($top__limitInput as HTMLInputElement).value);

            const $top__page = new Constructor('div', 'top__page').create();
            const $top__pageTitle = new Constructor('div', 'top__page-title', 'Page:').create();
            const $top__pagePrev = new Constructor('button', 'top__page-prev').create();
            const $top__pageNumber = new Constructor('div', 'top__page-number', this.currentPage.toString()).create();
            const $top__pageNext = new Constructor('button', 'top__page-next').create();
            $top__page.append($top__pageTitle, $top__pagePrev, $top__pageNumber, $top__pageNext);

            $products__top.append($top__title, $top__limit, $top__page);

            // List
            const $products__list = new Constructor('div', 'products__list').create();
            // TODO: Paging
            const products = cartList.getListByPage(this.currentPage, this.limit);
            for (let i = 0; i < products.length; i++) {
                const $curProduct = new Constructor('div', 'products__item item').create();
                const index = (this.currentPage - 1) * this.limit + i + 1;
                new ProductInCart(index, products[i]).render($curProduct);
                $products__list.append($curProduct);
            }

            $products.append($products__top, $products__list);

            // Summary
            const $summary = new Constructor('div', 'summary').create();
            const $summary__title = new Constructor('div', 'summary__title', 'Summary').create();

            const $summary__content = new Constructor('div', 'summary__content').create();

            const $summary__products = new Constructor('div', 'summary__products').create();
            const $summary__productsTitle = new Constructor('div', 'summary__info-title', 'Products:').create();
            const $summary__productsNumber = new Constructor(
                'div',
                'summary__info-number',
                cartList.getTotalProducts().toString()
            ).create();
            $summary__products.append($summary__productsTitle, $summary__productsNumber);

            const $summary__price = new Constructor('div', 'summary__price').create();
            const $summary__priceTitle = new Constructor('div', 'summary__info-title', 'Total:').create();
            const $summary__priceNumber = new Constructor(
                'div',
                'summary__info-number',
                '$ ' + cartList.getTotalPrice().toString()
            ).create();
            $summary__price.append($summary__priceTitle, $summary__priceNumber);

            // Promo
            const $summary__NewPrice = new Constructor('div', 'summary__price').create();
            const $summary__promo = new Constructor('div', 'summary__promo promo').create();
            const $promo__applyed = new Constructor('div', 'promo__applyed').create();
            const $promo__input = new Constructor('input', 'promo__input').create() as HTMLInputElement;
            $promo__input.value = this.promoInText;
            $promo__input.setAttribute('placeholder', 'Enter promo code');
            const $promo__toAdd = new Constructor('div', 'promo__to-add display-none').create();
            const $promo__toAddTitle = new Constructor('div', 'promo__to-add-title').create();
            const $promo__toAddButton = new Constructor('button', 'promo__to-add-button', 'add').create();
            $promo__toAdd.append($promo__toAddTitle, $promo__toAddButton);

            if (promos.getPromoLength() > 0) {
                const $summary__NewPriceTitle = new Constructor('div', 'summary__info-title', 'Total:').create();
                const $summary__NewPriceNumber = new Constructor(
                    'div',
                    'summary__info-number',
                    '$ ' + promos.getNewPrice(cartList.getTotalPrice()).toString()
                ).create();
                $summary__NewPrice.append($summary__NewPriceTitle, $summary__NewPriceNumber);
                $summary__price.classList.add('summary__old-price');
                const allPromos = promos.getAllPromos();
                for (let i = 0; i < allPromos.length; i++) {
                    const $promo__item = new Constructor('p', 'promo__item').create();
                    const $promo__itemTitle = new Constructor('p', 'promo__item-title', allPromos[i]?.title).create();
                    const $promo__itemButton = new Constructor('button', 'promo__item-button', 'Drop').create();
                    const product = allPromos[i];
                    $promo__itemButton.onclick = () => {
                        promos.removePromo(product);
                        this.rerender();
                    };
                    $promo__item.append($promo__itemTitle, $promo__itemButton);
                    $promo__applyed.append($promo__item);
                }
            } else {
                $summary__NewPrice.classList.add('display-none');
            }

            const $promo__help = new Constructor('p', 'promo__help', 'Promo for test: "RS", "EPAM"').create();

            $summary__promo.append($promo__applyed, $promo__input, $promo__toAdd, $promo__help);

            const $summary__buyButton = new Constructor('button', 'summary__buy-button', 'Buy now').create();

            $summary__content.append($summary__products, $summary__price, $summary__NewPrice, $summary__promo);

            $summary.append($summary__title, $summary__content, $summary__buyButton);

            $main.append($products, $summary);

            //Handlers
            $top__pagePrev.onclick = () => {
                this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : this.currentPage;
                this.rerender();
            };
            $top__pageNext.onclick = () => {
                this.currentPage = this.currentPage < this.maxPage ? this.currentPage + 1 : this.currentPage;
                this.rerender();
            };
            $top__limitInput.onchange = () => {
                this.limit = +($top__limitInput as HTMLInputElement).value;
                this.rerender();
            };
            const inputHandler = () => {
                this.promoInText = $promo__input.value;
                const promo = promos.findPromo($promo__input.value);
                if (promo) {
                    $promo__toAdd.classList.remove('display-none');
                    $promo__toAddTitle.textContent = promo.title;
                    if (promos.hasPromo(promo)) {
                        $promo__toAddButton.classList.add('display-none');
                    } else {
                        $promo__toAddButton.classList.remove('display-none');
                        $promo__toAddButton.onclick = () => {
                            $promo__toAddButton.classList.add('display-none');
                            promos.addPromo(promo);
                            this.rerender();
                            $promo__input.focus({ preventScroll: true });
                        };
                    }
                    this.setCorrectPages(this.limit);
                } else {
                    $promo__toAdd.classList.add('display-none');
                }
            };
            inputHandler();
            $promo__input.oninput = inputHandler;
            $summary__buyButton.onclick = () => new modalWindow().render();
        } else {
            // Empty Cart
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
        if (this.currentPage > this.maxPage) {
            this.currentPage = this.maxPage;
        }
    }
}
