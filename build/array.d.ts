interface Array<T> {
    clone: () => T[];
    isEmpty: () => boolean;
    first: () => T;
    last: () => T;
    insert: (index: number, element: T) => void;
    removeIndex: (index: number) => void;
    remove: (element: T) => void;
    shuffle: () => T[];
    sum: () => number;
    avg: () => number;
    random: () => T;
}
