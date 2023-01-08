import './style.scss';
import { iComponent } from '../component';
import Constructor from '../../../model/html-constructor';
import { getQueryParams, setParams } from '../../../controller/routing';
import { components } from '../../../model/comp-factory';
import { sortingParams } from '../../entyties';

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
                const filter = components.getFilter();
                if (filter.root) {
                    filter.render(filter.root);
                }
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
            // localStorage.setItem(storageNames.sortBy, $select.value);
            if ($select.value === 'Sort by: default') {
                setParams({ sorting: sortingParams.def });
                cardList.setSortFunction(null);
            }
            if ($select.value === sortingParams.alphabetFovard) {
                setParams({ sorting: sortingParams.alphabetFovard });
                cardList.setSortFunction((a, b) => {
                    return a.title.localeCompare(b.title);
                });
            }
            if ($select.value === sortingParams.alphabetBack) {
                setParams({ sorting: sortingParams.alphabetBack });
                cardList.setSortFunction((a, b) => {
                    return b.title.localeCompare(a.title);
                });
            }
            if ($select.value === sortingParams.priceMaxMin) {
                setParams({ sorting: sortingParams.priceMaxMin });
                cardList.setSortFunction((a, b) => b.price - a.price);
            }
            if ($select.value === sortingParams.priceMinMax) {
                setParams({ sorting: sortingParams.priceMinMax });
                cardList.setSortFunction((a, b) => a.price - b.price);
            }
            if (cardList.root) {
                cardList.render(cardList.root);
            }
        };

        const selectValue = params.sorting;
        Object.values(sortingParams).forEach((item: string) => {
            if (item == sortingParams.def) return;
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
        const btnImage = new Constructor('button', 'btn-block__btn', 'Tile').create();

        const changeListView = (isList: boolean) => {
            const cardList = components.getCardList();
            cardList.cardClassList = isList;
            if (isList) {
                btnList.classList.add('btn-block__btn-checked');
                btnImage.classList.remove('btn-block__btn-checked');
            } else {
                btnList.classList.remove('btn-block__btn-checked');
                btnImage.classList.add('btn-block__btn-checked');
            }
            if (cardList.root) {
                cardList.render(cardList?.root);
            }
            if (cardList.root) {
                cardList.render(cardList?.root);
            }

            // const modal = new modalWindow().render();
            // console.log(modal);
        };

        btnList.addEventListener('click', () => {
            setParams({ list: 'true' });
            changeListView(true);
        });

        btnImage.addEventListener('click', () => {
            setParams({ list: '' });
            changeListView(false);
        });

        changeListView(params.list == 'true');

        $btnsBlock.append(btnList, btnImage);

        $sortConteiner.append($select, this.totalItems, searhInput, $btnsBlock);
        root.append($sortConteiner);
    }
}
