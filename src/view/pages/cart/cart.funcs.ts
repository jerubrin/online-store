import { storageNames } from '../../../model/local-storage-enum';
import { CartItem, iCartData } from '../../../model/model';

export let cart: Array<CartItem> = [];

export const addToCart = (product: iCartData, count = 1) => {
    const item: CartItem = new CartItem(product, count);
    cart.push(item);
    saveData();
};

export const deleteFromCart = (id?: number) => {
    const i = cart.findIndex((item) => item.product.id === id);
    if (i > -1) cart.splice(i, 1);
    saveData();
};

export const hasItem = (id?: number) => {
    const i = cart.findIndex((item) => item.product.id === id);
    return i > -1;
};

export const getTotalPrice = (): number => cart.reduce((sum, item) => sum + item.product.price * item.count, 0);

export const getTotalProducts = (): number => cart.reduce((sum, item) => sum + item.count, 0);
export const getLength = (): number => cart.length;

function saveData() {
    localStorage.setItem(storageNames.cardData, JSON.stringify(cart));
}

export const clearCart = () => {
    cart = [];
    saveData();
};

export function loadData() {
    const res = localStorage.getItem(storageNames.cardData);
    if (res) {
        cart = JSON.parse(res) as Array<CartItem>;
    }
}

export const incCount = (id?: number) => {
    const _item = cart.find((item) => item.product.id == id);
    if (_item && _item.count < _item.product.stock) {
        _item.count += 1;
        saveData();
    }
};

export const decCount = (id?: number) => {
    const _item = cart.find((item) => item.product.id == id);
    if (_item) {
        _item.count -= 1;
        if (_item.count <= 0) {
            deleteFromCart(_item.product.id);
        }
        saveData();
    }
};

export const getList = () => cart;

export const getListByPage = (page: number, limit: number) =>
    cart.slice((page - 1) * limit, (page - 1) * limit + limit);
