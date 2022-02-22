interface Form<T> {
  formValues: T;
  formErrors: Errors<T>;
}

type Errors<T> = {
  [Property in Partial<keyof T>]: string;
};
