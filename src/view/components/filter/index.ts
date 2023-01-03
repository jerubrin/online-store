import './style.scss';
import { iComponent } from '../component';
import { iCartData } from '../../../model/model';
import Constructor from '../../../model/html-constructor';
import { ImultiRange, List, QueryParams } from '../../entyties';
import { getProducts } from '../../../controller/controller';
import products from '../../../model/products.json';
import { components } from '../../../model/comp-factory';

export class Filter implements iComponent {
    root: HTMLElement | null = null;

    getMin(data: iCartData[], min: boolean, price: boolean) {
        const arr = data.reduce((accum: number[], product) => {
            price ? accum.push(product.price) : accum.push(product.stock);
            return accum;
        }, []);
        if (data.length === 0) return 0;
        return min ? Math.min.apply(null, arr) : Math.max.apply(null, arr);
    }

    getMultiRange(name: string) {
        const conteiner = new Constructor('div', 'range-block').create();
        const valueTextBlock = new Constructor('div', 'range-block__values').create();
        const values = new Constructor('div', 'range-block__values-cont').create();
        const valuesText = new Constructor('div', 'range-block__type', name).create();
        const value1 = new Constructor('p', 'range-block__value').create();
        const value2 = new Constructor('p', 'range-block__value').create();
        const sliderCont = new Constructor('div', 'slider-cont').create();
        const sliderTrack = new Constructor('div', 'slider-track').create();
        const range1 = new Constructor('input', 'range').create() as HTMLInputElement;
        range1.type = 'range';
        const range2 = new Constructor('input', 'range').create() as HTMLInputElement;
        range2.type = 'range';
        const gap = 0;

        function slide1() {
            if (parseInt(range2.value) - parseInt(range1.value) <= gap) {
                range1.value = range2.value;
            }
            value1.textContent = range1.value;
            fillTRack();
        }
        function slide2() {
            if (parseInt(range2.value) - parseInt(range1.value) <= gap) {
                range2.value = range1.value;
            }
            value2.textContent = range2.value;
            fillTRack();
        }

        function fillTRack() {
            const percent1 = (parseInt(range1.value) / parseInt(range1.max)) * 100;
            const percent2 = (parseInt(range2.value) / parseInt(range1.max)) * 100;
            sliderTrack.style.background = `linear-gradient(to right, #F9804B ${percent1}%, #1baf4e ${percent1}%,
            #1baf4e ${percent2}%, #F9804B ${percent2}%)`;
        }

        range1.addEventListener('input', slide1);
        range2.addEventListener('input', slide2);

        values.append(value1, value2);
        valueTextBlock.append(valuesText, values);
        sliderCont.append(range1, range2, sliderTrack);
        conteiner.append(valueTextBlock, sliderCont);
        const obj = {
            conteiner,
            range1,
            range2,
            value1,
            value2,
            fillTRack,
        };
        return obj;
    }

    getObjBrand(data: iCartData[]) {
        const obj: List<number> = data.reduce((accum: List<number>, product) => {
            accum[product.brand] = (accum[product.brand] || 0) + 1;
            return accum;
        }, {});
        return obj;
    }

    getObjCategory(data: iCartData[]) {
        const obj: List<number> = data.reduce((accum: List<number>, product) => {
            accum[product.category] = (accum[product.category] || 0) + 1;
            return accum;
        }, {});
        return obj;
    }

    arrWithRanges: ImultiRange[] = [];

    render(root: HTMLElement, params?: QueryParams) {
        this.root = root;
        const resetConteiner = new Constructor('div', 'reset-cont').create();
        const resetBtn = new Constructor('button', 'reset-cont__btn', 'Reset filters').create();
        const resetCopyLink = new Constructor('button', 'reset-cont__btn', 'Copy link').create();
        const brandFilter = new Constructor('div', 'filter__brand').create();
        const categoryFilter = new Constructor('div', 'filter__brand').create();
        resetConteiner.append(resetBtn, resetCopyLink);

        let loadedData: iCartData[] = getProducts(params);

        let arrWithChekedValues: string[] = [];
        let sumOfBrands: iCartData[] = [];
        let sumOfCategory: iCartData[] = [];
        let checkCountBrands = 0;
        let checkCountCategory = 0;
        const changeBrand = () => {
            checkboxesBrand.forEach((item) => {
                if (item.checked) {
                    arrWithChekedValues.push(item.value);
                    console.log(arrWithChekedValues);
                    checkCountBrands++;
                    sumOfBrands = sumOfBrands.concat(products.filter((product) => product.brand === item.value));
                } else {
                    arrWithChekedValues = arrWithChekedValues.filter((el) => el !== item.value);
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
            categoryFilter.innerHTML = '';
            drawCategory();
            this.arrWithRanges.forEach((item) => item.conteiner.remove());
            components.getFilter().drawRanges(params);
        };

        const objBrands = this.getObjBrand(products);
        let checkboxesBrand: HTMLInputElement[] = [];
        const drawBrands = () => {
            const objBrandsFiltered = this.getObjBrand(loadedData);
            checkboxesBrand = [];
            for (const brand in objBrands) {
                let avalaible = objBrandsFiltered[brand];
                if (avalaible === undefined) avalaible = 0;
                const label = new Constructor(
                    'label',
                    'filter__brand__label',
                    `${brand} (${avalaible}/${objBrands[brand] as number})`
                ).create();
                const checkBox = new Constructor('input', 'filter__brand__check').create() as HTMLInputElement;
                checkBox.type = 'checkbox';
                checkBox.value = brand;
                if (arrWithChekedValues.indexOf(brand) !== -1) checkBox.checked = true;
                checkBox.addEventListener('click', changeBrand);
                label.prepend(checkBox);
                brandFilter.append(label);
                checkboxesBrand.push(checkBox);
            }
        };
        drawBrands();

        const changeCategory = () => {
            checkboxesCategory.forEach((item) => {
                if (item.checked) {
                    arrWithChekedValues.push(item.value);
                    checkCountCategory++;
                    sumOfBrands = sumOfBrands.concat(products.filter((product) => product.category === item.value));
                } else {
                    arrWithChekedValues = arrWithChekedValues.filter((el) => el !== item.value);
                }
            });
            checkboxesBrand.forEach((item) => {
                if (item.checked) {
                    checkCountBrands++;
                    sumOfCategory = sumOfCategory.concat(sumOfBrands.filter((product) => product.brand === item.value));
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
            brandFilter.innerHTML = '';
            drawBrands();
            this.arrWithRanges.forEach((item) => item.conteiner.remove());
            components.getFilter().drawRanges(params);
        };

        const objCategories = this.getObjCategory(products);
        let checkboxesCategory: HTMLInputElement[] = [];
        const drawCategory = () => {
            const objCategoryFiltered = this.getObjCategory(loadedData);
            checkboxesCategory = [];
            for (const category in objCategories) {
                let avalaible = objCategoryFiltered[category];
                if (avalaible === undefined) avalaible = 0;
                const label = new Constructor(
                    'label',
                    'filter__brand__label',
                    `${category} (${avalaible} / ${objCategories[category] as number})`
                ).create();
                const checkBox = new Constructor('input', 'filter__brand__check').create() as HTMLInputElement;
                checkBox.type = 'checkbox';
                checkBox.value = category;
                if (arrWithChekedValues.indexOf(category) !== -1) checkBox.checked = true;
                label.prepend(checkBox);
                categoryFilter.append(label);
                checkboxesCategory.push(checkBox);
                checkBox.addEventListener('change', changeCategory);
            }
        };
        drawCategory();

        const brandText = new Constructor('p', 'filter__header', 'Brands :').create();
        const categoryText = new Constructor('p', 'filter__header', 'Categories :').create();

        resetBtn.addEventListener('click', () => {
            arrWithChekedValues = [];
            brandFilter.innerHTML = '';
            drawBrands();
            categoryFilter.innerHTML = '';
            drawCategory();
        });

        resetCopyLink.addEventListener('click', () => {
            setTimeout(() => {
                navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => {
                        resetCopyLink.textContent = 'Copy link';
                    })
                    .catch((error) => console.log(error));
            }, 1000);
            resetCopyLink.textContent = 'Copied!!!';
        });

        // setTimeout(() => {
        //     const $main = document.querySelector('.main');
        //     $main?.prepend($filter);
        // }, 500);

        // $block1.textContent = 'Filters';

        // root.prepend($block1);
        root.append(resetConteiner, brandText, brandFilter, categoryText, categoryFilter);
        components.getFilter().drawRanges(params);
    }

    drawRanges(params?: QueryParams) {
        const loadedData: iCartData[] = getProducts(params);

        const multiRangePrice = this.getMultiRange('Price : ');
        const multiRangeStock = this.getMultiRange('Stock : ');
        this.arrWithRanges.push(multiRangePrice, multiRangeStock);
        multiRangePrice.range1.value = this.getMin(loadedData, true, true).toString();
        multiRangePrice.value1.textContent = this.getMin(loadedData, true, true).toString();
        multiRangePrice.value2.textContent = this.getMin(loadedData, false, true).toString();
        multiRangePrice.range2.max = this.getMin(products, false, true).toString();
        multiRangePrice.range1.max = this.getMin(products, false, true).toString();
        multiRangePrice.range2.value = this.getMin(loadedData, false, true).toString();
        multiRangePrice.fillTRack();

        multiRangeStock.range1.value = this.getMin(loadedData, true, false).toString();
        multiRangeStock.value1.textContent = this.getMin(loadedData, true, false).toString();
        multiRangeStock.value2.textContent = this.getMin(loadedData, false, false).toString();
        multiRangeStock.range2.max = this.getMin(products, false, false).toString();
        multiRangeStock.range1.max = this.getMin(products, false, false).toString();
        multiRangeStock.range2.value = this.getMin(loadedData, false, false).toString();
        multiRangeStock.fillTRack();

        const _root = components.getFilter().root;
        if (_root) {
            _root.append(multiRangePrice.conteiner, multiRangeStock.conteiner);
        }
    }
}
