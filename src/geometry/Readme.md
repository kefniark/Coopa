# Geometry API

Based on DOM Geometry Interfaces Module Level 1

Only provide polyfill for platform without `DOMMatrix`, `DOMPoint`, `DOMRect`.

But use the browser native implementation if possible.

## DOMMatrix
https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix

```ts
let mat: DOMMatrix = createMatrix()
mat.translateSelf(x, y, z)
mat.rotateSelf(x, y, z)
```

and add few helpers:
* `mapMatrix(matrix: DOMMatrix, (i: number, j: number, val: number) => number)`
* `resetMatrix(matrix: DOMMatrix)` -> set it to identity values
* `matrix3dValues(matrix: DOMMatrix)` -> convert matrix3d to number[]
* `matrix3dToCSS(matrix: DOMMatrix)` -> convert to css Matrix 3d
* `matrix2dToCSS(matrix: DOMMatrix)` -> convert to css Matrix 2d

## DOMPoint
https://developer.mozilla.org/en-US/docs/Web/API/DOMPoint

```ts
let point: DOMPoint = createPoint(x, y)
point.matrixTransform(mat)
```

## DOMRect
https://developer.mozilla.org/en-US/docs/Web/API/DOMRect

```ts
let rect: DOMRect = createRect(x, y, width, height)
rect.top
rect.left
rect.right
rect.bottom
```