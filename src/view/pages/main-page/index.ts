import './style.scss';
import { iComponent } from '../../components/component';
import { components } from '../../../model/comp-factory';
import Constructor from '../../../model/html-constructor';
import { getQueryParams, setParams } from '../../../controller/routing';
import { QueryParams } from '../../entyties';

export class MainShopPage implements iComponent {
    private root?: HTMLElement;

    render(root: HTMLElement) {
        setParams({ ['id']: '', ['page']: '' });
        this.root = root;
        const params = getQueryParams();
        this.checkParams(params);
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

    rerender() {
        if (this.root) {
            this.root.innerHTML = '';
            this.render(this.root);
        }
    }

    private checkParams(params: QueryParams) {
        if (params.maxprice && isNaN(params.maxprice)) {
            setParams({ maxprice: -1 });
        }
        if (params.minprice && isNaN(params.minprice)) {
            setParams({ minprice: -1 });
        }
        if (params.maxstock && isNaN(params.maxstock)) {
            setParams({ maxstock: -1 });
        }
        if (params.minstock && isNaN(params.minstock)) {
            setParams({ minstock: -1 });
        }
    }
}
