interface Array<T> {
	clone: () => T[]
	isEmpty: () => boolean
	first: () => T
	last: () => T
	insert: (index: number, element: T) => void
	removeIndex: (index: number) => void
	remove: (element: T) => void
	shuffle: () => T[]
	sum: () => number
	avg: () => number
	random: () => T
}

Array.prototype.isEmpty = function(): boolean {
	if (this.length === 0) {
		return true
	}
	return false
}

Array.prototype.clone = function() {
	return this.slice()
}

Array.prototype.first = function() {
	return this[0]
}

Array.prototype.last = function() {
	return this[this.length - 1]
}

Array.prototype.insert = function(index: number, value: any) {
	this.splice(index, 0, value)
}

Array.prototype.removeIndex = function(index: number) {
	return this.splice(index, 1)
}

Array.prototype.remove = function(element: any) {
	return this.filter(x => x === element)
}

Array.prototype.sum = function() {
	return this.reduce((prev, curr) => prev + curr)
}

Array.prototype.avg = function() {
	return this.sum() / this.length
}

Array.prototype.random = function() {
	const index = Math.floor(Math.random() * (Math.floor(this.length - 1) + 1))
	return this[index]
}

Array.prototype.shuffle = function() {
	let buffer = [],
		start

	for (let i = this.length; i >= this.length && i > 0; i--) {
		start = Math.floor(Math.random() * this.length)
		buffer.push(this.splice(start, 1)[0])
	}

	return buffer
}
