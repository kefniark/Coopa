export declare class Color {
    color: {
        h: number;
        s: number;
        l: number;
    };
    constructor(h: number, s: number, l: number);
    private validate;
    private hue2rgb;
    clone(): Color;
    equals(color: Color): boolean;
    static random(): Color;
    static gradient(start: Color, end: Color, num?: number): Color[];
    static palette(hue: number, level?: number, seed?: number): Color[];
    rgb(): number[];
    private toHexByte;
    hex(): string;
    hsl(): number[];
    static fromHSL(hsl: number[]): Color;
    static fromHex(hex: string): Color;
    static fromRGB(rgb: number[]): Color;
}
