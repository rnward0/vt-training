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

//Step 2: Differences:
