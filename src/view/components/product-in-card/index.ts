import './style.scss';
import { iComponent } from '../component';
import { iCartData } from '../../../model/model';
import Constructor from '../../../model/html-constructor';

export class ProductInCart implements iComponent {
    constructor(private data: iCartData) {}

    render(root: HTMLElement) {
        const btnsText = new Constructor('p', 'card__text').create();
        if (this.data.title) btnsText.textContent = this.data.title;

        const $mainPicture = new Constructor('div', 'card__img').create();
        if (this.data.images) $mainPicture.style.backgroundImage = `url(${this.data.images[0] ?? ''})`;

        const $price = new Constructor('div', 'card__price').create();
        if (this.data.price) $price.textContent = this.data.price.toString();

        root.append(btnsText, $mainPicture, $price);
    }
}
