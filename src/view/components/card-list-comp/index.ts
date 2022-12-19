import './style.scss';
import { iComponent } from '../component';
import { getProducts } from '../../../controller/controller';
import { QueryParams } from '../../entyties';

export class CardList implements iComponent {
    render(root: HTMLElement, params?: QueryParams) {
        const $block1 = document.createElement('div');

        $block1.textContent = 'CardList';
        const cards = getProducts(params);
        console.log(cards);

        root.append($block1);
    }
}
