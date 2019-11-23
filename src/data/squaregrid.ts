import { inRange } from "../utils/index"
import { PriorityQueue } from "../algorithm/index"
import { ObjectExt } from "../extension"

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

export interface IPathfindingArg<T> {
	from: SquareGridNode<T>
	to: SquareGridNode<T>
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
	readonly diagonal: boolean
	protected cells: T[]
	protected map: Map<number, SquareGridNode<T>>

	constructor(width: number, height: number, diagonal = false, init?: (x: number, y: number) => T) {
		this.width = width
		this.height = height
		this.diagonal = diagonal
		this.cells = new Array(width * height)
		this.map = new Map()
		if (init) {
			for (let i = 0; i < this.cells.length; i++) {
				this.cells[i] = init(i % this.width, Math.floor(i / this.width))
			}
		}
	}

	protected getIndex(x: number, y: number) {
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
				if (inRange(y - 1, 0, this.height - 1)) neighbors.push(newNode.up())
				if (inRange(y + 1, 0, this.height - 1)) neighbors.push(newNode.down())
				if (inRange(x - 1, 0, this.width - 1)) neighbors.push(newNode.left())
				if (inRange(x + 1, 0, this.width - 1)) neighbors.push(newNode.right())
				if (this.diagonal) {
					const topLeft = inRange(x - 1, 0, this.width - 1) && inRange(y - 1, 0, this.height - 1)
					const topRight = inRange(x + 1, 0, this.width - 1) && inRange(y - 1, 0, this.height - 1)
					const bottomLeft = inRange(x - 1, 0, this.width - 1) && inRange(y + 1, 0, this.height - 1)
					const bottomRight = inRange(x + 1, 0, this.width - 1) && inRange(y + 1, 0, this.height - 1)

					if (topLeft) neighbors.push(newNode.up().left())
					if (topRight) neighbors.push(newNode.up().right())
					if (bottomLeft) neighbors.push(newNode.down().left())
					if (bottomRight) neighbors.push(newNode.down().right())
				}
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
			str += `${line.join("  ")}\n`
		}
		console.log(str)
	}

	private distanceToGoal(nodeA: SquareGridNode<T>, nodeB: SquareGridNode<T>) {
		return Math.hypot(nodeB.x - nodeA.x, nodeB.y - nodeA.y)
	}

	pathfinding(
		from: SquareGridNode<T>,
		to: SquareGridNode<T>,
		isValid: (arg: IPathfindingArg<T>) => boolean
	): SquareGridNode<T>[] {
		const parent = new Map<SquareGridNode<T>, { parent: SquareGridNode<T>; cost: number } | undefined>()
		const queue = new PriorityQueue<SquareGridNode<T>>()
		queue.add(1, from)
		parent.set(from, undefined)

		while (queue.hasNext()) {
			const node = queue.next() as SquareGridNode<T>
			if (node === to) {
				const res: SquareGridNode<T>[] = []
				let current: SquareGridNode<T> | undefined = node

				while (current) {
					const before = parent.get(current)
					if (before) res.push(current)
					current = before ? before.parent : undefined
				}
				return res.reverse()
			}

			const cur = parent.get(node)

			for (const next of node.neighbors()) {
				if (!isValid({ from: node, to: next })) continue
				const distanceToOrigin = cur ? cur.cost : 0
				if (parent.has(next)) continue
				const heuristic = distanceToOrigin + this.distanceToGoal(to, next)
				queue.add(heuristic, next)
				parent.set(next, { parent: node, cost: distanceToOrigin + 1 })
			}
		}

		return []
	}
}
