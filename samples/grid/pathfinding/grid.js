window.disableResize = true
function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

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
	const grid = new Coopa.SquareGrid(12, 12, true, (i, j) => {
		return i === 0 || i === 11 || j === 0 || j === 11 ? 1 : 0
	})

	// create holes
	let nodes = grid.iterate().filter(val => val.x > 2 && val.x < 10 && val.y >= 1 && val.y < 11)
	nodes = Coopa.ArrayExt.shuffle(nodes)
	for (let i = 0; i < 24; i++) {
		nodes.pop().set(2)
	}

	// display Grid
	for (let x = 0; x < grid.width; x++) {
		for (let y = 0; y < grid.height; y++) {
			const tileData = grid.getNode(x, y)

			const tile = Coopa.createHTMLTransform("img")
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
		}
	}

	// start
	const tileStart = Coopa.createHTMLTransform("img")
	tileStart.transform.size.set(tileSize / 1.5, tileSize / 1.5)
	tileStart.transform.position.set(1 * tileSize - 0.5, 1 * tileSize - 0.5)
	Coopa.DOM.setAttr(tileStart.dom, { class: "tile" })
	Coopa.DOM.setAttr(tileStart.dom, { src: "../../assets/dungeon/knight_f_idle_anim_f0.png" })
	app.appendChild(tileStart.dom)

	const tileGoal = Coopa.createHTMLTransform("img")
	tileGoal.transform.size.set(tileSize / 2, tileSize / 2)
	tileGoal.transform.position.set(10 * tileSize - 0.5, 10 * tileSize - 0.5)
	Coopa.DOM.setAttr(tileGoal.dom, { class: "tile" })
	Coopa.DOM.setAttr(tileGoal.dom, { src: "../../assets/dungeon/chest_empty_open_anim_f0.png" })
	app.appendChild(tileGoal.dom)

	// pathfinding
	const pathway = grid.pathfinding(grid.getNode(1, 1), grid.getNode(10, 10), arg => arg.to.content() === 0)
	pathway.pop()

	await timeout(1000)
	for (const path of pathway) {
		const tile = Coopa.createHTMLTransform("img")
		tile.transform.scale.set(tileSize / 2, tileSize / 2)
		tile.transform.position.set(path.x * tileSize - 0.5, path.y * tileSize - 0.5)
		Coopa.DOM.setAttr(tile.dom, { class: "tile" })
		Coopa.DOM.setAttr(tile.dom, { src: "../../assets/dungeon/coin_anim_f0.png" })
		app.appendChild(tile.dom)

		Fatina.shake(tile.transform, {
			duration: 800,
			amplitude: 0.1,
			scaleFactor: 0.1
		})
			.onComplete(() => {
				Fatina.tween(tile.transform.position)
					.to({ y: -tileSize * 0.1 }, Coopa.rng.randRangeInt(350, 600))
					.setEasing("inOutCirc")
					.setRelative(true)
					.yoyo(-1)
					.start()
			})
			.start()
		await timeout(500)
	}
})()
