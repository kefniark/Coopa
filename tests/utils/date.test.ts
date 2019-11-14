/// <reference types="jest" />
import { perf, now } from "../../src"

test("Basic", () => {
	const res1 = perf()
	const res2 = now()

	console.log(res1, res2)
	// expect(listener).toHaveBeenCalledTimes(3)
})
