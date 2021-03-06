{
  //DEL. 1
  type NotStarted = { __tag: "Not Started" };
  type Progress = { __tag: "Progress"; val: number };
  type Finished<T> = { __tag: "Finished"; val: T };

  //DEL. 2
  //Discriminated union type
  type ProgressOption<T> = NotStarted | Progress | Finished<T>;

  //Constructors
  const notStarted = <T>(): ProgressOption<T> => {
    return { __tag: "Not Started" };
  };
  const progress = <T>(): ProgressOption<T> => {
    return { __tag: "Progress", val: 0 };
  };
  const finished = <T>(v: T): ProgressOption<T> => {
    return { __tag: "Finished", val: v };
  };

  //Typeguards
  const isNotStarted = <T>(o: ProgressOption<T>): o is NotStarted =>
    o.__tag === "Not Started";
  const isProgressing = <T>(o: ProgressOption<T>): o is Progress =>
    o.__tag === "Progress";
  const isFinished = <T>(o: ProgressOption<T>): o is Finished<T> =>
    o.__tag === "Finished";

  //Helper methods
  const getProgress = <T>(o: ProgressOption<T>): number => {
    if (isProgressing(o)) {
      return o.val;
    }
    return 0;
  };

  const getFinishedVal = <T>(o: ProgressOption<T>): T | string => {
    if (isFinished(o)) {
      return o.val;
    }
    return "Not finished!";
  };

  //Del. 3 and extension 2
  const match = <T, G>(
    val: ProgressOption<T>,
    a: (t: T) => G,
    b: (t: number) => G,
    c: () => G
  ): G => {
    if (isNotStarted(val)) {
      return c();
    } else if (isProgressing(val)) {
      return b(val.val);
    } else {
      return a(val.val);
    }
  };

  const fold = <T>(opt: ProgressOption<T>, f: () => T): number | T => {
    if (isNotStarted(opt)) {
      return f();
    } else {
      return opt.val;
    }
  };

  //Extension 1
  const map = <T, G>(
    val: ProgressOption<T>,
    a: (t: T) => G
  ): ProgressOption<G> => {
    if (isNotStarted(val)) {
      return notStarted();
    } else if (isProgressing(val)) {
      return progress();
    } else {
      return finished(a(val.val));
    }
  };
}

//*************Remote Data Implementation ******************/
{
  type Initialized = { __tag: "Initialized" };
  type Pending = { __tag: "Pending" };
  type Failure<E> = { __tag: "Failure"; e: E };
  type Success<D> = { __tag: "Success"; data: D };

  type RemoteData<E, D> = Initialized | Pending | Failure<E> | Success<D>;

  const initialize = <E, D>(): RemoteData<E, D> => {
    return { __tag: "Initialized" };
  };
  const pending = <E, D>(): RemoteData<E, D> => {
    return { __tag: "Pending" };
  };
  const failure = <E, D>(e: E): RemoteData<E, D> => {
    return { __tag: "Failure", e: e };
  };
  const success = <E, D>(data: D): RemoteData<E, D> => {
    return { __tag: "Success", data: data };
  };

  const isInitialized = <E, D>(val: RemoteData<E, D>): val is Initialized =>
    val.__tag === "Initialized";
  const isPending = <E, D>(val: RemoteData<E, D>): val is Pending =>
    val.__tag === "Pending";
  const isFailure = <E, D>(val: RemoteData<E, D>): val is Failure<E> =>
    val.__tag === "Failure";
  const isSuccess = <E, D>(val: RemoteData<E, D>): val is Success<D> =>
    val.__tag === "Success";

  //match function implementation
  interface Match<T, E, D> {
    Initialize: () => T;
    Pending: () => T;
    Failure: (err: E) => T;
    Success: (data: D) => T;
  }

  const remoteMatch = <T, E, D>(
    data: RemoteData<E, D>,
    matcher: Match<T, E, D>
  ): T => {
    if (isInitialized(data)) {
      return matcher.Initialize();
    } else if (isPending(data)) {
      return matcher.Pending();
    } else if (isFailure(data)) {
      return matcher.Failure(data.e);
    } else {
      return matcher.Success(data.data);
    }
  };

  const print = (data: any) =>
    remoteMatch<number, string, number>(data, {
      Initialize: () => {
        console.log("intialized");
        return 0;
      },
      Pending: () => {
        console.log("pending");
        return 0;
      },
      Failure: (e: string) => {
        console.log("not available - " + e);
        return 0;
      },
      Success: (data: number) => {
        console.log("successful! - " + data);
        return data;
      },
    });

  let data: RemoteData<string, number> = initialize();
  print(data);
  data = pending();
  print(data);
  data = failure("Data not found!");
  print(data);
  data = success(20);
  print(data);
}
