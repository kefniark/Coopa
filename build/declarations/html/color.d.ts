export declare class Color {
    color: {
        h: number;
        s: number;
        l: number;
    };
    static white: () => Color;
    static silver: () => Color;
    static gray: () => Color;
    static black: () => Color;
    static red: () => Color;
    static maroon: () => Color;
    static green: () => Color;
    static greenDeep: () => Color;
    static blue: () => Color;
    static navy: () => Color;
    static yellow: () => Color;
    static yellowPale: () => Color;
    static olive: () => Color;
    static aqua: () => Color;
    static cyan: () => Color;
    static teal: () => Color;
    static pink: () => Color;
    static purple: () => Color;
    static magenta: () => Color;
    static orange: () => Color;
    static rose: () => Color;
    static flamingo: () => Color;
    static kiwi: () => Color;
    static greenLime: () => Color;
    static greenPale: () => Color;
    static blueBolt: () => Color;
    static violet: () => Color;
    static blueSky: () => Color;
    static americanPallette(): Color[];
    static flatPallette(): Color[];
    static germanPallette(): Color[];
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
