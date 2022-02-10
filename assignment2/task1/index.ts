//f: A -> [A] -> [A]
const filter = <A>(a: A, arr: A[]): A[] => {
  return arr.filter((item: A) => item !== a);
};

const concat = <A>(a: A, arr: A[]): A[] => {
  return arr.concat(a);
};

//f: Number -> Number -> [A] -> [A]
const slice = <A>(start: number, end: number, val: A[]): A[] => {
  return val.slice(start, end);
};

//f: [String] -> {String: any} -> {String: any}
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

// f: [A] → [B] → [[A,B]]
const combine = <A, B>(val: A[], val2: B[]): [A[], B[]] => {
  return [[...val], [...val2]];
};

//Usage
console.log(filter(1, [2, 2, 3, 4, 1]));
console.log(concat(1, [5, 4, 3, 2]));
console.log(slice(1, 5, ["a", "b", "c", "d", "e", "f"]));
console.log(extract(["a", "b", "c", "d"], { b: 1, c: 2 }));
console.log(combine([1, 2, 3, 4], ["a", "b", "c", "d"]));
