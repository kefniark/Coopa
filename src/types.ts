export function isString(val: any) {
	return Object.prototype.toString.call(val) === "[object String]"
}

export function isArray(val: any) {
	return Array.isArray(val)
}

export function isNumeric(value: any): boolean {
	return !isNaN(value - parseFloat(value))
}

export function isObjectEmpty(obj: any) {
	if (!obj || typeof obj !== "object") return true
	for (const a in obj) if (obj.hasOwnProperty(a)) return false
	return true
}

export function clone(obj: any): boolean {
	return Object.assign({}, obj)
}
