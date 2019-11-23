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
export function onChange<T>(objToWatch: T, onChangeFunction: (prop: string, value?: any, previous?: any) => void): T {
	const map = new WeakMap<any, string>()

	const getRootPath = (val: any) => {
		const path = map.get(val) || ""
		return path ? `${path}.` : ""
	}

	const handler = {
		get(target: any, property: string, receiver: any): any {
			const path = getRootPath(target) + property
			const value = Reflect.get(target, property, receiver)
			if (typeof value === "object" && value !== null) {
				map.set(value, path)
				return new Proxy(value, handler)
			}
			/* istanbul ignore next */
			return value
		},
		set(target: any, property: string, value: any) {
			const path = getRootPath(target) + property
			const prev = target[property]
			if (value === prev) return true
			const res = Reflect.set(target, property, value)
			onChangeFunction(path, value, prev)
			return res
		},
		deleteProperty(target: any, property: string) {
			const path = getRootPath(target) + property
			const prev = target[property]
			if (map.has(target)) map.delete(target)
			const res = Reflect.deleteProperty(target, property)
			onChangeFunction(path, undefined, prev)
			return res
		}
	}
	map.set(objToWatch, "")
	return new Proxy(objToWatch, handler)
}
