function resize() {
	const container = document.getElementById("app")
	if (window.disableResize) {
		container.style.transform = `scale(1)`
		return
	}
	const menu = document.getElementById("menu")
	const parent = container.parentElement
	const val = Math.min(parent.clientHeight, parent.clientWidth, menu.clientHeight)

	const scale = Math.min(Math.max(val / 960, 0.2), 2)
	container.style.transform = `scale(${scale})`
}

resize()
window.addEventListener("resize", () => resize())
