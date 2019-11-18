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

export function createCircle(options: Partial<IShapeCircle>) {
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
