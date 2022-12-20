import './style.scss';
import { iComponent } from '../component';
import { iCartData } from '../../../model/model';

export class Card implements iComponent {
    constructor(private data: iCartData) {}

    render(root: HTMLElement) {
        const $block1 = document.createElement('div');
        if (this.data.images) root.style.backgroundImage = `url(${this.data.images[0] ?? ''})`;
        if (this.data.title) root.textContent = this.data.title;

        root.append($block1);
    }
}
