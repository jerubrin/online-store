import './style.scss';
import { iComponent } from '../../components/component';
import { components } from '../../../model/comp-factory';
import Constructor from '../../../model/html-constructor';

export class MainShopPage implements iComponent {
    render(root: HTMLElement) {
        const $header = document.createElement('header');
        const $main = document.createElement('main');
        $main.className = 'main';

        const $filter = new Constructor('aside', 'filter').create();
        components.getFilter().render($filter);

        const $cardList = document.createElement('section');
        $cardList.className = 'card-list';
        const $footer = document.createElement('footer');

        const $mainSection = new Constructor('div', 'main-right').create();
        const $sortContainer = new Constructor('div', 'sort-container').create();
        components.getSortContainer().render($sortContainer);

        components.getHeader().render($header);

        components.getCardList().render($cardList);
        components.getFooter().render($footer);

        $mainSection.append($sortContainer, $cardList);

        const $filterShowButton = new Constructor('div', 'main__button-show').create();
        $filterShowButton.onclick = () => {
            $filter.classList.toggle('filter_show');
            $filterShowButton.classList.toggle('main__button-show_showed');
        };

        $main.append($filter, $filterShowButton, $mainSection);
        root.append($header, $main, $footer);
    }
}
