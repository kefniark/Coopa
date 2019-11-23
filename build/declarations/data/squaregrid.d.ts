export interface SquareGridNode<T> {
    x: number;
    y: number;
    index: number;
    up(): SquareGridNode<T>;
    down(): SquareGridNode<T>;
    left(): SquareGridNode<T>;
    right(): SquareGridNode<T>;
    neighbors(): SquareGridNode<T>[];
    content(): T | undefined;
    set(val: T): void;
    toString(): string;
}
export interface IPathfindingArg<T> {
    from: SquareGridNode<T>;
    to: SquareGridNode<T>;
}
/**
 * Implementation of 2D Grid
 *
 * @export
 * @class SquareGrid
 * @template T
 */
export declare class SquareGrid<T> {
    readonly width: number;
    readonly height: number;
    readonly diagonal: boolean;
    protected cells: T[];
    protected map: Map<number, SquareGridNode<T>>;
    constructor(width: number, height: number, diagonal?: boolean, init?: (x: number, y: number) => T);
    protected getIndex(x: number, y: number): number;
    getNode(x: number, y: number): SquareGridNode<T>;
    print(): void;
    private distanceToGoal;
    pathfinding(from: SquareGridNode<T>, to: SquareGridNode<T>, isValid: (arg: IPathfindingArg<T>) => boolean): SquareGridNode<T>[];
}
