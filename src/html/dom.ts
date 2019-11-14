export class DOM {
	static document: Document
	static get doc(): Document {
		if (!this.document) {
			if (!globalThis.document) throw new Error("unknown document")
			this.document = document
		}
		return this.document
	}

	static setup(doc: Document) {
		DOM.document = doc
	}

	static createElement(tagName: string, options: ElementCreationOptions = {}): HTMLElement {
		var el = DOM.doc.createElement(tagName, options)
		return el
	}

	static createText(value: string) {
		var el = DOM.createElement("span")
		DOM.setText(el, value)
		return el
	}

	static setText(el: HTMLElement, value: string) {
		el.innerHTML = value;
	}

	static setAttr(el: HTMLElement, options: {[id:string]: string}) {
		for (var id in options) {
			if (el.getAttribute(id) === options[id]) continue;
			el.setAttribute(id, options[id])
		}
	}

	static setStyle(el: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
		for (var entry of Object.entries(styles)) {
			if (el.style[entry[0] as any] === entry[1]) continue;
			el.style[entry[0] as any] = entry[1]
		}
	}
}
