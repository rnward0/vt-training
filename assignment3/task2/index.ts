import { Option, some, option, none } from "ts-option";
import _ from "lodash";

const numOption: Option<number> = option(10);
const stringOption: Option<string> = some("something");
const nothing: Option<never> = none;

interface SomeOrNone<A, B> {
  some: (val: A) => B;
  none: () => B;
}

//My implementation of match and fold using ts-option helper methods
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

//Usage of ts-option and my match
console.log(
  "Original match: " +
    numOption.match({
      some: (val: number) => val,
      none: () => -1,
    })
);

console.log(
  "My match: " +
    myMatch<number, number>(numOption, {
      some: (val: number) => val,
      none: () => -1,
    })
);

//Usage of ts-option and my fold
console.log(
  "Original fold: " + numOption.fold(() => -1)((val: number) => val * 2)
);

console.log("My fold " + myFold(numOption, () => -1)((val: number) => val * 2));

//Mapping using Option
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
