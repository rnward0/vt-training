//f: A -> [A] -> [A]
const filter = <A>(a: A, arr: A[]): A[] => {
  return arr.filter((item: A) => item !== a);
};

//f: Number -> Number -> [A] -> [A]
const slice = <A>(start: number, end: number, val: A[]): A[] => {
  return val.slice(start, end);
};

//f: [String] -> {String: any} -> {String: any}
const g = (val: string[], obj: { [k: string]: any }): { [k: string]: any } => {
  return { anything: 1 };
};

// f: [A] → [B] → [[A,B]]
const combine = <A, B, C>(val: Array<A>, val2: Array<B>): C[][] => {
  return Array(Array.prototype.concat(val, val2));
};

//Usage
console.log(filter(1, [2, 2, 3, 4, 1]));
console.log(slice(1, 5, ["a", "b", "c", "d", "e", "f"]));
console.log(combine([1, 2, 3, 4], ["a", "b", "c", "d"]));
console.log(combine([1, 2, 3, 4], ["hello", "hi", "hey", "yes"]));
