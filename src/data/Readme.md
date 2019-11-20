# Data

## Square Grid

Generic 2D Grid implementation

### Usage

```ts
import { SquareGrid } from "coopa"

const grid = new SquareGrid<number>(5, 5) // create 5x5 grid

const cell = grid.getNode(2, 2) // get a cell and navigate around the grid
cell.content() // get the content of a cell
cell.set(5) // set the content of a cell

// navigate around
cell.up()
cell.down()
cell.left()
cell.right()
cell.neighbors()

// debug method
grid.print()

// pathfinding between 2 points (walk only on valid tiles)
const from = grid.getNode(1, 1)
const to = grid.getNode(3, 4)
const path = grid.pathfinding(from, to, (node) => isValid(node))
```