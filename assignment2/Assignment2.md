# Assignment 2

### Link to assignment: https://github.com/vivid-theory/composable-software-construction-assignments/blob/main/assignment2.md


## Task 1 Solution

### f: A -> [A] -> [A]
#### Implementation 1
```js
const filter = <A>(a: A, arr: A[]): A[] => {
  return arr.filter((item: A) => item !== a);
};
```
#### Implementation 2
```js
const concat = <A>(a: A, arr: A[]): A[] => {
  return arr.concat(a);
};
```

#### Usage
```js
filter(1, [2, 2, 3, 4, 1]);
concat(1, [5, 4, 3, 2]);
```

### f: Number -> Number -> [A] -> [A]
#### Implementation
```js
const slice = <A>(start: number, end: number, val: A[]): A[] => {
  return val.slice(start, end);
};
```

#### Usage
```js
slice(1, 5, ["a", "b", "c", "d", "e", "f"]);
```

### f: [String] -> {String: any} -> {String: any}
#### Implementation
```js
const extract = (
  val: string[],
  obj: Record<string, any>
): Record<string, any> => {
  const newObj: Record<string, any> = {};
  val.forEach((item: string) => {
    if (obj[item] !== undefined) {
      newObj[item] = obj[item];
    }
  });
  return newObj;
};
```

#### Usage
```js
extract(["a", "b", "c", "d"], { b: 1, c: 2 });
```


### f: [A] → [B] → [[A,B]]
#### Implementation
```js
const combine = <A, B>(val: A[], val2: B[]): [A[], B[]] => {
  return [[...val], [...val2]];
};
```

#### Usage
```js
combine([1, 2, 3, 4], ["a", "b", "c", "d"]);
```
















