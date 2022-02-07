//f: A -> [A] -> [A]
const filter = <A>(a: A, arr: A[]): A[] => {
  return arr.filter((item: A) => item !== a);
};

//f: Number -> Number -> [A] -> [A]
const f = <A>(x: Number, y: Number, val: A[]): A[] => {
  return val;
};

//f: [String] -> {String: any} -> {String: any}
const g = (val: [String], obj: { String: any }): { String: any } => {
  return { String: 1 };
};

//f: [A] → [B] → [[A,B]]
const combine = <A, B>(val: A[], val2: B[]): [[A, B]] => {
  return [[val[0], val2[0]]];
};

//Testing
console.log(filter(1, [2, 2, 3, 4, 1]));

console.log(combine([1], ["hello"]));
