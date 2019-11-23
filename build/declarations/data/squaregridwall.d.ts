import { SquareGrid, SquareGridNode } from "./squaregrid";
export declare enum SquareGridNodeType {
    TILE = 0,
    HWALL = 1,
    VWALL = 2,
    CORNER = 3
}
export interface SquareGridWallNode<T> extends SquareGridNode<T> {
    x: number;
    y: number;
    index: number;
    up(): SquareGridWallNode<T>;
    down(): SquareGridWallNode<T>;
    left(): SquareGridWallNode<T>;
    right(): SquareGridWallNode<T>;
    upWall(): SquareGridWallNode<T>;
    downWall(): SquareGridWallNode<T>;
    leftWall(): SquareGridWallNode<T>;
    rightWall(): SquareGridWallNode<T>;
    neighbors(): SquareGridWallNode<T>[];
    walls(): SquareGridWallNode<T>[];
    content(): T | undefined;
    set(val: T): void;
    toString(): string;
}
/**
 * Implementation of 2D Grid with thin walls
 *
 * @export
 * @class SquareGrid
 * @template T
 */
export declare class SquareGridWall<T> extends SquareGrid<T> {
    readonly widthTile: number;
    readonly heightTile: number;
    protected map: Map<number, SquareGridWallNode<T>>;
    constructor(width: number, height: number, diagonal?: boolean, init?: (x: number, y: number, type: SquareGridNodeType) => T);
    getTile(x: number, y: number, type?: SquareGridNodeType): SquareGridWallNode<T>;
    getNode(x: number, y: number): SquareGridWallNode<T>;
    pathfinding(from: SquareGridWallNode<T>, to: SquareGridWallNode<T>, isValid: (arg: IPathfindingWallArg<T>) => boolean): SquareGridNode<T>[];
}
export interface IPathfindingWallArg<T> {
    from: SquareGridWallNode<T>;
    to: SquareGridWallNode<T>;
    wall: SquareGridWallNode<T>;
}
