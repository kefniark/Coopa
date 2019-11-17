export declare class DOMRect {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x?: number, y?: number, width?: number, height?: number);
    static fromRect(otherRect: DOMRect): DOMRect;
    get top(): number;
    get left(): number;
    get right(): number;
    get bottom(): number;
}
