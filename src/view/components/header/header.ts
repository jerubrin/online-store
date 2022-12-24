import './style.scss';
import { iComponent } from '../component';
export class Header implements iComponent {
    render(root: HTMLElement) {
        const $block1 = document.createElement('div');
        $block1.classList.add('header', 'wrapper');

        const $logoBlock = document.createElement('div');
        $logoBlock.className = 'header__logo-cont';

        const $logoText = document.createElement('p');
        $logoText.textContent = 'Online Store';

        const $mainLogo = document.createElement('img');
        $mainLogo.setAttribute('alt', 'logo');
        $mainLogo.src = '../../../assets/favicon/icon.png';

        const $totalPrice = document.createElement('div');
        $totalPrice.className = 'header__basket-cont__total-price';
        $totalPrice.textContent = `Total price : 0 $`;

        const $basketBlock = document.createElement('div');
        $basketBlock.className = 'header__basket-cont';

        const $basket = document.createElement('img');
        $basket.setAttribute('alt', 'basket');
        $basket.src = '../../../assets/favicon/icon.png';

        const $itemsCount = document.createElement('p');
        $itemsCount.textContent = '0';
        $itemsCount.className = 'header__basket-cont_items';

        $basketBlock.append($basket, $itemsCount);
        $logoBlock.append($mainLogo, $logoText);
        $block1.append($logoBlock, $totalPrice, $basketBlock);
        root.append($block1);
    }
}
