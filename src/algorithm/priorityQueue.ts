import { BinarySearchTree } from "./binarySearchTree"
import { ArrayExt } from "../utils"

export enum PriorityQueueOrder {
	Lower = "lower",
	Higher = "higher"
}

/**
 * Simple priority queue based on the binary search tree
 *
 * Add
 *
 * @export
 * @class PriorityQueue
 * @template T
 */
export class PriorityQueue<T> {
	private tree: BinarySearchTree<number, T[]>
	private order: PriorityQueueOrder
	private length = 0

	get size() {
		return this.length
	}

	get priorityMin() {
		return this.tree.minKey
	}

	get priorityMax() {
		return this.tree.maxKey
	}

	constructor(order: PriorityQueueOrder = PriorityQueueOrder.Lower) {
		this.tree = new BinarySearchTree()
		this.order = order
	}

	/**
	 * Check if there are still element inside the queue
	 *
	 * @returns
	 */
	hasNext() {
		return this.length > 0
	}

	/**
	 * Add an element in the queue
	 *
	 * @param {number} priority
	 * @param {T} obj
	 */
	add(priority: number, obj: T) {
		let res = this.tree.get(priority) as T[]
		if (!res) res = []
		res.push(obj)
		this.tree.set(priority, res)
		this.length++
	}

	/**
	 * Add multiple element in the queue
	 *
	 * @param {number} priority
	 * @param {T[]} obj
	 */
	addMany(priority: number, obj: T[]) {
		let res = this.tree.get(priority) as T[]
		if (!res) res = []
		res = res.concat(obj)
		this.tree.set(priority, res)
		this.length += obj.length
	}

	/**
	 * Get the next element in the queue (first or last based on order)
	 *
	 * @returns {T}
	 */
	next() {
		if (!this.tree.isEmpty()) return undefined
		const entry = this.order === PriorityQueueOrder.Higher ? this.tree.max : this.tree.min
		const res = entry.val.pop()
		if (entry.val.length === 0) this.tree.delete(entry.key)
		this.length--
		return res
	}

	/**
	 * Get the next element in the queue
	 * (like .next() but let the value in the queue)
	 *
	 * @returns
	 */
	peek() {
		const entry = this.order === PriorityQueueOrder.Higher ? this.tree.max : this.tree.min
		return ArrayExt.last(entry.val)
	}

	toString() {
		return `[PriorityQueue: ${this.length} (${this.tree.minKey} < ${this.tree.maxKey})]`
	}
}
