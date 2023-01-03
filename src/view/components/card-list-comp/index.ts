import './style.scss';
import { iComponent } from '../component';
import { iCartData } from '../../../model/model';
import { components } from '../../../model/comp-factory';
import { getProducts } from '../../../controller/controller';
import Constructor from '../../../model/html-constructor';
import { getQueryParams } from '../../../controller/routing';

export class CardList implements iComponent {
    root?: HTMLElement;
    loadedData?: iCartData[];
    cardClassList = false;

    render(root: HTMLElement) {
        const params = getQueryParams();
        console.log('render(root: HTMLElement, params?: QueryParams)', params);
        root.innerHTML = '';
        this.root = root;

        this.loadedData = getProducts(params);

        const $cardConteiner = new Constructor('div', 'card-conteiner').create();
        if (this.cardClassList) $cardConteiner.classList.add('sort-conteiner-list');

        this.loadedData?.forEach((element) => {
            const $card = document.createElement('div');
            this.cardClassList ? ($card.className = 'card-list-elem') : ($card.className = 'card');
            components.getCard(element).render($card);
            $cardConteiner.append($card);
        });
        const totalItems = components.getSortContainer().totalItems;
        if (totalItems) {
            totalItems.textContent = `Found : ${this.loadedData?.length ?? 0}`;
        }
        root.append($cardConteiner);
    }

    removeList(div: HTMLElement) {
        div.innerHTML = '';
        components.getFilter().arrWithRanges.forEach((item) => item.conteiner.remove());
    }
}
