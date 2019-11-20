/// <reference types="jest" />
import { SquareGrid } from "../../src"

test("Create 2d grid", () => {
	// create a grid
	const grid = new SquareGrid<number>(9, 7, (i, j) => {
		// center
		if (i === 4 && j === 3) return 2

		// border
		return i === 0 || i === 8 || j === 0 || j === 6 ? 1 : 0
	})

	// set few extra values
	const center = grid.getNode(4, 3)
	grid.getNode(4, 3 - 1).set(3)
	grid.getNode(4, 3 + 1).set(4)
	grid.getNode(4 - 1, 3).set(5)
	grid.getNode(4 + 1, 3).set(6)

	// for debug purpose
	grid.print()

	// check center
	expect(center.up().content()).toBe(3)
	expect(center.down().content()).toBe(4)
	expect(center.left().content()).toBe(5)
	expect(center.right().content()).toBe(6)
	expect(center.neighbors().length).toBe(4)

	// check cell corners
	const topleft = grid.getNode(0, 0)
	const bottomright = grid.getNode(8, 6)
	expect(topleft.neighbors().length).toBe(2)
	expect(bottomright.neighbors().length).toBe(2)
	expect(topleft.up().content()).toBeUndefined()
	expect(bottomright.down().content()).toBeUndefined()

	// check cell outside
	const outside = grid.getNode(9, 7)
	expect(outside.neighbors().length).toBe(2)
})

test("Pathfinding", () => {
	const grid = new SquareGrid<number | string>(16, 10, (i, j) => {
		// center
		if (i === 4 && j >= 2 && j <= 10) return "X"
		if (i === 6 && j >= 3 && j <= 6) return "X"
		if (i === 7 && j >= 0 && j <= 4) return "X"
		if (i === 13 && j >= 2 && j <= 10) return "X"

		// border
		return i === 0 || i === 15 || j === 0 || j === 9 ? "X" : " "
	})

	grid.getNode(1, 3).set("0")
	grid.getNode(14, 8).set("0")

	grid.print()

	const pathway = grid.pathfinding(grid.getNode(1, 3), grid.getNode(14, 8), node => node.content() !== "X")
	for (const path of pathway) {
		path.set("-")
	}

	grid.print()

	const path2 = grid.pathfinding(grid.getNode(-1, -1), grid.getNode(14, 8), node => node.content() !== "X")
	expect(path2).toEqual([])
})
