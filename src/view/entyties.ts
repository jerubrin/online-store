export type renderFunc = (root: HTMLElement, params?: List<string>) => void;

export class List<T> {
    [index: string]: T;
}
