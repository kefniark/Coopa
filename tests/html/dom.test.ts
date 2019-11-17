/// <reference types="jest" />
import { DOM } from "../../src"
import * as jsdom from "jsdom"

const { window } = new jsdom.JSDOM(`<html><head></head><body><div id="app"></div></body></html`)
DOM.setup(window.document)
test("Basic", () => {
	const div = DOM.createElement("div")
	div.appendChild(DOM.createElement("div"))

	DOM.setAttr(div, {
		id: "nano",
		class: "stuff"
	})
	DOM.setStyle(div, {
		display: "none"
	})

	expect(div.outerHTML).toContain(`id="nano"`)
	expect(div.outerHTML).toContain(`display: none;`)

	// check diff mechanism
	DOM.setAttr(div, { class: "stuff" })
	DOM.setStyle(div, { display: "none" })
})

test("Text", () => {
	const div = DOM.createElement("div")
	const text = DOM.createText("youhou")
	div.appendChild(text)
	expect(div.outerHTML).toContain(`>youhou<`)

	DOM.setText(text, "tuna")
	expect(div.outerHTML).toContain(`>tuna<`)

	div.removeChild(text)
	expect(div.outerHTML).not.toContain(`>tuna<`)
})
