type UnaryFunction<A, B> = (x: A) => B;
type BinaryFunction<A, B, C> = (y: A, z: B) => C;

//Step 1: Implementation
const f = <A, B, C>(g: BinaryFunction<A, B, C>, a: A): UnaryFunction<B, C> => {
  return function (x: B) {
    return g(a, x);
  };
};

//Step 2: partial

//Step 3: Demonstrate use
console.log(f(Math.pow, 2)(2));
