# Assignment 3

### Link to assignment: https://github.com/vivid-theory/composable-software-construction-assignments/blob/main/assignment3.md

## Task 1 Solution

### Deliverable 1

#### Create a three + state union type where two + of the states contain a value

```ts
type NotStarted = { __tag: "Not Started" };
type Progress = { __tag: "Progress"; val: number };
type Finished<T> = { __tag: "Finished"; val: T };
```

### Deliverable 2

#### Implement constructors, discriminated union, typeguards, and other access methods

#### Discriminated Union

```ts
type ProgressOption<T> = NotStarted | Progress | Finished<T>;
```

#### Constructors

```ts
const notStarted = <T>(): ProgressOption<T> => {
  return { __tag: "Not Started" };
};
const progress = <T>(): ProgressOption<T> => {
  return { __tag: "Progress", val: 0 };
};
const finished = <T>(v: T): ProgressOption<T> => {
  return { __tag: "Finished", val: v };
};
```

#### Typeguards

```ts
const isNotStarted = <T>(o: ProgressOption<T>): o is NotStarted =>
  o.__tag === "Not Started";
const isProgressing = <T>(o: ProgressOption<T>): o is Progress =>
  o.__tag === "Progress";
const isFinished = <T>(o: ProgressOption<T>): o is Finished<T> =>
  o.__tag === "Finished";
```

#### Helper methods (getters)

```ts
const getProgress = <T>(o: ProgressOption<T>): number => {
  if (isProgressing(o)) {
    return o.val;
  }
  return 0;
};

const getFinishedVal = <T>(o: ProgressOption<T>): T | string => {
  if (isFinished(o)) {
    return o.val;
  }
  return "Not finished!";
};
```

### Deliverable 3 and extension 2

#### Build a match or fold function for your type (match below is also a partial match)

```ts
const match = <T, G>(
  val: ProgressOption<T>,
  a: (t: T) => G,
  b: (t: number) => G,
  c: () => G
): G => {
  if (isNotStarted(val)) {
    return c();
  } else if (isProgressing(val)) {
    return b(val.val);
  } else {
    return a(val.val);
  }
};

const fold = <T>(opt: ProgressOption<T>, f: () => T): number | T => {
  if (isNotStarted(opt)) {
    return f();
  } else {
    return opt.val;
  }
};
```

#### Extension 1

#### Implementation of mapping

```ts
const map = <T, G>(
  val: ProgressOption<T>,
  a: (t: T) => G
): ProgressOption<G> => {
  if (isNotStarted(val)) {
    return notStarted();
  } else if (isProgressing(val)) {
    return progress();
  } else {
    return finished(a(val.val));
  }
};
```

## Task 2 Solution

### Deliverable 1

#### Demonstrate implementation of a community library definition of a discriminated/tagged/disjoint union (using ts-option below)

```ts
import { Option, some, option, none } from "ts-option";
import _ from "lodash";

const numOption: Option<number> = option(10);
const stringOption: Option<string> = some("something");
const nothing: Option<never> = none;

interface SomeOrNone<A, B> {
  some: (val: A) => B;
  none: () => B;
}
```

### Deliverable 2

#### Demonstrate some exotic mapping, applicative, folding, chaining, and helper methods

#### Usage of ts-option with match, fold, myMatch, and myFold implementation (below)

```ts
console.log(
  "Original fold: " + numOption.fold(() => -1)((val: number) => val * 2)
);

console.log("My fold " + myFold(numOption, () => -1)((val: number) => val * 2));
```

```ts
console.log(
  "Original match: " +
    numOption.match({ some: (val: number) => val, none: () => -1 })
);

console.log(
  "My match: " +
    myMatch<number, number>(numOption, {
      some: (val: number) => val,
      none: () => -1,
    })
);
```

#### Mapping using Option

```ts
const numArrayOption: Option<Array<number>> = some([1, 2, 3, 4, 5]);

console.log(numArrayOption.get.map((num) => num * 2));

const stringArrayOption: Option<Array<string>> = some([
  "a",
  "b",
  "c",
  "d",
  "e",
]);

console.log(stringArrayOption.get.map((val) => _.toUpper(val)));
```

### Deliverable 3

#### Implementation of fold and match

```ts
const myMatch = <A, B>(opt: Option<A>, son: SomeOrNone<A, B>): B => {
  if (opt.isEmpty) {
    return son.none();
  } else {
    return son.some(opt.get);
  }
};

const myFold = <A>(opt: Option<A>, f: () => A): ((g: (val: A) => A) => A) => {
  if (opt.isEmpty) {
    return f;
  } else {
    return (g: (val: A) => A): A => {
      return g(opt.get);
    };
  }
};
```
