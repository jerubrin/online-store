import './style.scss';
import { iComponent } from '../component';
import { iCartData } from '../../../model/model';
import Constructor from '../../../model/html-constructor';
import { goToProduct } from '../../../controller/routing';
import * as cartList from '../../pages/cart/cart.funcs';
import { components } from '../../../model/comp-factory';

export class Card implements iComponent {
    constructor(private data: iCartData) {}

    render(root: HTMLElement) {
        const btnsText = new Constructor('p', 'card__text').create();
        if (this.data.title) btnsText.textContent = this.data.title;
        const btnsBlock = new Constructor('div', 'card__btns').create();
        const detailsBtn = new Constructor('button', 'card__btns_item', 'Info').create();
        const buyBtn = new Constructor('button', 'card__btns_item', 'Add').create();
        if (cartList.hasItem(this.data.id)) {
            buyBtn.textContent = 'Delete';
            buyBtn.classList.add('card__btns_item-checked');
        }
        detailsBtn.addEventListener('click', () => {
            goToProduct(this.data.id);
        });

        const $mainPicture = new Constructor('div', 'card__img').create();
        if (this.data.images) $mainPicture.style.backgroundImage = `url(${this.data.images[0] ?? ''})`;

        const $price = new Constructor('div', 'card__price').create();
        if (this.data.price) $price.textContent = this.data.price.toString();

        const cartButtonHandler = () => {
            if (cartList.hasItem(this.data.id)) {
                buyBtn.classList.add('card__btns_item-checked');
                buyBtn.textContent = 'Delete';
            } else {
                buyBtn.classList.remove('card__btns_item-checked');
                buyBtn.textContent = 'Add';
            }
            components.getHeader().refreshData();
        };
        cartButtonHandler();
        buyBtn.addEventListener('click', () => {
            if (!cartList.hasItem(this.data.id)) {
                cartList.addToCart(this.data);
            } else {
                cartList.deleteFromCart(this.data.id);
            }
            cartButtonHandler();
        });

        btnsBlock.append(detailsBtn, buyBtn);
        root.append(btnsText, $mainPicture, $price, btnsBlock);
    }
}
