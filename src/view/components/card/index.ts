import './style.scss';
import { iComponent } from '../component';
import { iCartData } from '../../../model/model';

export class Card implements iComponent {
    constructor(private data: iCartData) {}

    render(root: HTMLElement) {
        const $block1 = document.createElement('div');

        $block1.textContent = JSON.stringify(this.data);

        root.append($block1);
    }
}
