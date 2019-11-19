const app = document.getElementById("app")

const rootTransform = new Coopa.RectTransformMatrix(640, 640)
rootTransform.pivot.set(0.5, 0)
rootTransform.anchor.set(0.5, 0)
const rootDiv = Coopa.DOM.createElement("div")
Coopa.DOM.setAttr(rootDiv, { id: "root", class: "element" })
Coopa.DOM.setStyle(rootDiv, rootTransform.toCSS())

const paletteTransform = new Coopa.RectTransformMatrix(640, 640)
paletteTransform.pivot.set(0.5, 0)
paletteTransform.anchor.set(0.5, 0)
paletteTransform.anchor.set(0.5, -0.43)
const paletteTitle = Coopa.DOM.createText("Palette")
Coopa.DOM.setAttr(paletteTitle, { class: "titleColor" })
Coopa.DOM.setStyle(paletteTitle, paletteTransform.toCSS2D())
rootDiv.appendChild(paletteTitle)

const gradiantTransform = new Coopa.RectTransformMatrix(640, 640)
gradiantTransform.pivot.set(0.5, 0)
gradiantTransform.anchor.set(0.5, 0)
gradiantTransform.position.set(0, 0.2)
const gradiantTitle = Coopa.DOM.createText("Gradient")
Coopa.DOM.setAttr(gradiantTitle, { class: "titleColor" })
Coopa.DOM.setStyle(gradiantTitle, gradiantTransform.toCSS2D())
rootDiv.appendChild(gradiantTitle)

const hue = 8
const level = 5
const colors = Coopa.Color.palette(hue, level)

for (let i = 1; i <= colors.length; i++) {
	const color = colors[i - 1]

	const colorIndex = Math.ceil(i / level)
	const levelIndex = i % level

	const colorTransform = new Coopa.RectTransformMatrix(640, 640)
	colorTransform.pivot.set(0, 0)
	colorTransform.anchor.set(0, 0)
	colorTransform.size.set(0.075, 0.075)
	colorTransform.position.set(colorIndex * 0.1, levelIndex * 0.1 + 0.12)
	const colorDiv = Coopa.DOM.createElement("div")
	Coopa.DOM.setAttr(colorDiv, { class: "square" })
	Coopa.DOM.setStyle(colorDiv, Object.assign(colorTransform.toCSS2D(), { backgroundColor: color.hex() }))
	colorTransform.onChanged.on(() => {
		Coopa.DOM.setStyle(colorDiv, Object.assign(colorTransform.toCSS2D(), { backgroundColor: color.hex() }))
	})
	rootDiv.appendChild(colorDiv)
}

const from = Coopa.Color.random()
const to = Coopa.Color.random()
const colors2 = Coopa.Color.gradient(from, to, 64)

for (let i = 1; i <= colors2.length; i++) {
	const color = colors2[i - 1]

	const colorTransform = new Coopa.RectTransformMatrix(640, 640)
	colorTransform.pivot.set(0, 0)
	colorTransform.anchor.set(0, 0)
	colorTransform.size.set(0.018, 0.075)
	colorTransform.position.set(i * 0.015, 0.75)
	const colorDiv = Coopa.DOM.createElement("div")
	Coopa.DOM.setAttr(colorDiv, { class: "square" })
	Coopa.DOM.setStyle(colorDiv, Object.assign(colorTransform.toCSS2D(), { backgroundColor: color.hex() }))
	colorTransform.onChanged.on(() => {
		Coopa.DOM.setStyle(colorDiv, Object.assign(colorTransform.toCSS2D(), { backgroundColor: color.hex() }))
	})
	rootDiv.appendChild(colorDiv)
}

app.appendChild(rootDiv)
