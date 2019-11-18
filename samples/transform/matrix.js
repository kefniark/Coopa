const def = Fatina.ticker()
const after = Fatina.ticker()

Fatina.setDefaultTicker(def)

const map = new WeakMap()

const rootTransform = new Coopa.RectTransformMatrix(1280, 960)
const rootDiv = Coopa.DOM.createElement("div")
Coopa.DOM.setAttr(rootDiv, { id: "root", class: "element" })
Coopa.DOM.setStyle(rootDiv, rootTransform.toCSS())
const rootEvent = new Coopa.DelayedEvent(rootTransform.onChanged)
rootEvent.on(() => {
	Coopa.DOM.setStyle(rootDiv, rootTransform.toCSS())
	// console.log('Changed', rootTransform)
})
map.set(rootTransform, rootDiv)

const rootLayout = new Coopa.RectTransformMatrix(1280, 960)
rootLayout.parent = rootTransform
const layoutDiv = Coopa.DOM.createElement("div")
rootDiv.appendChild(layoutDiv)
Coopa.DOM.setAttr(layoutDiv, { id: "layout", class: "element" })
Coopa.DOM.setStyle(layoutDiv, rootLayout.toCSS())
const layoutEvent = new Coopa.DelayedEvent(rootLayout.onChanged)
layoutEvent.on(() => {
	Coopa.DOM.setStyle(layoutDiv, Object.assign(rootLayout.toCSS(), { backgroundColor: `#333` }))
	// console.log('Changed', rootLayout)
})
map.set(rootLayout, layoutDiv)

const child1Transform = new Coopa.RectTransformMatrix(1280, 960)
child1Transform.parent = rootLayout
const child1Div = Coopa.DOM.createElement("div")
layoutDiv.appendChild(child1Div)
Coopa.DOM.setAttr(child1Div, { id: "child1", class: "element" })
const child1Event = new Coopa.DelayedEvent(child1Transform.onChanged)
child1Event.on(() => {
	Coopa.DOM.setStyle(child1Div, Object.assign(child1Transform.toCSS(), { backgroundColor: "#CCC" }))
	// console.log('Child1 Changed', child1Transform)
})
map.set(child1Transform, child1Div)

const child2Transform = new Coopa.RectTransformMatrix(1280, 960)
child2Transform.parent = rootLayout
const child2Div = Coopa.DOM.createElement("div")
layoutDiv.appendChild(child2Div)
Coopa.DOM.setAttr(child2Div, { id: "child2", class: "element" })
const child2Event = new Coopa.DelayedEvent(child2Transform.onChanged)
child2Event.on(() => {
	Coopa.DOM.setStyle(child2Div, Object.assign(child2Transform.toCSS(), { backgroundColor: "#AAA" }))
	// console.log('Child2 Changed', child2Transform)
})
child2Transform.onParentChanged.on(parent => {
	console.log("append child to ", parent, map.get(parent))
	map.get(parent).appendChild(child2Div)
})
map.set(child2Transform, child2Div)

const childCenterTransform = new Coopa.RectTransformMatrix(1280, 960)
childCenterTransform.parent = rootLayout
const childCenterDiv = Coopa.DOM.createElement("div")
layoutDiv.appendChild(childCenterDiv)
Coopa.DOM.setAttr(childCenterDiv, { id: "childCenter", class: "element" })
const childCenterEvent = new Coopa.DelayedEvent(childCenterTransform.onChanged)
childCenterEvent.on(() => {
	Coopa.DOM.setStyle(childCenterDiv, Object.assign(childCenterTransform.toCSS(), { backgroundColor: "#777" }))
	// console.log('ChildCenter Changed', childCenterTransform)
})
childCenterTransform.onParentChanged.on(parent => {
	console.log("append child to ", parent, map.get(parent))
	map.get(parent).appendChild(childCenterDiv)
})
map.set(childCenterTransform, childCenterDiv)

const rootLayout2 = new Coopa.RectTransformMatrix(1280, 960)
rootLayout2.parent = rootTransform
const layoutDiv2 = Coopa.DOM.createElement("div")
rootDiv.appendChild(layoutDiv2)
Coopa.DOM.setAttr(layoutDiv2, { id: "layout2", class: "element" })
Coopa.DOM.setStyle(layoutDiv2, rootLayout2.toCSS())
const layoutEvent2 = new Coopa.DelayedEvent(rootLayout2.onChanged)
layoutEvent2.on(() => {
	Coopa.DOM.setStyle(layoutDiv2, Object.assign(rootLayout2.toCSS()))
	// console.log('Changed', rootLayout2)
})
map.set(rootLayout2, layoutDiv2)

const rootLayout4 = new Coopa.RectTransformMatrix(1280, 960)
rootLayout4.parent = rootLayout2
const layoutDiv4 = Coopa.DOM.createElement("div")
layoutDiv2.appendChild(layoutDiv4)
Coopa.DOM.setAttr(layoutDiv4, { id: "layout4", class: "element" })
Coopa.DOM.setStyle(layoutDiv4, rootLayout4.toCSS())
const layoutEvent4 = new Coopa.DelayedEvent(rootLayout4.onChanged)
layoutEvent4.on(() => {
	Coopa.DOM.setStyle(layoutDiv4, Object.assign(rootLayout4.toCSS()))
	// console.log('Changed', rootLayout2)
})
map.set(rootLayout4, layoutDiv4)

const rootLayout3 = new Coopa.RectTransformMatrix(1280, 960)
rootLayout3.parent = rootLayout2
const layoutDiv3 = Coopa.DOM.createElement("div")
layoutDiv2.appendChild(layoutDiv3)
Coopa.DOM.setAttr(layoutDiv3, { id: "layout3", class: "element" })
Coopa.DOM.setStyle(layoutDiv3, rootLayout3.toCSS())
const layoutEvent3 = new Coopa.DelayedEvent(rootLayout3.onChanged)
layoutEvent3.on(() => {
	Coopa.DOM.setStyle(layoutDiv3, Object.assign(rootLayout3.toCSS()))
	// console.log('Changed', rootLayout2)
})
map.set(rootLayout3, layoutDiv3)

function createPoint(x, y, size, parent, parentDiv, color) {
	const rootPoint = new Coopa.RectTransformMatrix(1280, 960)
	rootPoint.parent = parent

	rootPoint.anchor.set(x, y)
	rootPoint.size.set(size, size)
	const pointDiv = Coopa.DOM.createElement("div")
	parentDiv.appendChild(pointDiv)
	Coopa.DOM.setAttr(pointDiv, { id: "point", class: "element" })
	Coopa.DOM.setStyle(pointDiv, rootPoint.toCSS())
	const pointEvent = new Coopa.DelayedEvent(rootPoint.onChanged)
	pointEvent.on(() => Coopa.DOM.setStyle(pointDiv, Object.assign(rootPoint.toCSS(), { backgroundColor: color })))
	map.set(pointDiv, rootPoint)

	after.addTick(() => pointEvent.update())
	pointEvent.emit(null, true)
	pointDiv.addEventListener("click", () => {
		console.log("click", rootPoint.localOrigin, "scene position: ", rootPoint.globalOrigin)
		Fatina.shake(rootPoint, { amplitude: 0.06 }).start()
	})
}

for (let x = 0; x <= 1; x += 0.25) {
	for (let y = 0; y <= 1; y += 0.25) {
		createPoint(x, y, 0.15, rootLayout3, layoutDiv3, "#333")
	}
}

for (let x = 0; x <= 1; x += 0.1) {
	for (let y = 0; y <= 1; y += 0.1) {
		createPoint(x, y, 0.06, rootLayout4, layoutDiv4, "#CCC")
	}
}

rootLayout3.anchor.set(1, 1)
rootLayout3.pivot.set(1, 1)
rootLayout3.size.set(0.5, 0.5)
rootLayout3.position.z = 100

rootLayout4.anchor.set(0, 0.5)
rootLayout4.pivot.set(0, 0.5)
rootLayout4.size.set(0.5, 1)
rootLayout4.position.z = -200

// event changed
after.addTick(() => rootEvent.update())
after.addTick(() => layoutEvent.update())
after.addTick(() => layoutEvent2.update())
after.addTick(() => layoutEvent3.update())
after.addTick(() => layoutEvent4.update())
after.addTick(() => child1Event.update())
after.addTick(() => child2Event.update())
after.addTick(() => childCenterEvent.update())

rootEvent.emit(null, true)
layoutEvent.emit(null, true)
layoutEvent2.emit(null, true)
layoutEvent3.emit(null, true)
layoutEvent4.emit(null, true)
child1Event.emit(null, true)
child2Event.emit(null, true)
childCenterEvent.emit(null, true)

const span = document.createElement("span")
const s = document.createTextNode("Text !")
span.style.fontSize = "32px"
span.appendChild(s)
child2Div.appendChild(span)

rootLayout.scale.set(0.8, 0.8, 1)
rootLayout.size.set(0.6, 0.6)
// rootLayout.skew.set(0.1, 0 )

child1Transform.anchor.set(0, 0)
child1Transform.pivot.set(0, 0)
child1Transform.angle = 0
// child1Transform.scale.set(0.5, 0.5, 0.5)
child1Transform.size.set(0.5, 0.5)

child2Transform.anchor.set(1, 1)
child2Transform.pivot.set(1, 1)
child2Transform.rotation.z = 180
// child2Transform.position.set(-1, 0)
child2Transform.scale.set(-1, -1, -1)
child2Transform.size.set(0.4, 0.4)

childCenterTransform.size.set(0.3, 0.3)

Fatina.update()

console.log(child1Transform.toCSS())
console.log(child2Transform.toCSS())

document.getElementById("app").appendChild(rootDiv)

Fatina.tween(rootLayout.position)
	.to({ x: 0.25 }, 8000)
	.yoyo(-1)
	.start()

Fatina.tween(rootLayout.size)
	.to({ x: 1, y: 1 }, 2500)
	.yoyo(-1)
	.start()

Fatina.tween(rootLayout.rotation)
	.to({ z: 360 }, 25000)
	.yoyo(-1)
	.start()

Fatina.tween(child1Transform)
	.from({ angle: 0 })
	.to({ angle: 360 }, 1500)
	.yoyo(-1)
	.start()

Fatina.tween(child1Transform.size)
	.from({ x: 0.6, y: 0.6 })
	.to({ x: 0.2, y: 0.2 }, 4000)
	.yoyo(-1)
	.start()

Fatina.tween(child1Transform.position)
	.from({ x: 0, y: 0 })
	.to({ x: 1, y: 1 }, 2000)
	.yoyo(-1)
	.start()

Fatina.tween(child2Transform.size)
	.to({ x: 0.6, y: 0.7 }, 25000)
	.yoyo(-1)
	.start()

Fatina.tween(childCenterTransform.scale)
	.to({ x: 1.2, y: 1.4 }, 25000)
	.yoyo(-1)
	.start()

// Fatina.tween(rootLayout.skew)
// 	.to({ y: 0.05 }, 3500)
// 	.yoyo(-1)
// 	.start()

const seq = Fatina.sequence()
seq.append(
	Fatina.tween(rootLayout.rotation)
		.from({ y: 0 })
		.to({ y: 360 }, 500)
)
seq.appendInterval(4500)
seq.append(
	Fatina.tween(rootLayout.rotation)
		.from({ x: 0 })
		.to({ x: 360 }, 1000)
)
seq.appendInterval(3800)
seq.setLoop(-1)
seq.start()

document.getElementById("btnChangePivotReset").addEventListener("click", () => {
	console.log("Reset pivot")
	childCenterTransform.pivot.set(0.5, 0.5)
	child1Transform.pivot.set(0, 0)
	child2Transform.pivot.set(1, 1)
})
document.getElementById("btnChangePivot").addEventListener("click", () => {
	const posx = Math.random()
	const posy = Math.random()
	console.log("Set pivot", posx, posy)
	childCenterTransform.pivot.set(posx, posy)
	child1Transform.pivot.set(posx, posy)
	child2Transform.pivot.set(posx, posy)
})

document.getElementById("btnChangeAnchorReset").addEventListener("click", () => {
	console.log("Reset anchor")
	childCenterTransform.anchor.set(0.5, 0.5)
	child1Transform.anchor.set(0, 0)
	child2Transform.anchor.set(1, 1)
})
document.getElementById("btnChangeAnchor").addEventListener("click", () => {
	const posx = Math.random()
	const posy = Math.random()
	console.log("Set anchor", posx, posy)
	childCenterTransform.anchor.set(posx, posy)
	child1Transform.anchor.set(posx, posy)
	child2Transform.anchor.set(posx, posy)
})

document.getElementById("btnChangeParentReset").addEventListener("click", () => {
	console.log("Reset parent")
	child2Transform.parent = rootLayout
	childCenterTransform.parent = rootLayout

	child2Transform.anchor.set(1, 1)
	child2Transform.pivot.set(1, 1)
	child2Transform.rotation.z = 180
	child2Transform.position.set(0, 0)
	child2Transform.scale.set(-1, -1)
	child2Transform.size.set(0.4, 0.4)

	childCenterTransform.anchor.set(0.5, 0.5)
	childCenterTransform.pivot.set(0.5, 0.5)
	childCenterTransform.position.set(0, 0)
	childCenterTransform.rotation.set(0, 0, 0)
	childCenterTransform.size.set(0.3, 0.3)
	childCenterTransform.scale.set(1, 1)
})

document.getElementById("btnChangeParent").addEventListener("click", () => {
	console.log("Set parent")
	child2Transform.parent = rootTransform
	childCenterTransform.parent = rootTransform
})

document.getElementById("btnChangeParentFix").addEventListener("click", () => {
	console.log("Set parent")
	child2Transform.setParentFix(rootLayout3)
	childCenterTransform.setParentFix(rootLayout3)
})
