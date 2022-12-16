import './style.scss';
import { iComponent } from '../../components/component';

export class Cart implements iComponent {
    render(root: HTMLElement) {
        const header = document.createElement('div');
        console.log(root, header);
    }
}
