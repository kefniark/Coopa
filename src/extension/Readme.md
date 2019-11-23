# Type Extension API

#### Array
```ts
import { ArrayExt } from "coopa"

ArrayExt.clone(arr)
ArrayExt.isEmpty(arr)
ArrayExt.first(arr)
ArrayExt.last(arr)
ArrayExt.insert(arr, index: number, element: T)
ArrayExt.removeIndex(arr, index: number)
ArrayExt.remove(arr, element: T)
ArrayExt.shuffle(arr)
ArrayExt.random(arr)
ArrayExt.sum(arr)
ArrayExt.avg(arr)
```

#### String
```ts
import { StringExt } from "coopa"

StringExt.isNullOrEmpty(str)
StringExt.capitalize(str)
StringExt.capitalizeWords(str)
StringExt.contains(str: string, search: string)
StringExt.slugify(str, lower?: boolean)
```

#### Check
```ts
import { ObjectExt } from "coopa"

ObjectExt.isString(val: any): boolean
ObjectExt.isArray(val: any): boolean
ObjectExt.isNumeric(val: any): boolean
ObjectExt.clone(val: T): T
```