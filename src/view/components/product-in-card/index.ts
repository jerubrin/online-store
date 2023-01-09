import './style.scss';
import { iComponent } from '../component';
import { CartItem } from '../../../model/model';
import Constructor from '../../../model/html-constructor';
import { components } from '../../../model/comp-factory';
import * as cartList from '../../pages/cart/cart.funcs';
import { goToProduct } from '../../../controller/routing';

export class ProductInCart implements iComponent {
    constructor(private index: number, private data?: CartItem) {}
    stock = 0;

    render(root: HTMLElement) {
        const $item__number = new Constructor('h2', 'item__number').create();
        $item__number.textContent = this.index.toString();

        const $item__img = new Constructor('div', 'item__img').create();
        if (this.data?.product.images)
            $item__img.style.backgroundImage = `url(${
                this.data.product.thumbnail ?? this.data.product.images[0] ?? ''
            })`;

        const $item__infoBlock = new Constructor('div', 'item__info-block').create();
        const $item__title = new Constructor('p', 'item__title').create();
        if (this.data?.product.title) $item__title.textContent = this.data.product.title;
        const $item__description = new Constructor('p', 'item__description').create();
        if (this.data?.product.description) $item__description.textContent = this.data.product.description;
        const $item__brandCategory = new Constructor('p', 'item__brand-category').create();
        const $item__brand = new Constructor('p', 'item__brand').create();
        if (this.data?.product.brand) $item__brand.textContent = this.data.product.brand;
        const $item__category = new Constructor('p', 'item__category').create();
        if (this.data?.product.category) $item__category.textContent = this.data.product.category;
        $item__brandCategory.append($item__brand, $item__category);
        const $item__ratingDiscount = new Constructor('div', 'item__rating-discount').create();
        const $item__rating = new Constructor('p', 'item__rating').create();
        if (this.data?.product.rating) $item__rating.textContent = 'Rating: ' + this.data.product.rating.toString();
        const $item__discount = new Constructor('p', 'item__discount').create();
        if (this.data?.product.discountPercentage)
            $item__discount.textContent = 'Discount: ' + this.data.product.discountPercentage.toString() + '%';
        $item__ratingDiscount.append($item__rating, $item__discount);
        $item__infoBlock.append($item__title, $item__brandCategory, $item__description, $item__ratingDiscount);

        const $item__countBlock = new Constructor('div', 'item__count-block').create();
        const $item__stock = new Constructor('p', 'item__stock').create();
        if (this.data?.product.stock) {
            this.stock = this.data.product.stock;
            $item__stock.textContent = 'Stock: ' + this.data.product.stock.toString();
        }

        const $item__controlBlock = new Constructor('div', 'item__control-block').create();
        const $item__minusButton = new Constructor('button', 'item__minus-button').create();
        const $item__count = new Constructor('p', 'item__count').create();
        if (this.data?.product.price) $item__count.textContent = this.data.count.toString();
        const $item__plusButton = new Constructor('button', 'item__plus-button').create();
        $item__controlBlock.append($item__minusButton, $item__count, $item__plusButton);

        const $item__price = new Constructor('div', 'item__price').create();
        if (this.data?.product.price) $item__price.textContent = (this.data.product.price * this.data.count).toString();
        $item__countBlock.append($item__stock, $item__controlBlock, $item__price);

        root.append($item__number, $item__img, $item__infoBlock, $item__countBlock);

        // Handlers
        $item__minusButton.onclick = () => {
            if (this.data && this.data?.count > 1) {
                cartList.decCount(this.data.product.id);
            } else {
                cartList.deleteFromCart(this.data?.product.id);
            }
            components.getCart().rerender();
        };

        $item__plusButton.onclick = () => {
            if (this.data && this.data.count < this.data.product.stock) {
                cartList.incCount(this.data.product.id);
                components.getCart().rerender();
            }
        };

        root.onclick = (event: Event) => {
            if (event.target == $item__minusButton || event.target == $item__plusButton) {
                return;
            }
            if (this.data) {
                goToProduct(this.data.product.id);
            }
        };
    }
}
