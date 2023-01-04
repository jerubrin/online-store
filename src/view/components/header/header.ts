import './style.scss';
import { iComponent } from '../component';
import { goToCart, goToMain } from '../../../controller/routing';
export class Header implements iComponent {
    render(root: HTMLElement) {
        const $block1 = document.createElement('div');
        $block1.classList.add('header', 'wrapper');

        const $logoBlock = document.createElement('a');
        $logoBlock.className = 'header__logo-cont';
        $logoBlock.onclick = goToMain;

        const $logoText = document.createElement('h1');
        $logoText.textContent = 'Online Store';

        const $mainLogo = document.createElement('div');
        $mainLogo.className = 'header__logo-img';

        const $totalPrice = document.createElement('div');
        $totalPrice.className = 'header__basket-cont__total-price';
        $totalPrice.textContent = `Total price : 0 $`;

        const $basketBlock = document.createElement('a');
        $basketBlock.className = 'header__basket-cont';
        $basketBlock.onclick = goToCart;

        const $basket = document.createElement('div');
        $basket.className = 'header__basket-img';
        $basket.setAttribute('alt', 'basket');

        const $itemsCount = document.createElement('p');
        $itemsCount.textContent = '0';
        $itemsCount.className = 'header__basket-cont_items';

        $basketBlock.append($basket, $itemsCount);
        $logoBlock.append($mainLogo, $logoText);
        $block1.append($logoBlock, $totalPrice, $basketBlock);
        root.append($block1);
    }
}
