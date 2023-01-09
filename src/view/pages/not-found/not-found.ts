import { iComponent } from '../../components/component';
import './style.scss';
import Constructor from '../../../model/html-constructor';
import { components } from '../../../model/comp-factory';

export class NotFound implements iComponent {
    render(root: HTMLElement) {
        const $header = document.createElement('header');
        const $footer = document.createElement('footer');

        const main = new Constructor('main', 'main-404').create();
        const text = new Constructor('h2', 'main-404__text', 'Sorry, page not found').create();
        const backbtn = new Constructor('button', 'main-404__btn', 'Back').create();
        main.append(text, backbtn);

        backbtn.addEventListener('click', () => {
            history.back();
        });

        components.getHeader().render($header);
        components.getFooter().render($footer);

        root.append($header, main, $footer);
    }
}
