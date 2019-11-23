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
paletteTransform.position.set(0, -0.43)
const paletteTitle = Coopa.DOM.createText("Palette")
Coopa.DOM.setAttr(paletteTitle, { class: "titleColor" })
Coopa.DOM.setStyle(paletteTitle, paletteTransform.toCSS2D())
rootDiv.appendChild(paletteTitle)

const paletteTransform2 = new Coopa.RectTransformMatrix(640, 640)
paletteTransform2.pivot.set(0.5, 0)
paletteTransform2.anchor.set(0.5, 0)
paletteTransform2.position.set(0, -0)
const paletteTitle2 = Coopa.DOM.createText("Predefined Palette")
Coopa.DOM.setAttr(paletteTitle2, { class: "titleColor" })
Coopa.DOM.setStyle(paletteTitle2, paletteTransform2.toCSS2D())
rootDiv.appendChild(paletteTitle2)

const gradiantTransform = new Coopa.RectTransformMatrix(640, 640)
gradiantTransform.pivot.set(0.5, 0)
gradiantTransform.anchor.set(0.5, 0)
gradiantTransform.position.set(0, 0.42)
const gradiantTitle = Coopa.DOM.createText("Gradient")
Coopa.DOM.setAttr(gradiantTitle, { class: "titleColor" })
Coopa.DOM.setStyle(gradiantTitle, gradiantTransform.toCSS2D())
rootDiv.appendChild(gradiantTitle)

// procedural palette
const hue = 8
const level = 5
const colors = Coopa.Color.palette(hue, level)

for (let i = 0; i < colors.length; i++) {
	const color = colors[i]

	const colorIndex = Math.floor(i / level)
	const levelIndex = i % level

	const colorTransform = new Coopa.RectTransformMatrix(640, 640)
	colorTransform.pivot.set(0, 0)
	colorTransform.anchor.set(0, 0)
	colorTransform.size.set(0.06, 0.06)
	colorTransform.position.set(colorIndex * 0.07, levelIndex * 0.07 + 0.12)
	const colorDiv = Coopa.DOM.createElement("div")
	Coopa.DOM.setAttr(colorDiv, { class: "square" })
	Coopa.DOM.setStyle(colorDiv, Object.assign(colorTransform.toCSS2D(), { backgroundColor: color.hex() }))
	colorTransform.onChanged.on(() => {
		Coopa.DOM.setStyle(colorDiv, Object.assign(colorTransform.toCSS2D(), { backgroundColor: color.hex() }))
	})
	rootDiv.appendChild(colorDiv)
}

// predefined palette

const colors3 = Coopa.ArrayExt.random([
	Coopa.Color.germanPallete(),
	Coopa.Color.flatPalette(),
	Coopa.Color.americanPalette()
])

for (let i = 0; i < colors3.length; i++) {
	const color = colors3[i]

	const colorIndex = Math.floor(i / level)
	const levelIndex = i % level

	const colorTransform = new Coopa.RectTransformMatrix(640, 640)
	colorTransform.pivot.set(0, 0)
	colorTransform.anchor.set(0, 0)
	colorTransform.size.set(0.06, 0.06)
	colorTransform.position.set(colorIndex * 0.07, levelIndex * 0.07 + 0.55)
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
	colorTransform.position.set(i * 0.015, 0.95)
	const colorDiv = Coopa.DOM.createElement("div")
	Coopa.DOM.setAttr(colorDiv, { class: "square" })
	Coopa.DOM.setStyle(colorDiv, Object.assign(colorTransform.toCSS2D(), { backgroundColor: color.hex() }))
	colorTransform.onChanged.on(() => {
		Coopa.DOM.setStyle(colorDiv, Object.assign(colorTransform.toCSS2D(), { backgroundColor: color.hex() }))
	})
	rootDiv.appendChild(colorDiv)
}

app.appendChild(rootDiv)
