/* istanbul ignore file */

export function createImageContext(width = 200, height = 200, action: (ctx: CanvasRenderingContext2D) => void) {
	const canvas = document.createElement("canvas") as HTMLCanvasElement
	canvas.width = width
	canvas.height = height
	const ctx = canvas.getContext("2d")
	if (!ctx) return
	action(ctx)
	return canvas.toDataURL()
}

export interface IShapeCircle {
	size: number
	lineWidth: number
	color: string
	strokeColor: string
}

export function createCircle(options: Partial<IShapeCircle> = {}) {
	const size = options.size || 64
	return createImageContext(size, size, ctx => {
		ctx.beginPath()
		ctx.lineWidth = options.lineWidth || 5
		ctx.arc(size / 2, size / 2, size / 2 - ctx.lineWidth, 0, 2 * Math.PI)
		ctx.fillStyle = options.color || "#FFF"
		ctx.fill()
		ctx.strokeStyle = options.strokeColor || "#000"
		ctx.stroke()
	})
}

export function createSquare(options: Partial<IShapeCircle> = {}) {
	const size = options.size || 64
	const line = options.lineWidth || 5
	const radius = 4
	const x = line / 2
	const y = line / 2
	const w = size - line
	const h = size - line
	const r = x + w
	const b = y + h

	return createImageContext(size, size, ctx => {
		ctx.rect(line, line, w - line, h - line)
		ctx.fillStyle = options.color || "#FFF"
		ctx.fill()

		ctx.beginPath()
		ctx.strokeStyle = options.strokeColor || "#000"
		ctx.lineWidth = line
		ctx.moveTo(x + radius, y)
		ctx.lineTo(r - radius, y)
		ctx.quadraticCurveTo(r, y, r, y + radius)
		ctx.lineTo(r, y + h - radius)
		ctx.quadraticCurveTo(r, b, r - radius, b)
		ctx.lineTo(x + radius, b)
		ctx.quadraticCurveTo(x, b, x, b - radius)
		ctx.lineTo(x, y + radius)
		ctx.quadraticCurveTo(x, y, x + radius, y)
		ctx.stroke()

		// ctx.beginPath()
		// ctx.lineWidth = options.lineWidth || 5
		// ctx.arc(size / 2, size / 2, size / 2 - ctx.lineWidth, 0, 2 * Math.PI)
		// ctx.fillStyle = options.color || "#FFF"
		// ctx.fill()
		// ctx.strokeStyle = options.strokeColor || "#000"
		// ctx.stroke()
	})
}
