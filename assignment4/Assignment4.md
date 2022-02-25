# Assignment 4

### Link to assignment: https://github.com/vivid-theory/composable-software-construction-assignments/blob/main/assignment4.md

## Task 1 Solution

```ts
type Cat = {
  name: string;
  color: string;
  age: number;
  legs: number;
};

type CatOptions = {
  name?: string;
  color?: string;
  age?: number;
  legs?: number;
};
```

### Deliverable 1

#### Implement Omit utility type using MappedTypes, keyof and Exclude

```ts
type myOmit<T, G extends keyof T> = {
  [Property in Exclude<keyof T, G>]: T[Property];
};

let someFromCat: myOmit<Cat, "name"> = {
  color: "red",
  age: 5,
  legs: 5,
};
```

### Deliverable 2

#### Implement Pick utility type using MappedTypes, keyof and Extract

```ts
type myPick<T, G extends keyof T> = {
  [Property in Extract<keyof T, G>]: T[Property];
};

let someFromCat: myPick<Cat, "color" | "age"> = {
  color: "yellow",
  age: 7,
};
```

### Deliverable 3

#### Implement Partial and Required utility types

##### Partial type

```ts
type myPartial<T> = {
  [Property in keyof T]?: T[Property];
};

let someFromCat: myPartial<Cat> = {
  color: "yellow",
  age: 7,
};
```

##### Required type

```ts
type myRequired<T> = {
  [Property in keyof T]-?: T[Property];
};

let requiredCat: myRequired<CatOptions> = {
  name: "cat",
  color: "brown",
  age: 54,
  legs: 0,
};
```

### Deliverable 4

#### Type X has properties x, y, z. Type Y extends X with properties s, t and u. Build a type which includes properties from type Y NOT in type X

```ts
type X = {
  x: string;
  y: string;
  z: string;
};
type Y = X & {
  s: string;
  t: string;
  u: string;
};

type Y_Not_X = Omit<Y, "x" | "y" | "z">;

let some: Y_Not_X = {
  s: "s",
  t: "t",
  u: "u",
};
```

## Task 2 Solution

### Deliverable 1

#### Given Form<T>, map errors type to collect possible errors

```ts
interface Form<T, E> {
  formValues: T;
  formErrors: E;
}

interface LocationInfo {
  city: string;
  province: string;
  country: string;
  continent: string;
}

type Errors<T> = {
  [Property in keyof T]?: T[Property];
};

const form: Form<LocationInfo, Errors<LocationInfo>> = {
  formValues: {
    city: "Calgary",
    province: "AB",
    country: "Canada",
    continent: "Europe",
  },
  formErrors: {
    continent: "Europe",
  },
};
```

## Task 3 Solution

### Starter tree structure

```ts
type Tree<A> = Leaf<A> | Branch<A>;

class Leaf<A> {
  tag: "leaf" = "leaf";
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }
}

class Branch<A> {
  tag: "branch" = "branch";
  readonly left: Tree<A>;
  readonly right: Tree<A>;

  constructor(left: Tree<A>, right: Tree<A>) {
    this.left = left;
    this.right = right;
  }
}
```

### Deliverable 1

#### Implement a size function that counts the number of leaves and branches (nodes) in a tree

```ts
const size = <A>(tree: Tree<A>): number => {
  if (isLeaf(tree)) {
    return 1;
  }
  return 1 + size(tree.left) + size(tree.right);
};

console.log("Size: " + size(myTree));
```

### Deliverable 2

#### Implement a max that returns the maximum value contained in a tree of numbers

```ts
const max = (tree: Tree<number>, currentMax: number = 0) => {
  if (isLeaf(tree)) {
    currentMax = tree.value > currentMax ? tree.value : currentMax;
  } else {
    currentMax = max(tree.left, currentMax);
    currentMax = max(tree.right, currentMax);
  }
  return currentMax;
};

console.log("Max: " + max(myTree));
```

### Deliverable 3

#### Implement a depth that returns the maximum path length from the root node to any leaf

```ts
const depth = <A>(
  tree: Tree<A>,
  maxCount: number = 0,
  currentCount: number = 0
) => {
  if (isLeaf(tree)) {
    currentCount++;
    if (currentCount > maxCount) {
      maxCount = currentCount;
    }
  } else {
    currentCount++;
    maxCount = depth(tree.left, maxCount, currentCount);
    maxCount = depth(tree.right, maxCount, currentCount);
  }
  return maxCount;
};

console.log("Depth: " + depth(myTree));
```

### Deliverable 4

#### Implement a map that applies a function to each element in the tree

```ts
const map = <A>(tree: Tree<A>, func: (val: A) => A): Tree<A> => {
  if (isLeaf(tree)) {
    return new Leaf(func(tree.value));
  } else {
    return new Branch(map(tree.left, func), map(tree.right, func));
  }
};

console.log(
  map(myTree, (val: number) => {
    return val * 2;
  })
);
```

### Deliverable 5

#### Implement a filter that removes tree nodes based on a condition

```ts
const filter = <A>(tree: Tree<A>, func: (val: A) => boolean): any => {
  if (isLeaf(tree) && func(tree.value)) {
    return;
  } else if (isLeaf(tree) && !func(tree.value)) {
    return new Leaf(tree.value);
  } else if (isBranch(tree)) {
    return new Branch(filter(tree.left, func), filter(tree.right, func));
  }
};

console.log(
  filter(myTree, (val: number) => {
    return val === 8;
  })
);
```

### Deliverable 6

#### Implement a zip that creates a new tree out of two supplied trees by pairing up equally-positioned items from both trees

```ts

```
