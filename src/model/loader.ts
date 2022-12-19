import { iCartData } from './model';

interface Data {
    products: iCartData[];
}
export default class Loader {
    async getSources(): Promise<iCartData[]> {
        return await fetch('https://dummyjson.com/products')
            .then((res) => res.json())
            .then((data: Data) => data.products);
    }
}
