export class ObjectExt {
	static isString(val: any) {
		return Object.prototype.toString.call(val) === "[object String]"
	}

	static isArray(val: any) {
		return Array.isArray(val)
	}

	static isNumeric(value: any): boolean {
		return !isNaN(value - parseFloat(value))
	}

	static clone(obj: any): boolean {
		return Object.assign({}, obj)
	}

	static IsDefined(val: any) {
		return !ObjectExt.IsNullOrUndefined(val)
	}

	static IsNullOrUndefined(val: any) {
		return !val && val !== 0
	}
}
