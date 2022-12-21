import './style.scss';
import { iComponent } from '../component';
import { iCartData } from '../../../model/model';
import { components } from '../../../model/comp-factory';
import { QueryParams } from '../../entyties';
import { getProducts } from '../../../controller/controller';
import Constructor from '../../../model/html-constructor';
import products from '../../../model/products.json';
import { List } from '../../entyties';
const optionsArr = ['По алфавиту', 'По цене - высокая', 'По цене - низкая'];
export class CardList implements iComponent {
    getObjBrand() {
        const obj: List<number> = products.reduce((accum: List<number>, product) => {
            accum[product.brand] = (accum[product.brand] || 0) + 1;
            return accum;
        }, {});
        return obj;
    }

    getObjCategory() {
        const obj: List<number> = products.reduce((accum: List<number>, product) => {
            accum[product.category] = (accum[product.category] || 0) + 1;
            return accum;
        }, {});
        return obj;
    }

    removeList(div: HTMLElement) {
        div.innerHTML = '';
    }

    render(root: HTMLElement, params?: QueryParams) {
        let cardClassList = false;
        const $filter = new Constructor('aside', 'filter').create();
        setTimeout(() => {
            const $main = document.querySelector('.main');
            components.getFilter().render($filter);
            $main?.prepend($filter);
        }, 500);
        const brandFilter = new Constructor('div', 'filter__brand').create();
        const categoryFilter = new Constructor('div', 'filter__brand').create();

        const objBrands = this.getObjBrand();
        const checkboxesBrand: HTMLFormElement[] = [];
        function drawBrands() {
            for (const brand in objBrands) {
                const label = new Constructor(
                    'label',
                    'filter__brand__label',
                    `${brand} (${objBrands[brand] as number})`
                ).create();
                const checkBox = new Constructor('input', 'filter__brand__check').create() as HTMLFormElement;
                checkBox.type = 'checkbox';
                checkBox.value = brand;
                label.prepend(checkBox);
                brandFilter.append(label);
                checkboxesBrand.push(checkBox);
            }
        }
        drawBrands();

        const objCategories = this.getObjCategory();
        const checkboxesCategory: HTMLFormElement[] = [];
        function drawCategory() {
            for (const category in objCategories) {
                const label = new Constructor(
                    'label',
                    'filter__brand__label',
                    `${category} (${objCategories[category] as number})`
                ).create();
                const checkBox = new Constructor('input', 'filter__brand__check').create() as HTMLFormElement;
                checkBox.type = 'checkbox';
                checkBox.value = category;
                label.prepend(checkBox);
                categoryFilter.append(label);
                checkboxesCategory.push(checkBox);
            }
        }
        drawCategory();

        const brandText = new Constructor('p', 'filter__header', 'Brands :').create();
        const categoryText = new Constructor('p', 'filter__header', 'Categoryes :').create();
        $filter.append(brandText, brandFilter, categoryText, categoryFilter);

        const $cardConteiner = new Constructor('div', 'card-conteiner').create();

        let loadedData: iCartData[] = getProducts(params);

        const totalItems = new Constructor('div', 'sort-conteiner__total').create();

        const searhInput = new Constructor('input', 'sort-conteiner__search').create() as HTMLFormElement;
        searhInput.placeholder = 'Search...';

        searhInput.addEventListener('input', () => {
            loadedData = products.filter((data) => {
                const searchValue = searhInput.value as string;
                return (
                    data.brand?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                    data.category?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                    data.description?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                    data.title?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
                );
            });
            this.removeList($cardConteiner);
            draw();
        });

        function draw() {
            loadedData.forEach((element) => {
                const $card = document.createElement('div');
                cardClassList ? ($card.className = 'card-list-elem') : ($card.className = 'card');
                components.getCard(element).render($card);
                $cardConteiner.append($card);
            });
            const totalFound = loadedData.length;
            totalItems.textContent = `Found : ${totalFound}`;
        }

        const $sortConteiner = new Constructor('div', 'sort-conteiner').create();

        const $select = document.createElement('select');
        const $option = document.createElement('option');
        $option.textContent = 'Сортировать по:';
        $select.append($option);

        optionsArr.forEach((item: string) => {
            const $option = document.createElement('option');
            $option.textContent = item;
            $select.append($option);
        });

        $select.addEventListener('change', () => {
            if ($select.value === 'По алфавиту') {
                loadedData.sort((item1, item2) => {
                    return item1.title.localeCompare(item2.title);
                });
            }
            if ($select.value === 'По цене - высокая') {
                loadedData.sort((item1, item2) => item2.price - item1.price);
            }
            if ($select.value === 'По цене - низкая') {
                loadedData.sort((item1, item2) => item1.price - item2.price);
            }
            this.removeList($cardConteiner);
            draw();
        });

        const $btnsBlock = new Constructor('div', 'btn-block').create();
        const btnList = new Constructor('button', 'btn-block__btn', 'Списком').create();
        btnList.addEventListener('click', () => {
            cardClassList = true;
            $cardConteiner.classList.add('sort-conteiner-list');
            this.removeList($cardConteiner);
            draw();
        });

        const btnImage = new Constructor('button', 'btn-block__btn', 'Плиткой').create();
        btnImage.addEventListener('click', () => {
            cardClassList = false;
            $cardConteiner.classList.remove('sort-conteiner-list');
            this.removeList($cardConteiner);
            draw();
        });

        let sumOfBrands: iCartData[] = [];
        let sumOfCategory: iCartData[] = [];
        let checkCountBrands = 0;
        let checkCountCategory = 0;
        checkboxesBrand.forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
                checkboxesBrand.forEach((item) => {
                    if (item.checked) {
                        checkCountBrands++;
                        sumOfBrands = sumOfBrands.concat(products.filter((product) => product.brand === item.value));
                    }
                });
                checkboxesCategory.forEach((item) => {
                    if (item.checked) {
                        checkCountCategory++;
                        sumOfCategory = sumOfCategory.concat(
                            sumOfBrands.filter((product) => product.category === item.value)
                        );
                        if (sumOfBrands.length === 0) {
                            sumOfCategory = sumOfCategory.concat(
                                products.filter((product) => product.category === item.value)
                            );
                        }
                    }
                });
                checkCountCategory !== 0 ? (sumOfBrands = [...sumOfCategory]) : (loadedData = [...sumOfBrands]);
                checkCountBrands === 0 && checkCountCategory === 0
                    ? (loadedData = [...products])
                    : (loadedData = [...sumOfBrands]);
                sumOfBrands = [];
                sumOfCategory = [];
                checkCountBrands = 0;
                checkCountCategory = 0;
                this.removeList($cardConteiner);
                draw();
            });
        });

        checkboxesCategory.forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
                checkboxesCategory.forEach((item) => {
                    if (item.checked) {
                        checkCountCategory++;
                        sumOfBrands = sumOfBrands.concat(products.filter((product) => product.category === item.value));
                    }
                });

                checkboxesBrand.forEach((item) => {
                    if (item.checked) {
                        checkCountBrands++;
                        sumOfCategory = sumOfCategory.concat(
                            sumOfBrands.filter((product) => product.brand === item.value)
                        );
                        if (sumOfBrands.length === 0) {
                            sumOfCategory = sumOfCategory.concat(
                                products.filter((product) => product.brand === item.value)
                            );
                        }
                    }
                });
                checkCountBrands !== 0 ? (sumOfBrands = [...sumOfCategory]) : (loadedData = [...sumOfBrands]);
                checkCountBrands === 0 && checkCountCategory === 0
                    ? (loadedData = [...products])
                    : (loadedData = [...sumOfBrands]);
                sumOfBrands = [];
                sumOfCategory = [];
                checkCountCategory = 0;
                checkCountBrands = 0;
                this.removeList($cardConteiner);
                draw();
            });
        });

        $btnsBlock.append(btnList, btnImage);

        $sortConteiner.append($select, totalItems, searhInput, $btnsBlock);
        root.append($sortConteiner, $cardConteiner);
        draw();
    }
}
