# Assignment 1

### Link to assignment: https://github.com/vivid-theory/composable-software-construction-assignments/blob/main/assignment1.md


## Task 1 Solution

### Typescript implementation of building URL
```ts
function urlBuilder(
  protocol: string
): (domainName: string) => (extension: string) => string {
  return function (domainName: string): (extension: string) => string {
    return function (extension: string): string {
      return protocol + "://" + domainName + "." + extension;
    };
  };
}
```

### Usage of urlBuilder in Typescript
```ts
const protocol = urlBuilder("https");
const domainName = protocol("heyauto");
const full = domainName("com");
console.log(full);

const full2 = urlBuilder("https")("google")("com");
console.log(full2);
```

### Elm implementation of building URL
```elm
constructUrl : String -> String -> String -> String
constructUrl protocol domainName extension  =
    protocol ++ "://" ++ domainName ++ "." ++ extension
```

### Usage of constructUrl in Elm
```elm
func1 = constructUrl "https"
func2 = func1 "heyauto"
full = func2 "com"

allInOne = constructUrl "https" "heyauto" "com"
```


## Task 2 Solution

### Usage of compose in Typescript example 1
```ts
function divideBy10(x: number): number {
  return x / 10;
}

function multiplyBy100(x: number): number {
  return x * 100;
}

const addOneZeroCompose = compose(divideBy10, multiplyBy100);
console.log(addOneZeroCompose(5));
```

### Usage of compose in Typescript example 2
```ts
function stripExtension(partialUrl: string): string {
  return partialUrl.substring(0, partialUrl.indexOf("."));
}

function stripDomain(partialUrl: string): string {
  return partialUrl.substring(0, partialUrl.indexOf("://"));
}

const getProtocolComposed = compose(stripDomain, stripExtension);
console.log(getProtocolComposed("https://heyauto.com"));
```

### Usage of pipe in Typescript example 1
```ts
function divideBy10(x: number): number {
  return x / 10;
}

function multiplyBy100(x: number): number {
  return x * 100;
}

const addOneZeroPipe = pipe(multiplyBy100, divideBy10);
console.log(addOneZeroPipe(5));
```

### Usage of pipe in Typescript example 2
```ts
function stripExtension(partialUrl: string): string {
  return partialUrl.substring(0, partialUrl.indexOf("."));
}

function stripDomain(partialUrl: string): string {
  return partialUrl.substring(0, partialUrl.indexOf("://"));
}

const getProtocolPiped = pipe(stripExtension, stripDomain);
console.log(getProtocolPiped("http://google.com"));
```

### Differences between compose and pipe in Typescript
Compose executes functions from right to left, where the rightmost function (the first function to be executed) may have any arity, 
meaning any number of arguments may be passed in, whereas all other functions must be unary (only one argument)

Pipe is the opposite, and executes functions from left to right, where the lefmost function may have any arity, whereas all other functions
must be unary


### Writing a compose operator in Typescript
```ts
const composeOperator = (...argsFunc: Function[]): ((arg: any) => any) => {
  return function (...argsParam: any[]) {
    let i: number = argsFunc.length - 1;
    let nextArg: any = argsParam[0];
    for (i; i >= 0; i--) {
      nextArg = argsFunc[i](nextArg);
    }
    return nextArg;
  };
};
```
composeOperator takes an array of functions as its only argument, then returns a function that takes in any number of arguments (as the first function to be
executed can have any number of arguments). This anonymous function then loops through the array of functions in reverse (as compose begins with the last function
provided), and calls each function with the output of the previously called function as its only argument (as all functions - except the first - must be unary).

### Usage of composeOperator
```ts
function divideBy10(x: number): number {
  return x / 10;
}

function multiplyBy100(x: number): number {
  return x * 100;
}

const compOp = composeOperator(divideBy10, multiplyBy100);
console.log("Compose operator result is: " + compOp(5));
```

### Writing a pipe operator in Typescript
```ts
const pipeOperator = (...argsFunc: Function[]): ((arg: any) => any) => {
  return function (...argsParam: any[]) {
    let nextArg: any = argsParam[0];
    for (let i: number = 0; i < argsFunc.length; i++) {
      nextArg = argsFunc[i](nextArg);
    }
    return nextArg;
  };
};
```
pipeOperator works the same way as composeOperator, except it loops forward through the array of functions.

### Usage of pipeOperator
```ts
function divideBy10(x: number): number {
  return x / 10;
}

function multiplyBy100(x: number): number {
  return x * 100;
}
  
const pipeOp = pipeOperator(multiplyBy100, divideBy10);
console.log("Pipe operator result is: " + pipeOp(5));
```

### Usage of compose in the HeyAuto codebase
Compose is used when setting actions (modal actions, toaster actions, etc.), then dispatching that action

```ts
const handleClose = compose(dispatch, modalActions.closeModal);
```


## Task 3 Solution

### Implementation of generic example
```ts
const f = <A, B, C>(g: BinaryFunction<A, B, C>, a: A): UnaryFunction<B, C> => {
  return function (x: B) {
    return g(a, x);
  };
};
```

### Adding functions to demonstrate use of f
```ts
function multiplyNumbers(x: number, y: number): number {
  return x * y;
}

function printANumber(result: number): void {
  console.log(result);
}
```

### Function f is a partial function, the snippet below demonstrates its usage in multiple ways
```ts
console.log(f(Math.pow, 2)(2));

console.log(f(multiplyNumbers, 2)(4));

const result = pipe(f(multiplyNumbers, 4), printANumber);
result(4);
```
