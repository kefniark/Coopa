# Algorithm API

## Binary search tree

Simple typed [BST](https://en.wikipedia.org/wiki/Binary_search_tree) implementation

### Usage

```ts
import { BinarySearchTree } from "coopa"

const bst = new BinarySearchTree<number, User>()

// property
bst.height
bst.minKey // -> key maximum (on the right of the tree)
bst.maxKey // -> key minimum (on the left of the tree)

// data manipulation
bst.set(1, { name: "bob" })
bst.get(1) // -> { name: "bob" }
bst.delete(1)
bst.clear()

// iterate
bst.entries() // -> [{ name: "bob" }]
bst.values() // -> [1]

// debug
bst.print()
```

## Priority queue

Simple typed [Priority Queue](https://en.wikipedia.org/wiki/Priority_queue) implementation, based on the previous BST

### Usage

```ts
import { PriorityQueue } from "coopa"

const queue = new PriorityQueue<string>()

// property
queue.size
queue.priorityMin
queue.priorityMax

// data manipulation
queue.add(5, "tuna") // add "tuna" with the priority "5"
queue.next() // <= tuna
```