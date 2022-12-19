import { iCartData } from './model';

export default class Loader{
    constructor(){}
    async getSources():Promise<iCartData[]>{
        return  await fetch('https://dummyjson.com/products')
        .then(data=>data.json())
        .then(data => data.products)
    }
}
