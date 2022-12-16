import { iComponent } from '../../components/component';
import './style.scss';

//404
export class NotFound implements iComponent {
    render() {
        console.log('NotFound - 404 rendered');
    }
}
