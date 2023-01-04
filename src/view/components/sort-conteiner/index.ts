import './style.scss';
import { iComponent } from '../component';
import Constructor from '../../../model/html-constructor';
import { getQueryParams, setParams } from '../../../controller/routing';
import { components } from '../../../model/comp-factory';
import { modalWindow } from '../modal-window';
import { storageNames } from '../../../model/local-storage-enum';

const optionsArr = ['Alphabet', 'Max-Price', 'Min-Price'];

export class SortContainer implements iComponent {
    totalItems?: HTMLElement;
    render(root: HTMLElement) {
        const params = getQueryParams();
        this.totalItems = new Constructor('div', 'sort-conteiner__total').create();
        const searhInput = new Constructor('input', 'sort-conteiner__search').create() as HTMLInputElement;
        searhInput.placeholder = 'Search...';
        searhInput.value = params.search ?? '';
        searhInput.addEventListener('input', () => {
            setParams({ search: searhInput.value });
            const cardList = components.getCardList();
            if (cardList.root) {
                cardList.render(cardList?.root);
            }
        });

        const $sortConteiner = new Constructor('div', 'sort-conteiner').create();

        const $select = document.createElement('select');
        $select.className = 'sort-conteiner__select';
        const $option = document.createElement('option');
        $option.textContent = 'Sort by: default';
        $select.append($option);

        const onchange = () => {
            const cardList = components.getCardList();
            localStorage.setItem(storageNames.sortBy, $select.value);
            if ($select.value === 'Sort by: default') {
                cardList.setSortFunction(null);
            }
            if ($select.value === 'Alphabet') {
                cardList.setSortFunction((a, b) => {
                    return a.title.localeCompare(b.title);
                });
            }
            if ($select.value === 'Max-Price') {
                cardList.setSortFunction((a, b) => b.price - a.price);
            }
            if ($select.value === 'Min-Price') {
                cardList.setSortFunction((a, b) => a.price - b.price);
            }
            if (cardList.root) {
                cardList.render(cardList.root);
            }
        };

        const selectValue = localStorage.getItem(storageNames.sortBy);
        optionsArr.forEach((item: string) => {
            const $option = document.createElement('option');
            $option.textContent = item;
            $select.append($option);
            if ($option.textContent == selectValue) {
                $option.selected = true;
                onchange();
            }
        });

        $select.addEventListener('change', onchange);

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
