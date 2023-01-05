import './style.scss';
import { iComponent } from '../../components/component';
import { iCartData } from '../../../model/model';

export class Cart implements iComponent {
    private cart: iCartData[] = [];

    render(root: HTMLElement) {
        const header = document.createElement('div');
        console.log(root, header);
    }
    addToCart(product: iCartData) {
        this.cart.push(product);
    }

    deleteFromCart(id: number) {
        this.cart = this.cart.filter((product) => product.id !== id);
    }
    getTotalPrice(): number {
        const total = this.cart.reduce((accum, product) => {
            return accum + product.price;
        }, 0);
        return total;
    }

    getTotalProducts(): number {
        const total = this.cart.length;
        return total;
    }

    checkProduct(id: number): boolean {
        const product = this.cart.find((product) => product.id === id);
        return product !== undefined ? true : false;
    }
}

export const newCart = new Cart();
