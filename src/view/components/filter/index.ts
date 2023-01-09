import './style.scss';
import { iComponent } from '../component';
import { iCartData } from '../../../model/model';
import Constructor from '../../../model/html-constructor';
import { ImultiRange, List, RangeObject, sortingParams } from '../../entyties';
import { getProducts } from '../../../controller/controller';
import { components } from '../../../model/comp-factory';
import { getQueryParams, setParams } from '../../../controller/routing';

const GET_MIN = true;
const GET_MAX = false;
const IS_PRICE = true;
const IS_STOCK = false;

export class Filter implements iComponent {
    root: HTMLElement | null = null;
    multiRangePrice?: RangeObject;
    multiRangeStock?: RangeObject;

    getMinMax(data: iCartData[], min: boolean, price: boolean) {
        const arr = data.reduce((accum: number[], product) => {
            price ? accum.push(product.price) : accum.push(product.stock);
            return accum;
        }, []);
        if (data.length === 0) return 0;
        return min ? Math.min.apply(null, arr) : Math.max.apply(null, arr);
    }
    getMinPrice = (data: iCartData[]) => this.getMinMax(data, GET_MIN, IS_PRICE);
    getMaxPrice = (data: iCartData[]) => this.getMinMax(data, GET_MAX, IS_PRICE);
    getMinStock = (data: iCartData[]) => this.getMinMax(data, GET_MIN, IS_STOCK);
    getMaxStock = (data: iCartData[]) => this.getMinMax(data, GET_MAX, IS_STOCK);

    getMultiRange(name: string): RangeObject {
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
            const percent1 =
                ((parseInt(range1.value) - parseInt(range1.min)) / (parseInt(range1.max) - parseInt(range1.min))) * 100;
            const percent2 =
                ((parseInt(range2.value) - parseInt(range2.min)) / (parseInt(range2.max) - parseInt(range2.min))) * 100;
            sliderTrack.style.background = `linear-gradient(to right, #F9804B ${percent1}%, #1baf4e ${percent1}%,
            #1baf4e ${percent2}%, #F9804B ${percent2}%)`;
        }

        range1.addEventListener('input', slide1);
        range2.addEventListener('input', slide2);

        values.append(value1, value2);
        valueTextBlock.append(valuesText, values);
        sliderCont.append(range1, range2, sliderTrack);
        conteiner.append(valueTextBlock, sliderCont);
        const obj: RangeObject = {
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

    render(root: HTMLElement) {
        this.root = root;
        root.innerHTML = '';
        const resetConteiner = new Constructor('div', 'reset-cont').create();
        const resetBtn = new Constructor('button', 'reset-cont__btn', 'Reset filters').create();
        const resetCopyLink = new Constructor('button', 'reset-cont__btn', 'Copy link').create();
        const brandFilter = new Constructor('div', 'filter__brand brand').create();
        const categoryFilter = new Constructor('div', 'filter__brand brand').create();
        resetConteiner.append(resetBtn, resetCopyLink);

        let sumOfBrands: Array<string> = [];
        let sumOfCategory: Array<string> = [];

        const changeHandler = () => {
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

            if (this.multiRangePrice && this.multiRangeStock) {
                const settedMinPrice = +this.multiRangePrice.range1.value;
                const settedMaxPrice = +this.multiRangePrice.range2.value;
                const minPrice = +this.multiRangePrice.range1.min;
                const maxPrice = +this.multiRangePrice.range1.max;
                if (settedMinPrice > minPrice) {
                    setParams({ minprice: settedMinPrice });
                } else {
                    setParams({ minprice: -1 });
                }
                if (settedMaxPrice < maxPrice) {
                    setParams({ maxprice: settedMaxPrice });
                } else {
                    setParams({ maxprice: -1 });
                }

                const settedMinStock = +this.multiRangeStock.range1.value;
                const settedMaxStock = +this.multiRangeStock.range2.value;
                const minStock = +this.multiRangeStock.range1.min;
                const maxStock = +this.multiRangeStock.range1.max;
                if (settedMinStock > minStock) {
                    setParams({ minstock: settedMinStock });
                } else {
                    setParams({ minstock: -1 });
                }
                if (settedMaxStock < maxStock) {
                    setParams({ maxstock: settedMaxStock });
                } else {
                    setParams({ maxstock: -1 });
                }
            }
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
                    'brand__label',
                    `${brand} (${avalaible}/${objBrands[brand] as number})`
                ).create();
                const checkBox = new Constructor('input', 'filter__check').create() as HTMLInputElement;
                checkBox.type = 'checkbox';
                checkBox.value = brand;
                if (brandsCheckedSet.has(brand)) {
                    checkBox.checked = true;
                }
                checkBox.addEventListener('click', changeHandler);
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
                    'brand__label',
                    `${category} (${avalaible} / ${objCategories[category] as number})`
                ).create();
                const checkBox = new Constructor('input', 'filter__check').create() as HTMLInputElement;
                checkBox.type = 'checkbox';
                checkBox.value = category;
                if (categoriesBrandsCheckedSet.has(category)) {
                    checkBox.checked = true;
                }
                label.prepend(checkBox);
                categoryFilter.append(label);
                checkboxesCategory.push(checkBox);
                checkBox.addEventListener('change', changeHandler);
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
                list: '',
                search: '',
                sorting: sortingParams.def,
                ['id']: '',
                ['page']: '',
            });
            components.getMainShopPage().rerender();
        });

        resetCopyLink.addEventListener('click', () => {
            navigator.clipboard
                .writeText(window.location.href)
                .then(() => {
                    resetCopyLink.textContent = 'Copied!!!';
                })
                .catch((error) => {
                    resetCopyLink.textContent = 'Error!!!';
                    console.log(error);
                });
            setTimeout(() => {
                resetCopyLink.textContent = 'Copy link';
            }, 1000);
        });

        root.append(resetConteiner, brandText, brandFilter, categoryText, categoryFilter);

        const drawRanges = () => {
            const paramsForPrice = getQueryParams();
            const paramsForStock = getQueryParams();
            const params = getQueryParams();

            if (params.maxprice) {
                delete paramsForStock.maxprice;
                delete params.maxprice;
            }
            if (params.minprice) {
                delete paramsForStock.minprice;
                delete params.minprice;
            }
            if (params.maxstock) {
                delete paramsForPrice.maxstock;
                delete params.maxstock;
            }
            if (params.minstock) {
                delete paramsForPrice.minstock;
                delete params.minstock;
            }

            const loadedDataForPrice: iCartData[] = getProducts(paramsForPrice);
            const loadedDataForStock: iCartData[] = getProducts(paramsForStock);

            if (params.minstock && params.minstock < this.getMinStock(loadedDataForPrice)) {
                delete params.minstock;
                delete paramsForPrice.minstock;
                delete paramsForStock.minstock;
            }
            if (params.maxstock && params.maxstock > this.getMaxStock(loadedDataForPrice)) {
                delete params.maxstock;
                delete paramsForPrice.maxstock;
                delete paramsForStock.maxstock;
            }
            if (params.maxprice && params.maxprice > this.getMaxPrice(loadedDataForStock)) {
                delete params.maxprice;
                delete paramsForPrice.maxprice;
                delete paramsForStock.maxprice;
            }
            if (params.minprice && params.minprice < this.getMinPrice(loadedDataForStock)) {
                console.log(paramsForPrice.minprice, '<', this.getMinPrice(loadedDataForStock));
                delete params.minprice;
                delete paramsForPrice.minprice;
                delete paramsForStock.minprice;
            }

            const loadedData: iCartData[] = getProducts(params);

            console.log('drawRanges', getProducts(params));

            this.multiRangePrice = this.getMultiRange('Price : ');
            this.multiRangeStock = this.getMultiRange('Stock : ');
            this.arrWithRanges.push(this.multiRangePrice, this.multiRangeStock);

            this.multiRangePrice.range1.max = this.getMaxPrice(loadedData).toString();
            this.multiRangePrice.range2.max = this.getMaxPrice(loadedData).toString();
            this.multiRangePrice.range1.min = this.getMinPrice(loadedData).toString();
            this.multiRangePrice.range2.min = this.getMinPrice(loadedData).toString();

            console.log('paramsForPrice.minprice =', paramsForPrice.minprice);
            const minPriceValue = paramsForPrice.minprice
                ? paramsForPrice.minprice.toString()
                : this.getMinPrice(loadedData).toString();
            const maxPriceValue = paramsForPrice.maxprice
                ? paramsForPrice.maxprice.toString()
                : this.getMaxPrice(loadedData).toString();
            console.log('maxPriceValue =', maxPriceValue);
            this.multiRangePrice.range1.value = minPriceValue;
            this.multiRangePrice.value1.textContent = minPriceValue;
            this.multiRangePrice.value2.textContent = maxPriceValue;
            this.multiRangePrice.range2.value = maxPriceValue;
            this.multiRangePrice.fillTRack();

            this.multiRangeStock.range1.max = this.getMaxStock(loadedData).toString();
            this.multiRangeStock.range2.max = this.getMaxStock(loadedData).toString();
            this.multiRangeStock.range1.min = this.getMinStock(loadedData).toString();
            this.multiRangeStock.range2.min = this.getMinStock(loadedData).toString();

            const minStockValue = paramsForStock.minstock
                ? paramsForStock.minstock.toString()
                : this.getMinStock(loadedData).toString();
            const maxStockValue = paramsForStock.maxstock
                ? paramsForStock.maxstock.toString()
                : this.getMaxStock(loadedData).toString();
            this.multiRangeStock.range1.value = minStockValue;
            this.multiRangeStock.value1.textContent = minStockValue;
            this.multiRangeStock.value2.textContent = maxStockValue;
            this.multiRangeStock.range2.value = maxStockValue;
            this.multiRangeStock.fillTRack();

            const _root = components.getFilter().root;
            if (_root) {
                _root.append(this.multiRangePrice.conteiner, this.multiRangeStock.conteiner);
            }

            this.multiRangePrice.range1.addEventListener('change', changeHandler);
            this.multiRangePrice.range2.addEventListener('change', changeHandler);
            this.multiRangeStock.range1.addEventListener('change', changeHandler);
            this.multiRangeStock.range2.addEventListener('change', changeHandler);
        };
        drawRanges();
    }
}
