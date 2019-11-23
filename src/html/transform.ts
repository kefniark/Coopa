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

export function createHTMLTransform(el = "div", size = 960) {
	if (!EventBus.channelNames.includes(HTMLTransformEvent.HTMLChanged)) {
		EventBus.create<HTMLTransformEventArg>(HTMLTransformEvent.HTMLChanged, EventBusChannelType.Delayed)
	}
	const channel = EventBus.channel<HTMLTransformEventArg>(HTMLTransformEvent.HTMLChanged)
	const transform = new RectTransformMatrix(size, size)
	const div = DOM.createElement(el)
	DOM.setStyle(div, transform.toCSS2D())

	transform.onChanged.on(() =>
		channel.emit({
			dom: div,
			transform
		})
	)

	channel.on(arg => DOM.setStyle(arg.dom, arg.transform.toCSS2D()))

	return {
		dom: div,
		transform
	}
}
