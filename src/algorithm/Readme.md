# Algorithm API

## Binary search tree

Simple typed [BST](https://en.wikipedia.org/wiki/Binary_search_tree) implementation

## Usage

```ts
import { BinarySearchTree } from "coopa"

const bst = new BinarySearchTree<number, User>()

// property
bst.height

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