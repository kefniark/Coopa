/// <reference types="jest" />
import { SquareGridWall, SquareGridNodeType } from "../../src"

test("Create Grid", () => {
	const grid = new SquareGridWall<string>(9, 9, false, (i, j, type) => {
		// center
		if (i === 4 && j === 4) return "0"
		if (i === 3 && j === 3) return "1"
		if (i === 3 && j === 4) return "2"
		if (i === 4 && j === 3) return "3"

		if (type === SquareGridNodeType.HWALL && j === -0.5) return "-"
		if (type === SquareGridNodeType.HWALL && j === 3.5) return "-"
		if (type === SquareGridNodeType.HWALL && j === 5.5) return "-"
		if (type === SquareGridNodeType.HWALL && j === 8.5) return "-"

		if (type === SquareGridNodeType.VWALL && i === -0.5) return "|"
		if (type === SquareGridNodeType.VWALL && i === 8.5) return "|"
		if (type === SquareGridNodeType.VWALL && i === 3.5) return "|"

		if (type === SquareGridNodeType.CORNER) return "□"

		// border
		return type === SquareGridNodeType.TILE && (i === 0 || i === 8 || j === 0 || j === 8) ? "X" : " "
	})

	const center = grid.getTile(4, 4)

	grid.print()

	expect(center.content()).toBe("0")
	expect(center.up().content()).toBe("3")
	expect(center.left().content()).toBe("2")

	expect(grid.getTile(4, 4, SquareGridNodeType.CORNER).content()).toBe("□")
	expect(grid.getTile(4, 4, SquareGridNodeType.HWALL).content()).toBe("-")
	expect(grid.getTile(4, 4, SquareGridNodeType.VWALL).content()).toBe("|")

	const grid2 = new SquareGridWall<number>(3, 4)
	expect(grid2.widthTile).toBe(3)
	expect(grid2.heightTile).toBe(4)
	expect(grid2.width).toBe(7)
	expect(grid2.height).toBe(9)

	expect(grid2.getNode(2,2).toString()).toBe("")
	expect(grid2.getNode(2,2).content()).toBeUndefined()
	expect(grid2.getNode(64,2).content()).toBeUndefined()
})

test("Pathfinding", () => {
	const grid = new SquareGridWall<string>(9, 9, false, (i, j, type) => {
		// center
		if (type === SquareGridNodeType.HWALL && j === -0.5) return "-"
		if (type === SquareGridNodeType.HWALL && j === 3.5 && i > 1 && i < 7) return "-"
		if (type === SquareGridNodeType.HWALL && j === 5.5 && i > 1 && i < 7) return "-"
		if (type === SquareGridNodeType.HWALL && j === 8.5) return "-"

		if (type === SquareGridNodeType.VWALL && i === -0.5) return "|"
		if (type === SquareGridNodeType.VWALL && i === 8.5) return "|"
		if (type === SquareGridNodeType.VWALL && i === 3.5 && j > 1) return "|"

		if (type === SquareGridNodeType.CORNER) return " "

		// border
		return " "
	})

	expect(grid.getTile(2, 2).neighbors().length).toBe(4)
	expect(grid.getTile(0, 0).neighbors().length).toBe(2)
	expect(grid.getTile(8, 0).neighbors().length).toBe(2)
	expect(grid.getTile(8, 8).neighbors().length).toBe(2)
	expect(grid.getTile(0, 8).neighbors().length).toBe(2)

	grid.getTile(3, 7).set("0")
	grid.getTile(5, 5).set("0")
	grid.print()

	const pathway = grid.pathfinding(grid.getTile(3, 7), grid.getTile(5, 5), arg => {
		if (arg.to.content() !== " " && arg.to.content() !== "0") return false
		if (arg.wall.content() !== " ") return false
		return true
	})

	for (const path of pathway) {
		path.set(".")
	}

	grid.print()
})

test("Pathfinding with diagonal", () => {
	const grid = new SquareGridWall<string>(9, 9, true, (i, j, type) => {
		// center
		if (type === SquareGridNodeType.HWALL && j === -0.5) return "-"
		if (type === SquareGridNodeType.HWALL && j === 3.5 && i > 1 && i < 7) return "-"
		if (type === SquareGridNodeType.CORNER && j === 3.5 && i > 1 && i < 7) return "□"
		if (type === SquareGridNodeType.HWALL && j === 5.5 && i > 1 && i < 7) return "-"
		if (type === SquareGridNodeType.CORNER && j === 5.5 && i > 1 && i < 7) return "□"
		if (type === SquareGridNodeType.HWALL && j === 8.5) return "-"

		if (type === SquareGridNodeType.VWALL && i === -0.5) return "|"
		if (type === SquareGridNodeType.VWALL && i === 8.5) return "|"
		if (type === SquareGridNodeType.VWALL && i === 3.5 && j > 1) return "|"
		if (type === SquareGridNodeType.CORNER && i === 3.5 && j > 1) return "□"

		if (type === SquareGridNodeType.CORNER) return " "

		// border
		return " "
	})

	expect(grid.getTile(2, 2).neighbors().length).toBe(8)
	expect(grid.getTile(0, 0).neighbors().length).toBe(3)
	expect(grid.getTile(8, 0).neighbors().length).toBe(3)
	expect(grid.getTile(8, 8).neighbors().length).toBe(3)
	expect(grid.getTile(0, 8).neighbors().length).toBe(3)
	expect(grid.getTile(2, 2).walls().length).toBe(4)
	expect(grid.getTile(0, 0).leftWall().upWall().walls().length).toBe(2)
	expect(grid.getTile(8, 8).rightWall().downWall().walls().length).toBe(2)

	grid.getTile(3, 7).set("0")
	grid.getTile(5, 5).set("0")

	expect(grid.getTile(3, 7).content()).toBe("0")
	grid.print()

	const pathway = grid.pathfinding(grid.getTile(3, 7), grid.getTile(5, 5), arg => {
		if (arg.to.content() !== " " && arg.to.content() !== "0") return false
		if (arg.wall.content() !== " ") return false
		return true
	})

	for (const path of pathway) {
		path.set(".")
	}

	grid.print()

	expect(grid.getTile(5, 5).walls().length).toBe(4)
	expect(grid.getTile(5, 5).toString()).not.toBeUndefined()
})
