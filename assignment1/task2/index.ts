import { compose, pipe } from "ramda";

//Step 1: Use of compose and pipe
{
  function divideBy10(x: number): number {
    return x / 10;
  }

  function multiplyBy100(x: number): number {
    return x * 100;
  }

  const addOneZeroCompose = compose(divideBy10, multiplyBy100);
  console.log(addOneZeroCompose(5));

  const addOneZeroPipe = pipe(multiplyBy100, divideBy10);
  console.log(addOneZeroPipe(5));
}

{
  function stripExtension(partialUrl: string): string {
    return partialUrl.substring(0, partialUrl.indexOf("."));
  }

  function stripDomain(partialUrl: string): string {
    return partialUrl.substring(0, partialUrl.indexOf("://"));
  }

  const getProtocolComposed = compose(stripDomain, stripExtension);
  console.log(getProtocolComposed("https://heyauto.com"));

  const getProtocolPiped = pipe(stripExtension, stripDomain);
  console.log(getProtocolPiped("http://google.com"));
}

//Step 2: Difference:
// Compose executes functions right to left, whereas pipe exectues left to right

//Step 3: Write a compose operator (added a pipe operator as well)
{
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

  const pipeOperator = (...argsFunc: Function[]): ((arg: any) => any) => {
    return function (...argsParam: any[]) {
      let nextArg: any = argsParam[0];
      for (let i: number = 0; i < argsFunc.length; i++) {
        nextArg = argsFunc[i](nextArg);
      }
      return nextArg;
    };
  };

  function divideBy10(x: number): number {
    return x / 10;
  }

  function multiplyBy100(x: number): number {
    return x * 100;
  }

  const compOp = composeOperator(divideBy10, multiplyBy100);
  console.log("Compose operator result is: " + compOp(5));

  const pipeOp = pipeOperator(multiplyBy100, divideBy10);
  console.log("Pipe operator result is: " + pipeOp(5));
}

//Step 4: Where is function composition used in heyauto and where should it be used?
// - Used when setting actions (modal actions, toaster actions, etc.), then dispatching that action
