/**
 * Provide polyfill around Date.now()
 */
export const now: () => number = typeof Date.now === "function" ? Date.now : new Date().getTime

const start = now()

/**
 * Provide polyfill around performance.now()
 */
/* istanbul ignore next */
export const perf: () => number = () => {
	if (globalThis && globalThis.performance) {
		return globalThis.performance.now()
	} else if (globalThis.process) {
		return process.hrtime()[1]
	}
	return now() - start
}
