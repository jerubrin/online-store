import './style.scss';
import Constructor from '../../../model/html-constructor';
import { goToMain } from '../../../controller/routing';
import * as cartList from '../../pages/cart/cart.funcs';

export class ModalWindow {
    render() {
        const modalConteiner = new Constructor('div', 'modal').create();
        const mainModal = new Constructor('form', 'modal__payment payment').create();
        const nameText = new Constructor('div', 'payment__text', 'Your name:').create();
        const nameBlock = new Constructor('div', 'payment__block').create();
        const nameInp = new Constructor('input', 'payment__input').create() as HTMLInputElement;
        nameInp.placeholder = 'Name SecondName';
        const telText = new Constructor('div', 'payment__text', 'Telefon number:').create();
        const telBlock = new Constructor('div', 'payment__block').create();
        const telInp = new Constructor('input', 'payment__input').create() as HTMLInputElement;
        telInp.placeholder = '+7 700 22 55 387';
        const adressText = new Constructor('div', 'payment__text', 'Adress:').create();
        const adressBlock = new Constructor('div', 'payment__block').create();
        const adressInp = new Constructor('input', 'payment__input').create() as HTMLInputElement;
        adressInp.placeholder = 'Country, City, Street';
        const mailText = new Constructor('div', 'payment__text', 'Your email:').create();
        const mailBlock = new Constructor('div', 'payment__block').create();
        const mailInp = new Constructor('input', 'payment__input').create() as HTMLInputElement;
        mailInp.placeholder = 'Your-email@mail.com';

        const cardText = new Constructor('div', 'payment__text', 'Card Info: ').create();
        const cardMainBlock = new Constructor('div', 'payment__card').create();
        const card16Block = new Constructor('div', 'payment__block').create();
        const card16Inp = new Constructor('input', 'payment__input').create() as HTMLInputElement;
        card16Inp.placeholder = '16 numbers on card';
        const cardBottomBlock = new Constructor('div', 'payment__block-bottom').create();
        const cardDateText = new Constructor('div', 'payment__text', 'Valid : ').create();
        const cardDateBlock = new Constructor('div', 'payment__block-mini').create();
        const cardDateInp = new Constructor('input', 'payment__input-mini').create() as HTMLInputElement;
        cardDateInp.placeholder = '10/23';
        const cvvText = new Constructor('div', 'payment__text', 'CVV : ').create();
        const cvvBlock = new Constructor('div', 'payment__block-mini').create();
        const cvvInp = new Constructor('input', 'payment__input-mini').create() as HTMLInputElement;
        cvvInp.placeholder = '***';
        cvvInp.type = 'number';
        const cardImg = new Constructor('div', 'payment__image').create() as HTMLElement;
        card16Block.append(cardImg, card16Inp);
        cardDateBlock.append(cardDateText, cardDateInp);
        cvvBlock.append(cvvText, cvvInp);
        cardBottomBlock.append(cardDateBlock, cvvBlock);
        cardMainBlock.append(card16Block, cardBottomBlock);
        const closeBtn = new Constructor('a', 'payment__close-btn').create();
        const confirmBtn = new Constructor('button', 'payment__confirm-btn', 'Confirm').create();
        confirmBtn.setAttribute('type', 'submit');

        function closeModal() {
            modalConteiner.remove();
        }
        closeBtn.addEventListener('click', closeModal);
        mainModal.addEventListener('click', (e) => e.stopPropagation());
        modalConteiner.addEventListener('click', closeModal);

        function addError(div: HTMLElement) {
            const errorMessage = new Constructor('p', 'payment__error', 'Error').create();
            div.append(errorMessage);
            setTimeout(() => {
                clickTime = true;
                errorMessage.remove();
            }, 2000);
        }

        const regName = /[A-Za-z]{3,}\b.+?[A-Za-z]{3,}/;
        const regAdress = /[A-Za-z]{5,}.+[A-Za-z]{5,}.+?[A-Za-z]{5,}/;
        const regTel = /^((\+[0-9])[\s]?)(\(?\d{3}\)?[\s]?)?[\d\s]{8,}$/;
        const regEmail = /[A-Za-z0-9]+@[a-z]+\.[a-z]{2,3}/;

        const numArr = '1234567890/ ';
        card16Inp.addEventListener('input', () => {
            for (let i = 0; i < card16Inp.value.length; i++) {
                if (numArr.indexOf(card16Inp.value[i] as string) === -1) {
                    card16Inp.value = card16Inp.value.slice(0, i);
                }
            }
            if (+(card16Inp.value[0] as string) === 4) {
                cardImg.className = 'payment__image payment__image_visa';
            } else if (+(card16Inp.value[0] as string) === 5) {
                cardImg.className = 'payment__image payment__image_mc';
            } else if (+(card16Inp.value[0] as string) === 3) {
                cardImg.className = 'payment__image payment__image_express';
            } else {
                cardImg.className = 'payment__image';
            }

            let str = card16Inp.value;
            str = str
                .split('')
                .filter((ch) => setNumber.has(ch))
                .join('');
            const spaseIndexes = [4, 9, 14];
            spaseIndexes.forEach((i) => {
                if (setNumber.has(str[i] as string)) {
                    const arr = str.split('');
                    arr.splice(i, 0, ' ');
                    arr.filter((ch, j) => ch !== ' ' || spaseIndexes.includes(j));
                    console.log(arr);
                    str = arr.join('');
                }
            });
            card16Inp.value = str;
            if (card16Inp.value.length > 19) {
                card16Inp.value = card16Inp.value.slice(0, 19);
            }
        });

        card16Inp.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
            }
            if (e.code === 'Slash' || e.code === 'Backslash') e.preventDefault();
        });

        cvvInp.addEventListener('input', () => {
            if (cvvInp.value.length > 3) {
                cvvInp.value = cvvInp.value.slice(0, 3);
            }
        });
        const setNumber = new Set('0123456789'.split(''));
        let key = '';
        const keyDownHandler = (event: KeyboardEvent) => {
            key = event.key;
            return setNumber.has(event.key) || event.key == 'Backspace';
        };
        cvvInp.onkeydown = keyDownHandler;
        cardDateInp.onkeydown = keyDownHandler;
        cvvInp.setAttribute('min', '0');
        cvvInp.setAttribute('max', '999');
        cardDateInp.addEventListener('input', () => {
            let str = cardDateInp.value
                .split('')
                .filter((ch) => setNumber.has(ch))
                .join('');
            if (str.length === 2 && +str > 12) {
                if (+(str[0] as string) > 0) {
                    str = '0' + (str[0] as string) + (str[1] as string);
                }
            }
            if (str.length === 2 && key !== 'Backspace') {
                str += '/';
            }
            if (str.length > 2 && str[2] !== '/' && key !== 'Backspace') {
                const arr = str.split('');
                arr.splice(2, 0, '/');
                str = arr.join('');
            }
            if (str.length > 5) {
                str = str.slice(0, 5);
            }
            cardDateInp.value = str;
        });
        cardDateInp.addEventListener('keydown', (e) => {
            if (e.code === 'Slash' || e.code === 'Backslash') e.preventDefault();
            if (e.code === 'Space') e.preventDefault();
        });

        let clickTime = true;
        confirmBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (clickTime) {
                clickTime = false;
                let errorsCount = 0;
                if (!regName.test(nameInp.value)) {
                    errorsCount++;
                    addError(nameBlock);
                }
                if (!regAdress.test(adressInp.value)) {
                    errorsCount++;
                    addError(adressBlock);
                }
                const tellArr = telInp.value.split('').filter((ch) => ch != ' ');
                console.log(tellArr);
                if (
                    !regTel.test(telInp.value) ||
                    !tellArr.every((ch, i) => (i == 0 && ch == '+') || setNumber.has(ch)) ||
                    tellArr.length <= 9
                ) {
                    addError(telBlock);
                    errorsCount++;
                }
                if (!regEmail.test(mailInp.value)) {
                    addError(mailBlock);
                    errorsCount++;
                }
                if (card16Inp.value.length !== 19) {
                    addError(card16Block);
                    errorsCount++;
                }
                if (
                    cvvInp.value.length !== 3 ||
                    cvvInp.value
                        .split('')
                        .filter((it) => '1234567890'.split('').includes(it))
                        .join('') != cvvInp.value
                ) {
                    addError(cvvBlock);
                    errorsCount++;
                }
                const month = (cardDateInp.value[0] as string) + (cardDateInp.value[1] as string);
                if (+month > 12 || Number.isNaN(+month)) {
                    addError(cardDateBlock);
                    errorsCount++;
                }
                if (errorsCount === 0) {
                    let seconds = 4;
                    let text = `Thanks for buying, redirest to main page in ${seconds}`;
                    const succesText = new Constructor('div', 'payment__succes', text).create();
                    mainModal.classList.add('modal__payment_succses');
                    const ID = setInterval(() => {
                        seconds--;
                        text = `Thanks for buying, redirest to main page in ${seconds}`;
                        succesText.textContent = text;
                        if (seconds === 0) {
                            goToMain();
                            clearInterval(ID);
                        }
                    }, 1000);
                    cartList.clearCart();
                    mainModal.innerHTML = '';
                    mainModal.append(succesText);
                }
            }
        });

        nameBlock.append(nameInp);
        telBlock.append(telInp);
        adressBlock.append(adressInp);
        mailBlock.append(mailInp);
        mainModal.append(
            nameText,
            nameBlock,
            telText,
            telBlock,
            adressText,
            adressBlock,
            mailText,
            mailBlock,
            cardText,
            cardMainBlock,
            closeBtn,
            confirmBtn
        );
        modalConteiner.append(mainModal);
        document.body.append(modalConteiner);
        confirmBtn.focus();
    }
}
