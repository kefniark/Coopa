interface String {
	capitalize: () => string
	capitalizeWords: () => string
	contains: (val: string) => boolean
	slugify: (lower?: boolean) => string
}

interface StringConstructor {
	isNullOrEmpty: (val: any) => boolean
}

String.isNullOrEmpty = function(val: any): boolean {
	if (val === undefined || val === null || val.trim() === "") {
		return true
	}
	return false
}

String.prototype.capitalize = function(): string {
	if (this.length == 1) {
		return this.toUpperCase()
	} else if (this.length > 0) {
		let regex: RegExp = /^(\(|\[|"|')/
		if (regex.test(this as string)) {
			return this.substring(0, 2).toUpperCase() + this.substring(2)
		} else {
			return this.substring(0, 1).toUpperCase() + this.substring(1)
		}
	}
	return this as string
}

String.prototype.capitalizeWords = function(): string {
	let regexp: RegExp = /\s/
	let words = this.split(regexp)
	if (words.length == 1) {
		return words[0].capitalize()
	} else if (words.length > 1) {
		let result: string = ""
		for (let i = 0; i < words.length; i++) {
			if (words[i].capitalize() !== null) {
				result += words[i].capitalize() + " "
			}
		}
		result.trim()
		return result
	}
	return this as string
}

String.prototype.contains = function(val: string): boolean {
	if (this.indexOf(val) !== -1) {
		return true
	}
	return false
}

String.prototype.slugify = function(lower: boolean = true): string {
	if (!lower) {
		return this.toLowerCase()
			.normalize()
			.replace(/[^a-z0-9]/gi, "-")
	}
	return this.normalize().replace(/[^a-z0-9]/gi, "-")
}
