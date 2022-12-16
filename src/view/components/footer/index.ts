import './style.scss';
import { iComponent } from '../component';

export class Footer implements iComponent {
    render(root: HTMLElement) {
        const $block1 = document.createElement('div');

        $block1.textContent = 'Footer';

        root.append($block1);
    }
}
