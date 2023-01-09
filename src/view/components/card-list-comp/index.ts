import './style.scss';
import { iComponent } from '../component';
import { iCartData } from '../../../model/model';
import { components } from '../../../model/comp-factory';
import { getProducts } from '../../../controller/controller';
import Constructor from '../../../model/html-constructor';
import { getQueryParams } from '../../../controller/routing';
import { SortFunction } from '../../entyties';
import { loadData } from '../../pages/cart/cart.funcs';

export class CardList implements iComponent {
    root?: HTMLElement;
    loadedData?: iCartData[];
    cardClassList = false;

    render(root: HTMLElement) {
        loadData();
        const params = getQueryParams();
        root.innerHTML = '';
        this.root = root;

        this.loadedData = getProducts(params);
        if (this.sortFunction) {
            this.loadedData.sort(this.sortFunction);
        }

        const $cardConteiner = new Constructor('div', 'card-conteiner').create();
        if (this.cardClassList) $cardConteiner.classList.add('sort-conteiner-list');

        this.loadedData?.forEach((element) => {
            const $card = document.createElement('div');
            this.cardClassList ? ($card.className = 'card-list-elem') : ($card.className = 'card');
            components.getCard(element).render($card);
            $cardConteiner.append($card);
        });
        if (!this.loadedData.length) {
            const title = 'No exact matches found!';
            const message = 'We are sorry, we could not find any product!';
            const $nothigContainer = new Constructor('div', 'zero-cards').create();
            const $picture = new Constructor('div', 'zero-cards__img').create();
            const $title = new Constructor('h1', 'zero-cards__title', title).create();
            const $message = new Constructor('p', 'zero-cards__message', message).create();

            $nothigContainer.append($picture, $title, $message);
            $cardConteiner.append($nothigContainer);
        }
        const totalItems = components.getSortContainer().totalItems;
        if (totalItems) {
            totalItems.textContent = `Found : ${this.loadedData?.length ?? 0}`;
        }
        root.append($cardConteiner);
    }

    sortFunction: SortFunction | null = null;

    setSortFunction(func: SortFunction | null) {
        this.sortFunction = func;
    }

    removeList(div: HTMLElement) {
        div.innerHTML = '';
        components.getFilter().arrWithRanges.forEach((item) => item.conteiner.remove());
    }
}
