let _now = typeof Date.now === "function" ? Date.now : new Date().getTime;
let _perf;
/* istanbul ignore next */
if (globalThis && globalThis.performance) {
    _perf = globalThis.performance.now;
}
else if (globalThis.process) {
    _perf = () => process.hrtime()[1];
}
else {
    const start = _now();
    _perf = () => _now() - start;
}
/**
 * Provide polyfill around Date.now()
 */
export const now = _now;
/**
 * Provide polyfill around performance.now()
 */
export const perf = _perf;
