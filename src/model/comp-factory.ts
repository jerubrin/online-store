import { Card } from '../view/components/card';
import { CardList } from '../view/components/card-list-comp';
import { Filter } from '../view/components/filter';
import { Footer } from '../view/components/footer';
import { Header } from '../view/components/header/header';
import { MainShopPage } from '../view/pages/main-page';
import { Cart } from '../view/pages/cart';
import { NotFound } from '../view/pages/not-found/not-found';
import { iCartData } from './model';
import { SortContainer } from '../view/components/sort-conteiner';

export class AllComponents {
    private cardList?: CardList;
    private cart?: Cart;
    private notFound?: NotFound;
    private filter?: Filter;
    private footer?: Footer;
    private header?: Header;
    private mainShopPage?: MainShopPage;
    private sortContainer?: SortContainer;

    getMainShopPage(): MainShopPage {
        if (!this.mainShopPage) this.mainShopPage = new MainShopPage();
        return this.mainShopPage;
    }

    getCart(): Cart {
        if (!this.cart) this.cart = new Cart();
        return this.cart;
    }

    getNotFound(): NotFound {
        if (!this.notFound) this.notFound = new NotFound();
        return this.notFound;
    }

    getCardList(): CardList {
        if (!this.cardList) this.cardList = new CardList();
        return this.cardList;
    }

    getCard(data: iCartData): Card {
        return new Card(data);
    }

    getFilter(): Filter {
        if (!this.filter) this.filter = new Filter();
        return this.filter;
    }

    getFooter(): Footer {
        if (!this.footer) this.footer = new Footer();
        return this.footer;
    }

    getHeader(): Header {
        if (!this.header) this.header = new Header();
        return this.header;
    }

    getSortContainer(): SortContainer {
        if (!this.sortContainer) this.sortContainer = new SortContainer();
        return this.sortContainer;
    }
}

export const components: AllComponents = new AllComponents();
