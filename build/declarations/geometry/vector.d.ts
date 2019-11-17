export declare class DOMVector2 {
    get length(): number;
    get lengthSquared(): number;
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    clone(): DOMVector2;
    set(x?: number, y?: number): this;
    invert(): this;
    negate(): this;
    normalize(): this;
    add(x?: number, y?: number): this;
    round(decimals?: number): this;
    scale(x?: number, y?: number): this;
    toString(): string;
}
export declare class DOMVector3 {
    get length(): number;
    get lengthSquared(): number;
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    clone(): DOMVector3;
    set(x?: number, y?: number, z?: number): this;
    invert(): this;
    negate(): this;
    normalize(): this;
    add(x?: number, y?: number, z?: number): this;
    addVec(vec: DOMVector3): void;
    round(decimals?: number): this;
    scaleTo(val?: number): this;
    scale(x?: number, y?: number, z?: number): this;
    dot(vec: DOMVector3): number;
    cross(vec: DOMVector3): this;
    toString(): string;
}
