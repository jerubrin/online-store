import './style.scss';
import { iComponent } from '../component';
import Constructor from '../../../model/html-constructor';

export class Footer implements iComponent {
    render(root: HTMLElement) {
        const $block1 = document.createElement('div');
        $block1.classList.add('footer', 'wrapper');

        const $linksBlock = new Constructor('div', 'footer__links-block').create();
        const linkConteiner = new Constructor('div', 'footer__link-conteiner').create();
        const linkImg = new Constructor('img', 'footer__link__img').create() as HTMLImageElement;
        linkImg.src = './assets/img/rslogotip.png'
        const link = new Constructor('a', 'footer__link','RsSchool').create();
        linkConteiner.append(linkImg,link)
        const $design = new Constructor('div', 'footer__links-design','Designed for RsSchool 2022').create();


        $linksBlock.append(linkConteiner)
        $block1.append($linksBlock, $design);
        root.append($block1);
    }
}
