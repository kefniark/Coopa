export declare class DOM {
    static document: Document;
    static get doc(): Document;
    static setup(doc: Document): void;
    static createElement(tagName: string, options?: ElementCreationOptions): HTMLElement;
    static createText(value: string): HTMLElement;
    static setText(el: HTMLElement, value: string): void;
    static setAttr(el: HTMLElement, options: {
        [id: string]: string;
    }): void;
    static setStyle(el: HTMLElement, styles: Partial<CSSStyleDeclaration>): void;
}
