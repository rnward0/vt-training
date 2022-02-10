# Assignment 2

### Link to assignment: https://github.com/vivid-theory/composable-software-construction-assignments/blob/main/assignment2.md


## Task 1 Solution

### f: A -> [A] -> [A]
#### Implementation 1
```
const filter = <A>(a: A, arr: A[]): A[] => {
  return arr.filter((item: A) => item !== a);
};

```
#### Implementation 2
```
const concat = <A>(a: A, arr: A[]): A[] => {
  return arr.concat(a);
};
```
