import './style.scss';
import { iComponent } from '../../components/component';
import { List } from '../../entyties';
import { components } from '../../../model/comp-factory';


export class MainShopPage implements iComponent {
    async render(root: HTMLElement, params?: List<string>) {
        const $header = document.createElement('header');
        const $main = document.createElement('main');
        $main.className = 'main'

        const $filter = document.createElement('aside');
        const $cardList = document.createElement('section');
        $cardList.className = 'card-list'
        const $footer = document.createElement('footer');

        components.getHeader().render($header);
        components.getFilter().render($filter);
        components.getCardList().render($cardList);
        components.getFooter().render($footer);


        $main.append($filter, $cardList);
        root.append($header, $main, $footer);
        
        
    
        
        console.log('CardList rendered! Params:', params);
    }
}
