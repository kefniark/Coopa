const rootTransform = new Coopa.RectTransformMatrix(960, 960)
rootTransform.position.set(0, -0.2)
rootTransform.pivot.set(0.5, 0)
rootTransform.anchor.set(0.5, 0)
rootTransform.scale.set(0.4, 0.4, 1)
const rootDiv = Coopa.DOM.createElement("div")
Coopa.DOM.setAttr(rootDiv, { id: "root", class: "element" })
Coopa.DOM.setStyle(rootDiv, rootTransform.toCSS())

// circle asset
const circleAsset = Coopa.createCircle({ size: 128, color: "#EEE", strokeColor: "#333" })
const circleRootAsset = Coopa.createCircle({ size: 128, color: "#fce6a2", strokeColor: "#ffd861" })

const data = Coopa.ArrayExt.shuffle(Coopa.ArrayExt.createOrder(100, 0))

const bst = new Coopa.BinarySearchTree()
for (let i = 0; i < 25; i++) {
	const entry = data.pop()
	bst.set(entry, entry)
}

bst.print()

const mapTransform = new WeakMap() // map node -> transform
const mapDiv = new WeakMap()

function clickNode() {
	Fatina.shake(this, { amplitude: 0.015 }).start()
}

function updateLine(node, line) {
	line.position.set(-node.position.x / 2, -node.position.y / 2, -50)

	const vector = new Coopa.DOMVector2(node.position.x, node.position.y)

	line.size.set(0.005, vector.length)
	line.angle = 270 + vector.angle()
}

function createNode(node, nodeParent = undefined, side = -1, level) {
	// create transform
	const nodeTransform = new Coopa.RectTransformMatrix(960, 960)
	let width = 0.02
	if (level === 1) width = 0.6
	if (level === 2) width = 0.3
	if (level === 3) width = 0.15
	if (level === 4) width = 0.075
	if (level === 5) width = 0.06
	if (level === 6) width = 0.05
	if (level === 7) width = 0.04
	nodeTransform.position.set(side * width, 0.1)

	// create line (0,0 is the parent position and x,y the current node)
	const lineTransform = new Coopa.RectTransformMatrix(960, 960)

	const lineDiv = Coopa.DOM.createElement("div")
	Coopa.DOM.setAttr(lineDiv, { id: "line", class: `element line ${side === 0 ? "root" : ""}` })
	Coopa.DOM.setStyle(lineDiv, lineTransform.toCSS())
	nodeTransform.onChanged.on(() => Coopa.DOM.setStyle(lineDiv, lineTransform.toCSS()))

	// create html
	const nodeDiv = Coopa.DOM.createElement("div")
	Coopa.DOM.setAttr(nodeDiv, { id: "node", class: "element node" })
	Coopa.DOM.setStyle(nodeDiv, nodeTransform.toCSS())
	nodeTransform.onChanged.on(() => {
		Coopa.DOM.setStyle(nodeDiv, nodeTransform.toCSS())
		updateLine(nodeTransform, lineTransform)
	})
	updateLine(nodeTransform, lineTransform)
	mapTransform.set(node, nodeTransform)
	mapDiv.set(node, nodeDiv)

	// circle
	const img = Coopa.DOM.createElement("img")
	Coopa.DOM.setAttr(img, {
		src: level === 0 ? circleRootAsset : circleAsset
	})
	Coopa.DOM.setStyle(img, { transform: `scale(${level === 0 ? 0.15 : 0.075})` })
	nodeDiv.appendChild(lineDiv)
	nodeDiv.appendChild(img)

	// label
	const label = Coopa.DOM.createText(node.val)
	nodeDiv.appendChild(label)

	// append to parent
	if (nodeParent) {
		nodeTransform.parent = mapTransform.get(nodeParent)
		mapDiv.get(nodeParent).appendChild(nodeDiv)
	} else {
		nodeTransform.parent = rootTransform
		rootDiv.appendChild(nodeDiv)
	}

	img.addEventListener("click", clickNode.bind(nodeTransform))
}

// iterate all nodes
function iterateNodes(node, parent = undefined, side = 0, level = 0, height = 1) {
	if (!mapTransform.has(node)) {
		createNode(node, parent, side, level, height)
	}

	if (node.left) iterateNodes(node.left, node, -1, level + 1, height)
	if (node.right) iterateNodes(node.right, node, 1, level + 1, height)
}

iterateNodes(bst.root, undefined, 0, 0, bst.height)

// mount
document.getElementById("app").appendChild(rootDiv)

// button interaction
document.getElementById("addBtn").addEventListener("click", () => {
	if (data.length <= 0) return
	const entry = data.pop()
	bst.set(entry, entry)

	// refresh UI
	iterateNodes(bst.root, undefined, 0, 0, bst.height)
})
