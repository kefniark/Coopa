import { inRange } from "../math/math"
import { ObjectExt } from "../utils"
import { PriorityQueue } from "../algorithm"

export interface SquareGridNode<T> {
	x: number
	y: number
	index: number
	up(): SquareGridNode<T>
	down(): SquareGridNode<T>
	left(): SquareGridNode<T>
	right(): SquareGridNode<T>
	neighbors(): SquareGridNode<T>[]
	content(): T | undefined
	set(val: T): void
	toString(): string
}

/**
 * Implementation of 2D Grid
 *
 * @export
 * @class SquareGrid
 * @template T
 */
export class SquareGrid<T> {
	readonly width: number
	readonly height: number
	private cells: T[]
	private map: Map<number, SquareGridNode<T>>

	constructor(width: number, height: number, init?: (x: number, y: number) => T) {
		this.width = width
		this.height = height
		this.cells = new Array(width * height)
		this.map = new Map()
		if (init) {
			for (let i = 0; i < this.cells.length; i++) {
				this.cells[i] = init(i % this.width, Math.floor(i / this.width))
			}
		}
	}

	private getIndex(x: number, y: number) {
		return y * this.width + x
	}

	getNode(x: number, y: number): SquareGridNode<T> {
		const index = this.getIndex(x, y)

		const node = this.map.get(index)
		if (node) return node

		const newNode = {
			x,
			y,
			index,
			up: () => this.getNode(x, y - 1),
			down: () => this.getNode(x, y + 1),
			right: () => this.getNode(x + 1, y),
			left: () => this.getNode(x - 1, y),
			neighbors: () => {
				const neighbors = []
				if (inRange(y - 1, 0, this.height)) neighbors.push(newNode.up())
				if (inRange(y + 1, 0, this.height - 1)) neighbors.push(newNode.down())
				if (inRange(x - 1, 0, this.width)) neighbors.push(newNode.left())
				if (inRange(x + 1, 0, this.width - 1)) neighbors.push(newNode.right())
				return neighbors
			},
			content: () => {
				return inRange(index, 0, this.cells.length) ? this.cells[index] : undefined
			},
			set: (val: T) => {
				this.cells[index] = val
			},
			toString: () => (ObjectExt.IsDefined(newNode.content()) ? newNode.content() : "")
		} as SquareGridNode<T>

		if (ObjectExt.IsDefined(newNode.content)) this.map.set(index, newNode)
		return newNode
	}

	print() {
		let str = ""
		for (let y = 0; y < this.height; y++) {
			const line: string[] = []
			for (let x = 0; x < this.width; x++) {
				line.push(this.getNode(x, y).toString())
			}
			str += `| ${line.join("  ")} |\n`
		}
		console.log(str)
	}

	private distanceNode(nodeA: SquareGridNode<T>, nodeB: SquareGridNode<T>) {
		return Math.hypot(nodeB.x - nodeA.x, nodeB.y - nodeA.y)
	}

	pathfinding(
		from: SquareGridNode<T>,
		to: SquareGridNode<T>,
		isValid: (node: SquareGridNode<T>) => boolean
	): SquareGridNode<T>[] {
		const parent = new Map<SquareGridNode<T>, SquareGridNode<T> | undefined>()
		const queue = new PriorityQueue<SquareGridNode<T>>()
		queue.add(1, from)
		parent.set(from, undefined)

		while (queue.hasNext()) {
			const node = queue.next()
			if (!node) continue
			if (node === to) {
				const res: SquareGridNode<T>[] = []
				let current: SquareGridNode<T> | undefined = node

				while (current) {
					const before = parent.get(current)
					if (before) res.push(current)
					current = before
				}
				return res.reverse()
			}

			for (const next of node.neighbors()) {
				if (!isValid(next)) continue
				if (parent.has(next)) continue
				queue.add(this.distanceNode(to, next), next)
				parent.set(next, node)
			}
		}

		return []
	}
}
