import { EventBus, EventBusChannelType } from "../events"
import { RectTransformMatrix } from "../transform"
import { DOM } from "./dom"

export enum HTMLTransformEvent {
	HTMLChanged = "DomUpdate"
}

export interface HTMLTransformEventArg {
	dom: HTMLElement
	transform: RectTransformMatrix
}

export function createHTMLTransform(
	el = "div",
	size = 960,
	style?: (transform: RectTransformMatrix) => Partial<CSSStyleDeclaration>
) {
	if (!EventBus.channelNames.includes(HTMLTransformEvent.HTMLChanged)) {
		EventBus.create<HTMLTransformEventArg>(HTMLTransformEvent.HTMLChanged, EventBusChannelType.Delayed)
	}
	const channel = EventBus.channel<HTMLTransformEventArg>(HTMLTransformEvent.HTMLChanged)
	const transform = new RectTransformMatrix(size, size)
	const div = DOM.createElement(el)

	function updateStyle(dom: HTMLElement, trans: RectTransformMatrix) {
		if (style) {
			const newStyle = Object.assign({}, trans.toCSS2D(), style(trans))
			DOM.setStyle(dom, newStyle)
		} else {
			DOM.setStyle(dom, trans.toCSS2D())
		}
	}
	updateStyle(div, transform)

	const wrapper = {
		dom: div,
		transform,
		update: () => channel.emit(wrapper)
	}

	transform.onChanged.on(() => wrapper.update())
	channel.on(arg => {
		if (arg.transform !== transform) return
		updateStyle(arg.dom, arg.transform)
	})

	return wrapper
}
