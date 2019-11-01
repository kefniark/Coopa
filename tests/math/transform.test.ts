/// <reference types="jest" />
import { Transform2d, Transform3d } from "../../src/math"

test("transform2d", () => {
	const trans = new Transform2d()

	trans.position.x = 100
	trans.position.y = 60

	trans.rotation.x = 45
	trans.rotation.z = 45

	trans.scale.x = 2
	trans.scale.y = 2

	console.log([trans.position, trans.rotation, trans.scale])
	console.log(trans.toCss())
})

test("transform3d", () => {
	const trans = new Transform3d()

	trans.position.x = 100
	trans.position.y = 60
	trans.position.z = 0

	trans.rotation.x = 45
	trans.rotation.z = 45

	trans.scale.x = 2
	trans.scale.y = 2

	console.log([trans.position, trans.rotation, trans.scale])
	console.log(trans.toCss())
})
