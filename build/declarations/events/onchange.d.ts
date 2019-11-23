/**
 * Method used to create a proxy around some data an get event
 *
 * Inspired by `on-change` but simpler (https://github.com/sindresorhus/on-change/)
 *
 * @export
 * @param {*} objToWatch
 * @param {(prop: string, value?: any, previous?: any) => void} onChangeFunction
 * @returns {Proxy}
 */
export declare function onChange<T>(objToWatch: T, onChangeFunction: (prop: string, value?: any, previous?: any) => void): T;
