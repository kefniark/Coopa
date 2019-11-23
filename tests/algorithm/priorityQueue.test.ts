/// <reference types="jest" />
import { PriorityQueue, PriorityQueueOrder } from "../../src"

const populateData = (queue: PriorityQueue<string>) => {
	queue.add(2, "kebab")
	queue.add(4, "tuna")
	queue.add(10, "shark")
	queue.add(1, "salmon")
	queue.add(2, "fish")
	queue.addMany(4, ["angelfish", "beluga"])
	queue.addMany(5, ["cod", "koi"])
	queue.add(1000, "whale")

	console.log(queue.toString())
}

test("Priority Queue get lower", () => {
	const queue = new PriorityQueue<string>()
	populateData(queue)

	expect(queue.priorityMax).toBe(1000)
	expect(queue.priorityMin).toBe(1)

	expect(queue.size).toBe(10)
	expect(queue.peek()).toBe("salmon")
	expect(queue.size).toBe(10)
	expect(queue.next()).toBe("salmon")
	expect(queue.size).toBe(9)

	// get the whole queue
	while (queue.hasNext()) {
		queue.next()
	}

	// when it's empty, return undefined
	expect(queue.next()).toBeUndefined()
})

test("Priority Queue get higher", () => {
	const queue = new PriorityQueue<string>(PriorityQueueOrder.Higher)
	populateData(queue)
	expect(queue.size).toBe(10)
	expect(queue.peek()).toBe("whale")
	expect(queue.size).toBe(10)
	expect(queue.next()).toBe("whale")
	expect(queue.size).toBe(9)
})
