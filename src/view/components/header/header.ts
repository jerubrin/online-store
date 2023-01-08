import './style.scss';
import { iComponent } from '../component';
import { goToCart, goToMain } from '../../../controller/routing';
import * as cartList from '../../pages/cart/cart.funcs';
import * as promos from '../../pages/cart/promos';
export class Header implements iComponent {
    private $totalPrice?: HTMLElement;
    private $itemsCount?: HTMLElement;

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
        $totalPrice.className = 'header__total-price';
        $totalPrice.textContent = `Total price : 0 $`;
        this.$totalPrice = $totalPrice;

        const $basketBlock = document.createElement('a');
        $basketBlock.className = 'header__basket-cont basket-cont';
        $basketBlock.onclick = () => goToCart(false);

        const $basket = document.createElement('div');
        $basket.className = 'basket-cont__basket-img';
        $basket.setAttribute('alt', 'basket');

        const $itemsCount = document.createElement('p');
        $itemsCount.textContent = '0';
        $itemsCount.className = 'basket-cont__items';
        this.$itemsCount = $itemsCount;

        $basketBlock.append($basket, $itemsCount);
        $logoBlock.append($mainLogo, $logoText);
        $block1.append($logoBlock, $totalPrice, $basketBlock);
        root.append($block1);
    }

    public refreshData() {
        if (this.$totalPrice && this.$itemsCount) {
            this.$totalPrice.textContent = `Total price : ${promos.getNewPrice(cartList.getTotalPrice())} $`;
            this.$itemsCount.textContent = cartList.getTotalProducts().toString();
        }
    }
}
