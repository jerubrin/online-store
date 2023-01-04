import { getProducts } from '../../../controller/controller';
import { getProductsQueryParams } from '../../../controller/routing';
import { components } from '../../../model/comp-factory';
import Constructor from '../../../model/html-constructor';
import { iCartData } from '../../../model/model';
import { iComponent } from '../../components/component';
import './style.scss';

export class NotFound implements iComponent {
    render(root: HTMLElement) {
        const id = getProductsQueryParams().id;
        const product: iCartData | undefined = getProducts().find((product) => product.id == id);

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
