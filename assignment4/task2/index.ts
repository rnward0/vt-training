interface Form<T> {
  formValues: T;
  formErrors: Errors<T>;
}

type Errors<T> = {
  [Property in keyof T]-?: string;
};

const form: Form<Object> = {
  formValues: {
    city: "Calgary",
    provnce: "AB",
    country: "Canada",
    continent: "Europe",
  },
};
