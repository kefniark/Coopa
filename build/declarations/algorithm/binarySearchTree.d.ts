declare class TreeNode<Key extends number | string, Val> {
    key: Key;
    val: Val;
    right: TreeNode<Key, Val>;
    left: TreeNode<Key, Val>;
    constructor(key: Key, val: Val);
}
/**
 * Binary search tree
 * @template Key
 * @template Val
 */
export declare class BinarySearchTree<Key extends number | string, Val> {
    private root;
    get minKey(): Key;
    get min(): TreeNode<Key, Val>;
    get maxKey(): Key;
    get max(): TreeNode<Key, Val>;
    /**
     * Check if the tree has at least one element
     *
     * @returns
     */
    isEmpty(): boolean;
    /**
     * Set tree node into the tree.
     * @param key
     * @param val
     */
    set(key: Key, val: Val): void;
    private recursiveSet;
    /**
     * Gets Tree node by key from binary search tree
     * @param key
     * @returns get
     */
    get(key: Key): Val | null;
    private recursiveGet;
    private recursiveDelMin;
    /**
     * Deletes TreeNode by key from binary search tree
     * @param key
     */
    delete(key: Key): void;
    /**
     * Clear binary search tree
     */
    clear(): void;
    private delRecursively;
    private findMin;
    private findMax;
    /**
     * Return all tree nodes in binary search tree
     * @returns entries
     */
    entries(): TreeNode<Key, Val>[];
    private entriesRecursively;
    /**
     * Return all keys in binary search tree
     * @returns keys
     */
    keys(): Key[];
    /**
     * Return true if binary search tree contains key
     * @param key
     * @returns true if has
     */
    has(key: Key): boolean;
    /**
     * Return all values in binary search tree
     * @returns values
     */
    values(): Val[];
    /**
     * Prints binary search tree
     * Inspired by https://flaviocopes.com/golang-data-structure-binary-search-tree/
     * @returns
     */
    print(): void;
    private stringify;
    /**
     * Return max height of Binary Search Tree
     * @returns max height
     */
    get height(): number;
    private getMaxHeightRecursively;
}
export {};
