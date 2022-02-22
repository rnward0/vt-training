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

{
  //Deliverable 1
  type myOmit<T, G extends keyof T> = {
    [Property in Exclude<keyof T, G>]: T[Property];
  };

  let someFromCat: myOmit<Cat, "name"> = {
    color: "red",
    age: 5,
    legs: 5,
  };
  console.log(someFromCat);
}

{
  //Deliverable 2
  type myPick<T, G extends keyof T> = {
    [Property in Extract<keyof T, G>]: T[Property];
  };

  let someFromCat: myPick<Cat, "color" | "age"> = {
    color: "yellow",
    age: 7,
  };
  console.log(someFromCat);
}

{
  //Deliverable 3
  type myPartial<T> = {
    [Property in keyof T]?: T[Property];
  };

  let someFromCat: myPartial<Cat> = {
    color: "yellow",
    age: 7,
  };
  console.log(someFromCat);

  type myRequired<T> = {
    [Property in keyof T]-?: T[Property];
  };

  let requiredCat: myRequired<CatOptions> = {
    name: "cat",
    color: "brown",
    age: 54,
    legs: 0,
  };

  console.log(requiredCat);
}

{
  //Deliverable 4
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
}
