import { DOMMatrix } from "./matrix";
export declare class DOMPoint {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x?: number, y?: number, z?: number, w?: number);
    static fromPoint(otherPoint: DOMPoint): DOMPoint;
    matrixTransform(matrix: DOMMatrix): DOMPoint;
}
