export declare class SeededRandom {
    private seed;
    constructor(seed: number);
    private next;
    rand(): number;
    randBool(): boolean;
    randRangeFloat(min: number, max: number): number;
    randRangeInt(min: number, max: number): number;
    randArray<T>(arr: T[]): T;
}
export declare class Random {
    rand(): number;
    randBool(): boolean;
    randRangeFloat(min: number, max: number, rng?: number): number;
    randRangeInt(min: number, max: number, rng?: number): number;
    randArray<T>(arr: T[]): T;
    createSeededRandom(seed?: number): SeededRandom;
}
export declare const rng: Random;
