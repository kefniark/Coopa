/// <reference types="jest" />
import { logger, LogLevel } from "../../src"

test("Basic", () => {
	let evt = 0
	logger.events.on(() => evt++)
	logger.console = !logger.console
	logger.prefix = "[MyLibrary]"

	logger.info("lol")
	logger.warn("warn", { a: 1 })
	logger.error("error", { a: 2 })

	logger.console = !logger.console

	logger.info("lol")
	logger.warn("warn", { a: 1 })
	logger.error("error", { a: 2 })

	expect(evt).toBe(6)
})

test("Basic > warn", () => {
	let evt = 0
	logger.events.on(() => evt++)
	logger.level = LogLevel.WARN

	logger.info("lol")
	logger.warn("warn", { a: 1 })
	logger.error("error", { a: 2 })

	expect(evt).toBe(2)
})

test("Basic > error", () => {
	let evt = 0
	logger.events.on(() => evt++)
	logger.level = LogLevel.ERROR

	logger.info("lol")
	logger.warn("warn", { a: 1 })
	logger.error("error", { a: 2 })

	expect(evt).toBe(1)
})

test("Basic > off", () => {
	let evt = 0
	logger.events.on(() => evt++)
	logger.level = LogLevel.OFF

	logger.info("lol")
	logger.warn("warn", { a: 1 }, { a: 1 })
	logger.error("error", { a: 2 })

	expect(evt).toBe(0)
})
