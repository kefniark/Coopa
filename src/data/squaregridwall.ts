import { inRange } from "../math/math"
import { ObjectExt, ArrayExt } from "../utils"
import { SquareGrid, SquareGridNode } from "./squaregrid"

export enum SquareGridNodeType {
	TILE = 0,
	HWALL = 1,
	VWALL = 2,
	CORNER = 3
}

export interface SquareGridWallNode<T> extends SquareGridNode<T> {
	x: number
	y: number
	index: number

	up(): SquareGridWallNode<T>
	down(): SquareGridWallNode<T>
	left(): SquareGridWallNode<T>
	right(): SquareGridWallNode<T>

	upWall(): SquareGridWallNode<T>
	downWall(): SquareGridWallNode<T>
	leftWall(): SquareGridWallNode<T>
	rightWall(): SquareGridWallNode<T>

	neighbors(): SquareGridWallNode<T>[]
	walls(): SquareGridWallNode<T>[]
	content(): T | undefined
	set(val: T): void
	toString(): string
}

/**
 * Implementation of 2D Grid with thin walls
 *
 * @export
 * @class SquareGrid
 * @template T
 */
export class SquareGridWall<T> extends SquareGrid<T> {
	readonly widthTile: number
	readonly heightTile: number
	protected map: Map<number, SquareGridWallNode<T>>

	constructor(
		width: number,
		height: number,
		diagonal = false,
		init?: (x: number, y: number, type: SquareGridNodeType) => T
	) {
		super(width * 2 + 1, height * 2 + 1, diagonal)
		this.widthTile = width
		this.heightTile = height
		if (init) {
			// init tiles
			for (let i = 0; i < this.widthTile; i++) {
				for (let j = 0; j < this.heightTile; j++) {
					const index = this.getIndex(i * 2 + 1, j * 2 + 1)
					this.cells[index] = init(i, j, SquareGridNodeType.TILE)
				}
			}

			// init walls
			for (let i = 0; i < this.widthTile + 1; i++) {
				for (let j = 0; j < this.heightTile + 1; j++) {
					// corner
					const indexCorner = this.getIndex(i * 2, j * 2)
					this.cells[indexCorner] = init(i - 0.5, j - 0.5, SquareGridNodeType.CORNER)

					// left
					const indexLeft = this.getIndex(i * 2, j * 2 + 1)
					this.cells[indexLeft] = init(i - 0.5, j, SquareGridNodeType.VWALL)

					// top
					if (i < this.widthTile) {
						const indexTop = this.getIndex(i * 2 + 1, j * 2)
						this.cells[indexTop] = init(i, j - 0.5, SquareGridNodeType.HWALL)
					}
				}
			}
		}
	}

	getTile(x: number, y: number, type = SquareGridNodeType.TILE): SquareGridWallNode<T> {
		if (type === SquareGridNodeType.CORNER) return this.getNode(x * 2, y * 2)
		else if (type === SquareGridNodeType.VWALL) return this.getNode(x * 2, y * 2 + 1)
		else if (type === SquareGridNodeType.HWALL) return this.getNode(x * 2 + 1, y * 2)
		return this.getNode(x * 2 + 1, y * 2 + 1)
	}

	getNode(x: number, y: number): SquareGridWallNode<T> {
		const index = this.getIndex(x, y)

		const node = this.map.get(index)
		if (node) return node

		const newNode = {
			x,
			y,
			index,

			up: () => this.getNode(x, y - 2),
			down: () => this.getNode(x, y + 2),
			right: () => this.getNode(x + 2, y),
			left: () => this.getNode(x - 2, y),

			upWall: () => this.getNode(x, y - 1),
			downWall: () => this.getNode(x, y + 1),
			rightWall: () => this.getNode(x + 1, y),
			leftWall: () => this.getNode(x - 1, y),

			walls: () => {
				const neighbors: SquareGridWallNode<T>[] = []
				if (inRange(y - 1, 0, this.height)) neighbors.push(newNode.upWall())
				if (inRange(y + 1, 0, this.height - 1)) neighbors.push(newNode.downWall())
				if (inRange(x - 1, 0, this.width)) neighbors.push(newNode.leftWall())
				if (inRange(x + 1, 0, this.width - 1)) neighbors.push(newNode.rightWall())
				return neighbors
			},

			neighbors: () => {
				const neighbors: SquareGridWallNode<T>[] = []
				if (inRange(y - 2, 0, this.height)) neighbors.push(newNode.up())
				if (inRange(y + 2, 0, this.height - 2)) neighbors.push(newNode.down())
				if (inRange(x - 2, 0, this.width)) neighbors.push(newNode.left())
				if (inRange(x + 2, 0, this.width - 2)) neighbors.push(newNode.right())
				if (this.diagonal) {
					const topLeft = inRange(x - 2, 0, this.width) && inRange(y - 2, 0, this.height)
					const topRight = inRange(x + 2, 0, this.width) && inRange(y - 2, 0, this.height)
					const bottomLeft = inRange(x - 2, 0, this.width) && inRange(y + 2, 0, this.height)
					const bottomRight = inRange(x + 2, 0, this.width) && inRange(y + 2, 0, this.height)

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
		} as SquareGridWallNode<T>

		if (ObjectExt.IsDefined(newNode.content)) this.map.set(index, newNode)
		return newNode
	}

	pathfinding(
		from: SquareGridWallNode<T>,
		to: SquareGridWallNode<T>,
		isValid: (arg: IPathfindingWallArg<T>) => boolean
	): SquareGridNode<T>[] {
		return super.pathfinding(from, to, arg => {
			const middle = this.getNode(ArrayExt.avg([arg.from.x, arg.to.x]), ArrayExt.avg([arg.from.y, arg.to.y]))
			return isValid({
				from: arg.from as SquareGridWallNode<T>,
				to: arg.from as SquareGridWallNode<T>,
				wall: middle
			} as IPathfindingWallArg<T>)
		})
	}
}

export interface IPathfindingWallArg<T> {
	from: SquareGridWallNode<T>
	to: SquareGridWallNode<T>
	wall: SquareGridWallNode<T>
}
