/// <reference types="jest" />
import { logger, LogLevel } from "../../src"

test("Basic", () => {
	let evt = 0
	logger.events.on(() => evt++)
	logger.level = LogLevel.DEBUG
	logger.console = !logger.console
	logger.prefix = "[MyLibrary]"

	logger.debug("lol")
	logger.info("lol")
	logger.warn("warn", { a: 1 })
	logger.error("error", { a: 2 })

	logger.console = !logger.console

	logger.debug("lol")
	logger.info("lol")
	logger.warn("warn", { a: 1 })
	logger.error("error", { a: 2 })

	expect(evt).toBe(8)
})

test("Basic > debug", () => {
	let evt = 0
	logger.events.on(() => evt++)
	logger.level = LogLevel.DEBUG

	logger.debug("lol")
	logger.info("lol")
	logger.warn("warn", { a: 1 })
	logger.error("error", { a: 2 })

	expect(evt).toBe(4)
})

test("Basic > warn", () => {
	let evt = 0
	logger.events.on(() => evt++)
	logger.level = LogLevel.WARN

	logger.debug("lol")
	logger.info("lol")
	logger.warn("warn", { a: 1 })
	logger.error("error", { a: 2 })

	expect(evt).toBe(2)
})

test("Basic > error", () => {
	let evt = 0
	logger.events.on(() => evt++)
	logger.level = LogLevel.ERROR

	logger.debug("lol")
	logger.info("lol")
	logger.warn("warn", { a: 1 })
	logger.error("error", { a: 2 })

	expect(evt).toBe(1)
})

test("Basic > off", () => {
	let evt = 0
	logger.events.on(() => evt++)
	logger.level = LogLevel.OFF

	logger.debug("lol")
	logger.info("lol")
	logger.warn("warn", { a: 1 }, { a: 1 })
	logger.error("error", { a: 2 })

	expect(evt).toBe(0)
})
