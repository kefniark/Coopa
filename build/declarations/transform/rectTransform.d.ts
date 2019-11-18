import { TransformMatrix } from "./transform";
import { DOMVector2 } from "../geometry/index";
/**
 * Extend Transform matrix and add simple layout system with pivot, anchor and size
 *
 * @export
 * @class RectTransformMatrix
 */
export declare class RectTransformMatrix extends TransformMatrix {
    protected _parent: RectTransformMatrix | undefined;
    protected _child: RectTransformMatrix[];
    get parent(): RectTransformMatrix | undefined;
    set parent(p: RectTransformMatrix | undefined);
    get angle(): number;
    set angle(val: number);
    get compensatedSize(): DOMVector2;
    get localOrigin(): DOMPoint;
    get globalOrigin(): DOMPoint;
    get globalMatrix(): DOMMatrix;
    protected rectMatrix: DOMMatrix;
    protected computedtMatrix: DOMMatrix;
    pivot: DOMVector2;
    anchor: DOMVector2;
    size: DOMVector2;
    skew: DOMVector2;
    res: DOMVector2;
    constructor(x?: number, y?: number);
    setParentFix(p: RectTransformMatrix | undefined): void;
    computeRect(updateChild?: boolean): void;
    compute(): void;
    toCSS(): {
        transform: string;
    };
}
