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

	public toString() {
		this.print("", this, false)
	}
	private print(prefix: string, node: TreeNode<Key, Val>, isLeft: boolean) {
		if (node != null) {
			console.log(prefix + (isLeft ? "|-- " : "\\-- ") + node.key)
			this.print(prefix + (isLeft ? "|   " : "    "), node.left, true)
			this.print(prefix + (isLeft ? "|   " : "    "), node.right, false)
		}
	}
}

export class BinarySearchTree<Key extends number | string, Val> {
	private root: TreeNode<Key, Val> | null

	set(key: Key, val: Val): void {
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

	public delete(key: Key) {
		if (this.root) {
			this.root = this.delRecursively(this.root, key)
		}
	}

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

			var t = node
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

	public entries(): TreeNode<Key, Val>[] {
		var array: TreeNode<Key, Val>[] = []
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

	public keys(): Key[] {
		var array: Key[] = []
		this.keyRecursively(this.root, array)
		return array
	}

	public has(key: Key): boolean {
		var keys = this.keys()
		return keys.indexOf(key) > -1
	}

	private keyRecursively(node: TreeNode<Key, Val> | null, array: Key[]) {
		if (node == null) {
			return
		}

		this.keyRecursively(node.left, array)
		array.push(node.key)
		this.keyRecursively(node.right, array)
	}

	public values(): Val[] {
		var array: Val[] = []
		this.valRecursively(this.root, array)
		return array
	}

	private valRecursively(node: TreeNode<Key, Val> | null, array: Val[]) {
		if (node == null) {
			return
		}

		this.valRecursively(node.left, array)
		array.push(node.val)
		this.valRecursively(node.right, array)
	}

	public print() {
		if (this.root != null) {
			return this.root.toString()
		}

		return ""
	}
}
