window.disableResize = true
;(async () => {
	// frame execution order
	const defaultUpdate = Fatina.ticker()
	const afterUpdate = Fatina.ticker()
	Fatina.setDefaultTicker(defaultUpdate)
	afterUpdate.addTick(() => Coopa.EventBus.update())

	// size
	const tileSize = (16 * 3) / 960
	const app = document.getElementById("app")

	// create grid
	const grid = new Coopa.SquareGridWall(12, 12, true, (i, j, type) => {
		if (type !== 0) return 0
		return i === 0 || i === 11 || j === 0 || j === 11 ? 1 : 0
	})

	// create block
	let nodes = grid.iterate().filter(val => {
		if (val.x === 4 && val.y >= 1 && val.y <= 9) return false // player position
		if (val.y === 4) return false
		if (val.type !== 0) return false // only tile
		return val.content() === 0
	})
	nodes = Coopa.ArrayExt.shuffle(nodes)
	for (let i = 0; i < 16; i++) {
		nodes.pop().set(1)
	}

	// create thin walls
	let nodes2 = grid.iterate().filter(val => {
		if (val.x === 4 && val.y >= 1 && val.y <= 9) return false
		if (val.y === 4) return false
		if (val.x <= 1 || val.x >= 10) return false
		if (val.y <= 1 || val.y >= 10) return false
		if (val.type !== 1 && val.type !== 2) return false // only walls
		if (val.type === 1 && (val.upWall().content() !== 0 || val.downWall().content() !== 0)) return false
		if (val.type === 2 && (val.rightWall().content() !== 0 || val.leftWall().content() !== 0)) return false
		return val.content() === 0
	})
	nodes2 = Coopa.ArrayExt.shuffle(nodes2)
	for (let i = 0; i < 6; i++) {
		nodes2.pop().set(1)
	}

	const tileGrid = new Map()
	const selected = new Set()

	// display Grid
	for (let x = 0; x < grid.widthTile; x++) {
		for (let y = 0; y < grid.heightTile; y++) {
			const tileData = grid.getTile(x, y)

			const tile = Coopa.createHTMLTransform("img", 960, () => {
				// console.log("Update Style", selected.size, tileData.index, tileData.toString(), selected.has(tileData.index) ? "Found" : "Nope")
				const alpha = selected.has(tileData.index) ? "0.5" : "1"
				return {
					opacity: alpha
				}
			})
			tile.transform.scale.set(tileSize, tileSize)
			tile.transform.position.set(x * tileSize - 0.5, y * tileSize - 0.5)
			Coopa.DOM.setAttr(tile.dom, { class: "tile" })

			if (tileData.content() === 0) {
				Coopa.DOM.setAttr(tile.dom, { src: `../../assets/dungeon/floor_1.png` })
				tile.transform.angle = 90 * Coopa.rng.randRangeInt(0, 1)
			} else if (tileData.content() === 1) {
				if (tileData.x === 0) {
					Coopa.DOM.setAttr(tile.dom, { src: "../../assets/dungeon/wall_inner_corner_mid_left.png" })
				} else if (tileData.x === 11) {
					Coopa.DOM.setAttr(tile.dom, { src: "../../assets/dungeon/wall_inner_corner_mid_rigth.png" })
				} else {
					Coopa.DOM.setAttr(tile.dom, { src: "../../assets/dungeon/wall_mid.png" })
				}
			} else if (tileData.content() === 2) {
				if (Math.random() > 0.8) {
					Coopa.DOM.setAttr(tile.dom, { src: "../../assets/dungeon/floor_spikes_anim_f3.png" })
				} else {
					Coopa.DOM.setAttr(tile.dom, { src: "../../assets/dungeon/hole.png" })
				}
			}
			app.appendChild(tile.dom)

			if (tileData.upWall().content() === 1) {
				const tileWallUp = Coopa.createHTMLTransform("img")
				tileWallUp.transform.scale.set(tileSize, tileSize)
				tileWallUp.transform.position.set(x * tileSize - 0.5, (y - 0.9) * tileSize - 0.5)
				Coopa.DOM.setAttr(tileWallUp.dom, { class: "tile wall" })
				Coopa.DOM.setAttr(tileWallUp.dom, { src: "../../assets/dungeon/wall_top_mid.png" })
				app.appendChild(tileWallUp.dom)
			}
			if (tileData.leftWall().content() === 1) {
				const tileWallLeft = Coopa.createHTMLTransform("img")
				tileWallLeft.transform.scale.set(tileSize, tileSize)
				tileWallLeft.transform.position.set((x - 0.1) * tileSize - 0.5, y * tileSize - 0.5)
				Coopa.DOM.setAttr(tileWallLeft.dom, { class: "tile wall" })
				Coopa.DOM.setAttr(tileWallLeft.dom, { src: "../../assets/dungeon/wall_side_mid_right.png" })
				app.appendChild(tileWallLeft.dom)
			}

			tileGrid.set(tileData.index, {
				tileData,
				tile
			})
		}
	}

	// start
	const tileStart = Coopa.createHTMLTransform("img")
	tileStart.transform.size.set(tileSize / 1.5, tileSize / 1.5)
	tileStart.transform.position.set(4 * tileSize - 0.5, 1 * tileSize - 0.5)
	Coopa.DOM.setAttr(tileStart.dom, { class: "tile" })
	Coopa.DOM.setAttr(tileStart.dom, { src: "../../assets/dungeon/knight_f_idle_anim_f0.png" })
	app.appendChild(tileStart.dom)

	const tileTarget = Coopa.createHTMLTransform("img")
	tileTarget.transform.size.set(tileSize / 1.5, tileSize / 1.5)
	tileTarget.transform.position.set(1 * tileSize - 0.5, 4 * tileSize - 0.5)
	Coopa.DOM.setAttr(tileTarget.dom, { class: "tile" })
	Coopa.DOM.setAttr(tileTarget.dom, { src: "../../assets/dungeon/swampy_idle_anim_f0.png" })
	app.appendChild(tileTarget.dom)

	const rayPoint = Coopa.createHTMLTransform("img")
	rayPoint.transform.size.set(tileSize / 4, tileSize / 4)
	rayPoint.transform.position.set(4 * tileSize - 0.5, 1 * tileSize - 0.5)
	Coopa.DOM.setAttr(rayPoint.dom, { class: "tile" })
	Coopa.DOM.setAttr(rayPoint.dom, { src: "../../assets/dungeon/coin_anim_f3.png" })
	app.appendChild(rayPoint.dom)

	const line = Coopa.createHTMLTransform("div")
	line.transform.pivot.set(0, 0.5)
	line.transform.position.set(tileStart.transform.position.x, tileStart.transform.position.y)
	Coopa.DOM.setAttr(line.dom, { class: "line" })
	app.appendChild(line.dom)

	function displayPosToGrid(pos) {
		return new Coopa.DOMVector2((pos.x + 0.5) / tileSize, (pos.y + 0.5) / tileSize)
	}
	Fatina.tween(tileTarget.transform.position)
		.to({ x: 9 * tileSize - 0.5 }, 5000)
		.yoyo(-1)
		.start()

	Fatina.tween(tileStart.transform.position)
		.to({ y: 9 * tileSize - 0.5 }, 12000)
		// .setSteps(7)
		.onUpdate(() => {
			const startLine = tileStart.transform.position
			const startPos = displayPosToGrid(startLine)
			const targetPos = displayPosToGrid(tileTarget.transform.position)

			// line
			const lineList = grid.line(startPos, targetPos)
			const aimLine = targetPos.subVecTo(startPos)

			line.transform.position.set(tileStart.transform.position.x, tileStart.transform.position.y)
			line.transform.scale.set(tileSize * aimLine.length, tileSize * 0.05)
			line.transform.angle = aimLine.angle()

			const hit = grid.raycast(startPos, aimLine.angle(), arg => {
				return arg.to.content() === 0 && arg.wall.content() === 0
			})
			if (hit) rayPoint.transform.position.set(hit.point.x * tileSize - 0.5, hit.point.y * tileSize - 0.5)

			// clean
			for (const s of selected) {
				tileGrid.get(s).tile.update()
			}
			selected.clear()

			// add new line selected
			let prev = lineList.shift()
			for (const linePoint of lineList) {
				const point = tileGrid.get(linePoint.index)
				const middle = grid.getInBetween(prev, linePoint)
				if (!middle || !point) continue
				if (middle.content() !== 0 || linePoint.content() !== 0) break
				selected.add(linePoint.index)
				point.tile.update()
				prev = linePoint
			}
		})
		.yoyo(-1)
		.start()
})()
