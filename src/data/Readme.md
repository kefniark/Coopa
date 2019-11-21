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
const path = grid.pathfinding(from, to, (arg) => isValid(arg.from, arg.to))
```

## Square Grid with walls

Generic 2D Grid with :
* walls between 2 tiles
* corners at the intersection of 4 tiles

```ts
import { SquareGridWall } from "coopa"

const grid = new SquareGridWall<string>(9, 9)

const cell = grid.getTile(4, 4)

// navigate around
cell.up()
cell.down()
cell.left()
cell.right()
cell.neighbors()

// check wall around
cell.upWall()
cell.downWall()
cell.leftWall()
cell.rightWall()
cell.walls()

```