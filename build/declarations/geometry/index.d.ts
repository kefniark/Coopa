export * from "./vector";
export declare const createMatrix: (t?: string | number[] | undefined) => DOMMatrix;
export declare const createPoint: (x?: number | undefined, y?: number | undefined, z?: number | undefined, w?: number | undefined) => DOMPoint;
export declare const createRect: (x?: number | undefined, y?: number | undefined, width?: number | undefined, height?: number | undefined) => DOMRect;
export declare const mapMatrix: (matrix: DOMMatrix, cb: (i: number, j: number, val: number) => number) => void;
export declare const resetMatrix: (matrix: DOMMatrix) => void;
export declare const matrix3dValues: (matrix: DOMMatrix) => number[];
export declare const matrix3dToCSS: (matrix: DOMMatrix) => string;
export declare const matrix2dToCSS: (matrix: DOMMatrix) => string;
export declare const decomposeMatrix: (matrix: DOMMatrix) => {
    translate: {
        x: number;
        y: number;
        z: number;
    };
    rotate: {
        x: number;
        y: number;
        z: number;
    };
    scale: {
        x: number;
        y: number;
        z: number;
    };
};
