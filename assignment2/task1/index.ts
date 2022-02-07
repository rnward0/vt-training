//f: A -> [A] -> [A]
function replace<A>(a: A, arr: [A]): [A] {
  arr[0] = a;
  return arr;
}

//f: Number -> Number -> [A] -> [A]
function f<A>(x: Number, y: Number, val: [A]): [A] {
  return val;
}

//f: [String] -> {String: any} -> {String: any}
function g(val: [String], obj: { String: any }): { String: any } {
  return { String: 1 };
}

//f: [A] → [B] → [[A,B]]
function combine<A, B>(val: [A], val2: [B]): [[A, B]] {
  return [[val[0], val2[0]]];
}

//Testing
console.log(replace(1, [2]));
console.log(f(1, 2, ["something"]));

console.log(combine([1], ["hello"]));
