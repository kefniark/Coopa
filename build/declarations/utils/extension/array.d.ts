export declare class ArrayExt {
    /**
     * Create an array of n elements with value val
     *
     * createSimilar(3, 2) -> [2, 2, 2]
     *
     * @param {number} n
     * @param {number} [val=0]
     * @returns
     */
    static createSimilar(n: number, val?: number): number[];
    /**
     * Create an array of n elements ordered starting at start
     *
     * createOrder(3, 1) -> [1, 2, 3]
     *
     * @param {number} n
     * @param {number} [start=1]
     * @returns
     */
    static createOrder(n: number, start?: number): number[];
    static create(n: number, cb: (index: number) => number): number[];
    static isEmpty<T>(arr: T[]): boolean;
    static clone<T>(arr: T[]): T[];
    static first<T>(arr: T[]): T;
    static last<T>(arr: T[]): T;
    static insert<T>(arr: T[], index: number, value: any): T[];
    static removeIndex<T>(arr: T[], index: number): T[];
    static remove<T>(arr: T[], element: any): T[];
    static sum(arr: number[]): number;
    static avg(arr: number[]): number;
    static random<T>(arr: T[]): T;
    static shuffle<T>(arr: T[]): T[];
}
