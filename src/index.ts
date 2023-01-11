import { handleLocation } from './controller/routing';
import './style/main.scss';

window.onload = handleLocation;
window.onpopstate = handleLocation;
