import './style.scss';
import { iComponent } from '../component';
import { iCartData } from '../../../model/model';
import { newCart } from '../../pages/cart';
import Constructor from '../../../model/html-constructor';
import { goToProduct } from '../../../controller/routing';

export class Card implements iComponent {
    constructor(private data: iCartData) {}

    render(root: HTMLElement) {
        const btnsText = new Constructor('p', 'card__text').create();
        if (this.data.title) btnsText.textContent = this.data.title;
        const btnsBlock = new Constructor('div', 'card__btns').create();
        const detailsBtn = new Constructor('button', 'card__btns_item', 'Info').create();
        const buyBtn = new Constructor('button', 'card__btns_item', 'Add').create();
        if (this.data.addedToCart) {
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

        buyBtn.addEventListener('click', () => {
            const totalPriceDiv = document.querySelector('.header__basket-cont__total-price') as HTMLElement;
            const totalProductsDiv = document.querySelector('.header__basket-cont_items') as HTMLElement;
            this.data.addedToCart = !this.data.addedToCart;
            if (this.data.addedToCart) {
                buyBtn.classList.add('card__btns_item-checked');
                buyBtn.textContent = 'Delete';
                newCart.addToCart(this.data);
                totalPriceDiv.textContent = `Total price : ${newCart.getTotalPrice()} $`;
                totalProductsDiv.textContent = newCart.getTotalProducts().toString();
            } else {
                buyBtn.classList.remove('card__btns_item-checked');
                buyBtn.textContent = 'Add';
                newCart.deleteFromCart(this.data.id as number);
                totalPriceDiv.textContent = `Total price : ${newCart.getTotalPrice()} $`;
                totalProductsDiv.textContent = newCart.getTotalProducts().toString();
            }
        });

        btnsBlock.append(detailsBtn, buyBtn);
        root.append(btnsText, $mainPicture, $price, btnsBlock);
    }
}
