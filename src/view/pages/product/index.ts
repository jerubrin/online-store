import { getProducts } from '../../../controller/controller';
import { getProductsQueryParams } from '../../../controller/routing';
import { components } from '../../../model/comp-factory';
import Constructor from '../../../model/html-constructor';
import { iCartData } from '../../../model/model';
import { iComponent } from '../../components/component';
import { modalWindow } from '../../components/modal-window';
import * as cartList from '../../pages/cart/cart.funcs';
import './style.scss';

export class Product implements iComponent {
    render(root: HTMLElement) {
        cartList.loadData();
        const id = getProductsQueryParams().id;
        const product: iCartData | undefined = getProducts().find((product) => product.id == id);

        const $header = document.createElement('header');
        const $footer = document.createElement('footer');

        const main = new Constructor('main', 'product').create();

        if (product) {
            let inCart = cartList.hasItem(product.id);

            const breadText = `Store => 
            ${product?.category.replace(product?.category[0] as string, product?.category[0]?.toUpperCase() as string)} 
            => ${product?.brand} => ${product?.title}`;
            const breadContainer = new Constructor('div', 'bread__conteiner', breadText).create();
            const productContainer = new Constructor('div', 'product__conteiner').create();
            const infoContainer = new Constructor('div', 'info__conteiner').create();
            const infoMiniContainer = new Constructor('div', 'info__mini-conteiner').create();
            const descriptionHeader = new Constructor('div', 'info__header', 'Description : ').create();
            const descriptionText = new Constructor('div', 'info__text', product?.description).create();
            const discountMiniContainer = new Constructor('div', 'info__mini-conteiner').create();
            const discountHeader = new Constructor('div', 'info__header', 'Discount Percentage : ').create();
            const discountText = new Constructor('div', 'info__text', product?.discountPercentage?.toString()).create();
            const ratingMiniContainer = new Constructor('div', 'info__mini-conteiner').create();
            const ratingHeader = new Constructor('div', 'info__header', 'Rating : ').create();
            const ratingText = new Constructor('div', 'info__text', product?.rating?.toString()).create();
            const stockMiniContainer = new Constructor('div', 'info__mini-conteiner').create();
            const stockHeader = new Constructor('div', 'info__header', 'Stock : ').create();
            const stockText = new Constructor('div', 'info__text', product?.stock?.toString()).create();
            const brandMiniContainer = new Constructor('div', 'info__mini-conteiner').create();
            const brandHeader = new Constructor('div', 'info__header', 'Brand : ').create();
            const brandText = new Constructor('div', 'info__text', product?.brand).create();
            const categoryMiniContainer = new Constructor('div', 'info__mini-conteiner').create();
            const categoryHeader = new Constructor('div', 'info__header', 'Category : ').create();
            const categoryText = new Constructor('div', 'info__text', product?.category).create();

            discountMiniContainer.append(discountHeader, discountText);
            ratingMiniContainer.append(ratingHeader, ratingText);
            stockMiniContainer.append(stockHeader, stockText);
            brandMiniContainer.append(brandHeader, brandText);
            categoryMiniContainer.append(categoryHeader, categoryText);

            const imageContainer = new Constructor('div', 'image__conteiner').create();
            const buttonsContainer = new Constructor('div', 'buttons__conteiner').create();
            const nextBtn = new Constructor('button', 'image__button', 'Next').create();
            const prevBtn = new Constructor('button', 'image__button', 'Prev').create();

            const imgArr: HTMLElement[] = [];
            product.images.forEach((img) => {
                const imgSmall = new Constructor('img', 'image__small').create() as HTMLImageElement;
                imgSmall.src = img;
                imgArr.push(imgSmall);
                imageContainer.append(imgSmall);
            });
            buttonsContainer.append(prevBtn, nextBtn);
            imageContainer.append(buttonsContainer);

            let counter = 0;
            nextBtn.addEventListener('click', () => {
                counter++;
                if (counter === imgArr.length) {
                    counter = 0;
                }
                imgArr.forEach((img) => {
                    img.style.display = 'none';
                });
                (imgArr[counter] as HTMLElement).style.display = 'block';
            });

            prevBtn.addEventListener('click', () => {
                counter--;
                if (counter === -1) {
                    counter = imgArr.length - 1;
                }
                imgArr.forEach((img) => {
                    img.style.display = 'none';
                });
                (imgArr[counter] as HTMLElement).style.display = 'block';
            });

            const cartBlock = new Constructor('div', 'buttons').create();
            const buttonsName = new Constructor('div', 'buttons__price', `${product.title}`).create();
            const buttonsPrice = new Constructor('div', 'buttons__price', `${product.price.toString()} $`).create();
            const addBtn = new Constructor('button', 'buttons__btn', 'Add to cart').create();
            const buyBtn = new Constructor('button', 'buttons__btn', 'Buy now').create();
            if (inCart) {
                addBtn.textContent = 'Delete from cart';
            }
            addBtn.addEventListener('click', () => {
                // const totalPriceDiv = document.querySelector('.header__basket-cont__total-price') as HTMLElement;
                // const totalProductsDiv = document.querySelector('.header__basket-cont_items') as HTMLElement;
                if (inCart) {
                    addBtn.textContent = 'Add to cart';
                    cartList.deleteFromCart(product.id);
                    components.getHeader().refreshData();
                } else {
                    addBtn.textContent = 'Delete from cart';
                    cartList.addToCart(product);
                    components.getHeader().refreshData();
                }
                inCart = !inCart;
            });

            buyBtn.addEventListener('click', () => {
                const modal = new modalWindow().render();
                console.log(modal);
            });

            cartBlock.append(buttonsName, buttonsPrice, addBtn, buyBtn);

            infoMiniContainer.append(descriptionHeader, descriptionText);
            infoContainer.append(
                infoMiniContainer,
                discountMiniContainer,
                ratingMiniContainer,
                stockMiniContainer,
                brandMiniContainer,
                categoryMiniContainer
            );
            productContainer.append(infoContainer, imageContainer, cartBlock);

            main.append(breadContainer, productContainer);
        } else {
            const errorText = new Constructor('div', 'error-text', 'Sorry, but product not found').create();
            const errorImage = new Constructor('div', 'error-image').create();
            main.append(errorText, errorImage);
        }

        components.getHeader().render($header);
        components.getFooter().render($footer);
        components.getHeader().refreshData();

        root.append($header, main, $footer);
    }
}
