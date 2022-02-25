interface Form<T, E> {
  formValues: T;
  formErrors: E;
}

interface LocationInfo {
  city: string;
  province: string;
  country: string;
  continent: string;
}

type Errors<T> = {
  [Property in keyof T]?: T[Property];
};

const form: Form<LocationInfo, Errors<LocationInfo>> = {
  formValues: {
    city: "Calgary",
    province: "AB",
    country: "Canada",
    continent: "Europe",
  },
  formErrors: {
    continent: "Europe",
  },
};
