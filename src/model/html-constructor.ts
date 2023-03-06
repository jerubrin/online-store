export default class Constructor {
    tag: string;
    className: string;
    textCont: string | undefined;
    constructor(tag: string, className: string, textCont?: string) {
        (this.tag = tag), (this.className = className), (this.textCont = textCont);
    }
    create(): HTMLElement | HTMLFormElement | HTMLInputElement | HTMLImageElement {
        const div = document.createElement(`${this.tag}`);
        div.className = `${this.className}`;
        if (this.textCont) div.textContent = this.textCont;
        return div;
    }
}
