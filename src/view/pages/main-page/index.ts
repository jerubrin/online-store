import './style.scss';
import { iComponent } from '../../components/component';
import { QueryParams } from '../../entyties';
import { components } from '../../../model/comp-factory';
import Constructor from '../../../model/html-constructor';

export class MainShopPage implements iComponent {
    render(root: HTMLElement, params?: QueryParams) {
        const $header = document.createElement('header');
        const $main = document.createElement('main');
        $main.className = 'main';

        const $filter = new Constructor('aside', 'filter').create();
        components.getFilter().render($filter, params);

        const $cardList = document.createElement('section');
        $cardList.className = 'card-list';
        const $footer = document.createElement('footer');

        components.getHeader().render($header);

        components.getCardList().render($cardList);
        components.getFooter().render($footer);

        const $mainSection = new Constructor('div', 'main-right').create();
        const $sortContainer = new Constructor('div', 'sort-container').create();
        components.getSortContainer().render($sortContainer);

        $mainSection.append($sortContainer, $cardList);
        $main.append($filter, $mainSection);
        root.append($header, $main, $footer);

        console.log('CardList rendered! Params:', params);
    }
}
