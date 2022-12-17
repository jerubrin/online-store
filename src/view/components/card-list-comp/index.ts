import './style.scss';
import { iComponent } from '../component';

export class CardList implements iComponent {
    render(root: HTMLElement) {
        const $block1 = document.createElement('div');

        $block1.textContent = 'CardList';

        root.append($block1);
    }
}
