// Typescript implementation and demonstration of add and urlBuilder functions with partial application

{
  function add(x: number): (y: number) => number {
    return function (y: number): number {
      return x + y;
    };
  }

  const res1: Function = add(1);
  const res2: number = res1(10);

  const res3: number = add(10)(10);

  console.log(res3);
}

{
  function urlBuilder(
    protocol: string
  ): (domainName: string) => (extension: string) => string {
    return function (domainName: string): (extension: string) => string {
      return function (extension: string): string {
        return protocol + "://" + domainName + "." + extension;
      };
    };
  }

  const protocol = urlBuilder("https");
  const domainName = protocol("heyauto");
  const full = domainName("com");
  console.log(full);

  const full2 = urlBuilder("https")("google")("com");
  console.log(full2);
}

// Elm implementation and demonstration of urlBuilder function with partial application
// https://ellie-app.com/gzVfvHxLWkba1
