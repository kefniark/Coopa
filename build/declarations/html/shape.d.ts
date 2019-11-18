export declare function createImageContext(width: number | undefined, height: number | undefined, action: (ctx: CanvasRenderingContext2D) => void): string | undefined;
export interface IShapeCircle {
    size: number;
    lineWidth: number;
    color: string;
    strokeColor: string;
}
export declare function createCircle(options: Partial<IShapeCircle>): string | undefined;
