import './style.scss';
import { iComponent } from '../component';

export class Filter implements iComponent {
    render(root: HTMLElement) {
        const $block1 = document.createElement('div');

        $block1.textContent = 'Filter';

        root.append($block1);
    }
}
