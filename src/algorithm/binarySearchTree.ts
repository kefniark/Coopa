class TreeNode<Key, Val> {
	public key: Key
	public val: Val
	public right: TreeNode<Key, Val>
	public left: TreeNode<Key, Val>
	constructor(key: Key, val: Val) {
		this.key = key
		this.val = val
	}
}

export class binarySearchTree<Key, Val> {
	private root: TreeNode<Key, Val>

	insert(key: Key, val: Val): void {
		this.root = this.recursiveInsert(this.root, key, val)
	}

	private recursiveInsert(node: TreeNode<Key, Val>, key: Key, val: Val): TreeNode<Key, Val> {
		if (node == null) {
			return new TreeNode(key, val)
		}

		if (key < node.key) {
			node.left = this.recursiveInsert(node.left, key, val)
		} else if (key > node.key) {
			node.right = this.recursiveInsert(node.right, key, val)
		} else {
			node.val = val
		}

		return node
	}

	public get(key: Key): Val | null {
		return this.recursiveGet(this.root, key)
	}

	private recursiveGet(x: TreeNode<Key, Val>, key: Key): Val | null {
		if (x == null) return null
		if (key < x.key) {
			return this.recursiveGet(x.left, key)
		} else if (key > x.key) {
			return this.recursiveGet(x.right, key)
		} else {
			return x.val
		}
	}

	public delMin() {
		this.root = this.recursiveDelMin(this.root)
	}

	private recursiveDelMin(node: TreeNode<Key, Val>): TreeNode<Key, Val> {
		if (node.left == null) {
			return node.right
		}

		node.left = this.recursiveDelMin(node.left)
		return node
	}

	public delete(key: Key) {
		if (!this.root) {
			this.root = this.recursiveDel(this.root, key)
		}
	}

	private recursiveDel(node: TreeNode<Key, Val>, key: Key): TreeNode<Key, Val> {
		if (key < node.key) {
			node.left = this.recursiveDel(node.left, key)
		} else if (key > node.key) {
			node.right = this.recursiveDel(node.right, key)
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

	public traverse(): TreeNode<Key, Val>[] {
		var array: TreeNode<Key, Val>[] = []
		this.iterate(this.root, array)
		return array
	}

	private iterate(node: TreeNode<Key, Val>, array: TreeNode<Key, Val>[]) {
		if (node == null) {
			return
		}

		this.iterate(node.left, array)
		array.push(node)
		this.iterate(node.right, array)
	}
}
