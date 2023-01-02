import './style.scss';
import { iComponent } from '../component';
import Constructor from '../../../model/html-constructor';

interface GitUser {
    name: string;
    href: string;
}

export class Footer implements iComponent {
    render(root: HTMLElement) {
        const $block1 = document.createElement('div');
        $block1.classList.add('footer', 'wrapper');

        const $linksBlock = new Constructor('div', 'footer__links-block').create();
        const linkConteiner = new Constructor('div', 'footer__link-conteiner').create();

        const link = new Constructor('a', 'footer__link').create();
        linkConteiner.append(link);

        const $gitHubs = new Constructor('div', 'footer__links-githubs').create();

        const githubs: Array<GitUser> = [
            { name: 'jerubrin', href: 'https://github.com/jerubrin' } as GitUser,
            { name: 'LoginovskyMax', href: 'https://github.com/LoginovskyMax' } as GitUser,
        ];
        for (let i = 0; i < 2; i++) {
            const $githubContainer = new Constructor('a', 'footer__links-github-container').create();
            const $gitHubIcon = new Constructor('div', 'footer__links-github-icon').create();
            const $gitHubUserName = new Constructor('div', 'footer__links-github-user-name').create();
            $githubContainer.append($gitHubIcon, $gitHubUserName);
            $githubContainer.setAttribute('href', githubs[i]?.href ?? '');
            $gitHubUserName.textContent = githubs[i]?.name ?? '';
            $gitHubs.append($githubContainer);
        }

        const $design = new Constructor('div', 'footer__links-design', 'Designed in 2022').create();

        $linksBlock.append(linkConteiner);
        $block1.append($linksBlock, $gitHubs, $design);
        root.append($block1);
    }
}
