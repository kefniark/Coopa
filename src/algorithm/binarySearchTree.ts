// inspired by https://algs4.cs.princeton.edu/31elementary/

class TreeNode<Key extends number | string, Val> {
	public key: Key
	public val: Val
	public right: TreeNode<Key, Val>
	public left: TreeNode<Key, Val>
	constructor(key: Key, val: Val) {
		this.key = key
		this.val = val
	}
}

/**
 * Binary search tree
 * @template Key
 * @template Val
 */
export class BinarySearchTree<Key extends number | string, Val> {
	private root: TreeNode<Key, Val> | null

	/**
	 * Set tree node into the tree.
	 * @param key
	 * @param val
	 */
	public set(key: Key, val: Val): void {
		this.root = this.recursiveSet(this.root, key, val)
	}

	private recursiveSet(node: TreeNode<Key, Val> | null, key: Key, val: Val): TreeNode<Key, Val> {
		if (node == null) {
			return new TreeNode(key, val)
		}

		if (key < node.key) {
			node.left = this.recursiveSet(node.left, key, val)
		} else if (key > node.key) {
			node.right = this.recursiveSet(node.right, key, val)
		} else {
			node.val = val
		}
		return node
	}

	/**
	 * Gets Tree node by key from binary search tree
	 * @param key
	 * @returns get
	 */
	public get(key: Key): Val | null {
		return this.recursiveGet(this.root, key)
	}

	private recursiveGet(node: TreeNode<Key, Val> | null, key: Key): Val | null {
		if (node == null) return null
		if (key < node.key) {
			return this.recursiveGet(node.left, key)
		} else if (key > node.key) {
			return this.recursiveGet(node.right, key)
		} else {
			return node.val
		}
	}

	private recursiveDelMin(node: TreeNode<Key, Val>): TreeNode<Key, Val> {
		if (node.left == null) {
			return node.right
		}

		node.left = this.recursiveDelMin(node.left)
		return node
	}

	/**
	 * Deletes TreeNode by key from binary search tree
	 * @param key
	 */
	public delete(key: Key) {
		if (this.root) {
			this.root = this.delRecursively(this.root, key)
		}
	}

	/**
	 * Clear binary search tree
	 */
	public clear() {
		this.root = null
	}

	private delRecursively(node: TreeNode<Key, Val>, key: Key): TreeNode<Key, Val> {
		if (key < node.key) {
			node.left = this.delRecursively(node.left, key)
		} else if (key > node.key) {
			node.right = this.delRecursively(node.right, key)
		} else {
			if (node.right == null) {
				return node.left
			}
			if (node.left == null) {
				return node.right
			}

			const t = node
			node = this.min(node.right)
			node.right = this.recursiveDelMin(t.right)
			node.left = t.left
		}
		return node
	}

	private min(node: TreeNode<Key, Val>): TreeNode<Key, Val> {
		if (node.left == null) {
			return node
		}

		return this.min(node.left)
	}

	/**
	 * Return all tree nodes in binary search tree
	 * @returns entries
	 */
	public entries(): TreeNode<Key, Val>[] {
		const array: TreeNode<Key, Val>[] = []
		this.entriesRecursively(this.root, array)
		return array
	}

	private entriesRecursively(node: TreeNode<Key, Val> | null, array: TreeNode<Key, Val>[]) {
		if (node == null) {
			return
		}

		this.entriesRecursively(node.left, array)
		array.push(node)
		this.entriesRecursively(node.right, array)
	}

	/**
	 * Return all keys in binary search tree
	 * @returns keys
	 */
	public keys(): Key[] {
		const array: TreeNode<Key, Val>[] = []
		this.entriesRecursively(this.root, array)
		return array.map(x => x.key)
	}

	/**
	 * Return true if binary search tree contains key
	 * @param key
	 * @returns true if has
	 */
	public has(key: Key): boolean {
		const keys = this.keys()
		return keys.indexOf(key) > -1
	}

	/**
	 * Return all values in binary search tree
	 * @returns values
	 */
	public values(): Val[] {
		const array: TreeNode<Key, Val>[] = []
		this.entriesRecursively(this.root, array)
		return array.map(x => x.val)
	}

	/**
	 * Prints binary search tree
	 * Inspired by https://flaviocopes.com/golang-data-structure-binary-search-tree/
	 * @returns
	 */
	public print() {
		// Draw lines for debugging
		var maxHeight = this.getMaxHeight()
		if (maxHeight == 0) return
		var line = "--------"
		var current = ""
		for (var i = 0; i < maxHeight; i++) {
			current += line
		}

		console.log(current)
		this.stringify(this.root, 0)
		console.log(current)
	}

	private stringify(n: TreeNode<Key, Val> | null, level: number) {
		if (!n) return

		var format = ""
		for (var i = 0; i < level; i++) {
			format += "       "
		}

		format += "----[ "
		level++

		// change the order for logs to display smaller value to right
		this.stringify(n.right, level)
		console.log(format + n.key)
		this.stringify(n.left, level)
	}

	/**
	 * Return max height of Binary Search Tree
	 * @returns max height
	 */
	public getMaxHeight(): number {
		return this.getMaxHeightRecursively(this.root)
	}

	private getMaxHeightRecursively(node: TreeNode<Key, Val> | null): number {
		if (!node) return 0
		if (node.left == null && node.right == null) return 1

		return 1 + Math.max(this.getMaxHeightRecursively(node.left), this.getMaxHeightRecursively(node.right))
	}
}
