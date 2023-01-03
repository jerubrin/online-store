import './style.scss';
import { iComponent } from '../component';
import Constructor from '../../../model/html-constructor';
import { setParams } from '../../../controller/routing';
import { components } from '../../../model/comp-factory';
import { modalWindow } from '../modal-window';

const optionsArr = ['Alphabet', 'Max-Price', 'Min-Price'];

export class SortContainer implements iComponent {
    totalItems?: HTMLElement;
    render(root: HTMLElement) {
        this.totalItems = new Constructor('div', 'sort-conteiner__total').create();
        const searhInput = new Constructor('input', 'sort-conteiner__search').create() as HTMLInputElement;
        searhInput.placeholder = 'Search...';
        searhInput.addEventListener('input', () => {
            setParams({ search: searhInput.value });
            // const newLocal = loadedData = getProducts(params);
            // this.removeList($cardConteiner);
            const cardList = components.getCardList();
            if (cardList.root) {
                cardList.render(cardList?.root);
            }
        });

        const $sortConteiner = new Constructor('div', 'sort-conteiner').create();

        const $select = document.createElement('select');
        $select.className = 'sort-conteiner__select';
        const $option = document.createElement('option');
        $option.textContent = 'Sort by:';
        $select.append($option);

        optionsArr.forEach((item: string) => {
            const $option = document.createElement('option');
            $option.textContent = item;
            $select.append($option);
        });

        $select.addEventListener('change', () => {
            const cardList = components.getCardList();
            if ($select.value === 'Alphabet') {
                cardList.loadedData?.sort((a, b) => {
                    return a.title.localeCompare(b.title);
                });
            }
            if ($select.value === 'Max-Price') {
                cardList.loadedData?.sort((a, b) => a.price - b.price);
            }
            if ($select.value === 'Min-Price') {
                cardList.loadedData?.sort((a, b) => a.price - b.price);
            }
            if (cardList.root) {
                cardList.render(cardList?.root);
            }
        });

        const $btnsBlock = new Constructor('div', 'btn-block').create();
        const btnList = new Constructor('button', 'btn-block__btn', 'List').create();
        btnList.addEventListener('click', () => {
            const cardList = components.getCardList();
            cardList.cardClassList = true;
            btnList.classList.add('btn-block__btn-checked');
            btnImage.classList.remove('btn-block__btn-checked');
            if (cardList.root) {
                cardList.render(cardList?.root);
            }
        });

        const btnImage = new Constructor('button', 'btn-block__btn', 'Tile').create();
        btnImage.classList.add('btn-block__btn-checked');
        btnImage.addEventListener('click', () => {
            const cardList = components.getCardList();
            const modal = new modalWindow().render();
            console.log(modal);
            btnList.classList.remove('btn-block__btn-checked');
            btnImage.classList.add('btn-block__btn-checked');
            cardList.cardClassList = false;
            if (cardList.root) {
                cardList.render(cardList?.root);
            }
        });

        // $filter.append(resetConteiner, brandText, brandFilter, categoryText, categoryFilter);

        $btnsBlock.append(btnList, btnImage);

        $sortConteiner.append($select, this.totalItems, searhInput, $btnsBlock);
        root.append($sortConteiner);
    }
}
