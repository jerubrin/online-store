import './style.scss';
import { iComponent } from '../component';

export class Footer implements iComponent {
    render(root: HTMLElement) {
        const $block1 = document.createElement('div');
        $block1.classList.add('footer', 'wrapper');

        const $linksBlock = document.createElement('div');
        $linksBlock.className = 'footer__links-block';

        const $design = document.createElement('p');
        $design.textContent = 'Designed for RsSchool 2022';

        $block1.append($linksBlock, $design);
        root.append($block1);
    }
}
