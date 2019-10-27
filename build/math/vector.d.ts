export declare class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    set(x: number, y: number): void;
    clone(): Vector2;
    add(vector: Vector2): Vector2;
    subtract(vector: Vector2): Vector2;
    scale(scalar: number): Vector2;
    dot(vector: Vector2): number;
    moveTowards(vector: Vector2, t: number): Vector2;
    magnitude(): number;
    magnitudeSqr(): number;
    distance(vector: Vector2): number;
    distanceSqr(vector: Vector2): number;
    normalize(): Vector2;
    angle(): number;
    rotate(alpha: number): Vector2;
    toPrecision(precision: number): Vector2;
    toString(): string;
}
