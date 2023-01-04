import { getProducts } from '../../../controller/controller';
import { getProductsQueryParams } from '../../../controller/routing';
import { components } from '../../../model/comp-factory';
import Constructor from '../../../model/html-constructor';
import { iCartData } from '../../../model/model';
import { iComponent } from '../../components/component';
import './style.scss';

export class Product implements iComponent {
    render(root: HTMLElement) {
        console.log('Product');
        const id = getProductsQueryParams().id;
        console.log('id:', id);
        const product: iCartData | undefined = getProducts().find((product) => product.id == id);
        console.log('product:', product);

        const $header = document.createElement('header');
        const $footer = document.createElement('footer');

        const main = new Constructor('main', 'product').create();

        if (product) {
            // если id верный
            // pro
        } else {
            // если id не верный
        }

        components.getHeader().render($header);
        components.getFooter().render($footer);

        root.append($header, main, $footer);
    }
}
