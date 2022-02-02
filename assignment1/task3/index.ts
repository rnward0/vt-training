import { pipe } from "ramda";

type UnaryFunction<A, B> = (x: A) => B;
type BinaryFunction<A, B, C> = (y: A, z: B) => C;

//Step 1: Implementation
const f = <A, B, C>(g: BinaryFunction<A, B, C>, a: A): UnaryFunction<B, C> => {
  return function (x: B) {
    return g(a, x);
  };
};

function multiplyNumbers(x: number, y: number): number {
  return x * y;
}

function printANumber(result: number): void {
  console.log(result);
}

//Step 2: Function name is partial

//Step 3: Demonstrate use
console.log(f(Math.pow, 2)(2));

console.log(f(multiplyNumbers, 2)(4));

const result = pipe(f(multiplyNumbers, 4), printANumber);
result(4);
