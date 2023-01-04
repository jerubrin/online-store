import './style.scss';
import { iComponent } from '../component';
import { iCartData } from '../../../model/model';
import Constructor from '../../../model/html-constructor';
import { ImultiRange, List } from '../../entyties';
import { getProducts } from '../../../controller/controller';
import products from '../../../model/products.json';
import { components } from '../../../model/comp-factory';
import { getQueryParams, setParams } from '../../../controller/routing';

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
        console.log(obj);
        return obj;
    }

    arrWithRanges: ImultiRange[] = [];

    render(root: HTMLElement) {
        this.root = root;
        root.innerHTML = '';
        const resetConteiner = new Constructor('div', 'reset-cont').create();
        const resetBtn = new Constructor('button', 'reset-cont__btn', 'Reset filters').create();
        const resetCopyLink = new Constructor('button', 'reset-cont__btn', 'Copy link').create();
        const brandFilter = new Constructor('div', 'filter__brand').create();
        const categoryFilter = new Constructor('div', 'filter__brand').create();
        resetConteiner.append(resetBtn, resetCopyLink);

        let sumOfBrands: Array<string> = [];
        let sumOfCategory: Array<string> = [];

        // change listener
        const changeBrand = () => {
            sumOfBrands = [];
            sumOfCategory = [];

            checkboxesBrand.forEach((item) => {
                if (item.checked) {
                    sumOfBrands = [...sumOfBrands, item.value];
                }
            });
            checkboxesCategory.forEach((item) => {
                if (item.checked) {
                    sumOfCategory = [...sumOfCategory, item.value];
                }
            });
            const brandsQueryString = sumOfBrands.join('|');
            const categoryQueryString = sumOfCategory.join('|');
            setParams({ brand: brandsQueryString, category: categoryQueryString });

            this.arrWithRanges.forEach((item) => item.conteiner.remove());
            if (this.root) {
                this.render(this.root);
            }
        };

        const products = getProducts({});
        const objBrands = this.getObjBrand(products);
        let checkboxesBrand: HTMLInputElement[] = [];

        const drawBrands = () => {
            const products = getProducts();
            const objBrandsFiltered = this.getObjBrand(products);
            checkboxesBrand = [];
            const brandsCheckedSet = new Set(getQueryParams().brand?.split('|') as Array<string>);

            for (const brand in objBrands) {
                let avalaible = objBrandsFiltered[brand];
                if ((objBrands[brand] as number) == 0) {
                    continue;
                }
                if (avalaible === undefined) {
                    avalaible = 0;
                }
                const label = new Constructor(
                    'label',
                    'filter__brand__label',
                    `${brand} (${avalaible}/${objBrands[brand] as number})`
                ).create();
                const checkBox = new Constructor('input', 'filter__brand__check').create() as HTMLInputElement;
                checkBox.type = 'checkbox';
                checkBox.value = brand;
                if (brandsCheckedSet.has(brand)) {
                    checkBox.checked = true;
                }
                checkBox.addEventListener('click', changeBrand);
                label.prepend(checkBox);
                brandFilter.append(label);
                checkboxesBrand.push(checkBox);
            }
        };
        drawBrands();

        const objCategories = this.getObjCategory(products);
        let checkboxesCategory: HTMLInputElement[] = [];
        const drawCategories = () => {
            const products = getProducts();
            const objCategoryFiltered = this.getObjCategory(products);
            checkboxesCategory = [];
            const categoriesBrandsCheckedSet = new Set(getQueryParams().category?.split('|') as Array<string>);

            for (const category in objCategories) {
                let avalaible = objCategoryFiltered[category];
                if ((objCategories[category] as number) == 0) {
                    continue;
                }
                if (avalaible === undefined) {
                    avalaible = 0;
                }
                const label = new Constructor(
                    'label',
                    'filter__brand__label',
                    `${category} (${avalaible} / ${objCategories[category] as number})`
                ).create();
                const checkBox = new Constructor('input', 'filter__brand__check').create() as HTMLInputElement;
                checkBox.type = 'checkbox';
                checkBox.value = category;
                if (categoriesBrandsCheckedSet.has(category)) {
                    checkBox.checked = true;
                }
                label.prepend(checkBox);
                categoryFilter.append(label);
                checkboxesCategory.push(checkBox);
                checkBox.addEventListener('change', changeBrand);
            }
        };
        drawCategories();

        const brandText = new Constructor('p', 'filter__header', 'Brands :').create();
        const categoryText = new Constructor('p', 'filter__header', 'Categories :').create();

        resetBtn.addEventListener('click', () => {
            setParams({
                brand: '',
                category: '',
                minprice: -1,
                maxprice: -1,
                minstock: -1,
                maxstock: -1,
            });
            if (this.root) {
                this.render(this.root);
            }
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

        root.append(resetConteiner, brandText, brandFilter, categoryText, categoryFilter);
        this.drawRanges();
    }

    drawRanges() {
        const params = getQueryParams();
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
