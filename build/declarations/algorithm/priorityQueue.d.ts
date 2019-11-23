export declare enum PriorityQueueOrder {
    Lower = "lower",
    Higher = "higher"
}
/**
 * Simple priority queue based on the binary search tree
 *
 * Add
 *
 * @export
 * @class PriorityQueue
 * @template T
 */
export declare class PriorityQueue<T> {
    private tree;
    private order;
    private length;
    get size(): number;
    get priorityMin(): number;
    get priorityMax(): number;
    constructor(order?: PriorityQueueOrder);
    /**
     * Check if there are still element inside the queue
     *
     * @returns
     */
    hasNext(): boolean;
    /**
     * Add an element in the queue
     *
     * @param {number} priority
     * @param {T} obj
     */
    add(priority: number, obj: T): void;
    /**
     * Add multiple element in the queue
     *
     * @param {number} priority
     * @param {T[]} obj
     */
    addMany(priority: number, obj: T[]): void;
    /**
     * Get the next element in the queue (first or last based on order)
     *
     * @returns {T}
     */
    next(): T | undefined;
    /**
     * Get the next element in the queue
     * (like .next() but let the value in the queue)
     *
     * @returns
     */
    peek(): T;
    toString(): string;
}
