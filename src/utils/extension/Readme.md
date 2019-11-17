# Type Extension API

#### Array
```ts
Array.clone()
Array.isEmpty()
Array.first()
Array.last()
Array.insert(index: number, element: T)
Array.removeIndex(index: number)
Array.remove(element: T)
Array.shuffle()
Array.random()
Array.sum()
Array.avg()
```

#### String
```ts
String.capitalize()
String.capitalizeWords()
String.contains(val: string)
String.slugify(lower?: boolean)
```

#### Check
```ts
isString(val: any): boolean
isArray(val: any): boolean
isNumeric(val: any): boolean
isObjectEmpty(val: any): boolean
clone(val: T): T
```