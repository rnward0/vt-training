# Assignment 2

### Link to assignment: https://github.com/vivid-theory/composable-software-construction-assignments/blob/main/assignment2.md

## Task 1 Solution

### f: A -> [A] -> [A]

#### Implementation 1

```js
const filter = <A>(a: A, arr: A[]): A[] => {
  return arr.filter((item: A) => item !== a);
};
```

#### Implementation 2

```js
const concat = <A>(a: A, arr: A[]): A[] => {
  return arr.concat(a);
};
```

#### Usage

```js
filter(1, [2, 2, 3, 4, 1]);
concat(1, [5, 4, 3, 2]);
```

### f: Number -> Number -> [A] -> [A]

#### Implementation

```js
const slice = <A>(start: number, end: number, val: A[]): A[] => {
  return val.slice(start, end);
};
```

#### Usage

```js
slice(1, 5, ["a", "b", "c", "d", "e", "f"]);
```

### f: [String] -> {String: any} -> {String: any}

#### Implementation

```js
const extract = (
  val: string[],
  obj: Record<string, any>
): Record<string, any> => {
  const newObj: Record<string, any> = {};
  val.forEach((item: string) => {
    if (obj[item] !== undefined) {
      newObj[item] = obj[item];
    }
  });
  return newObj;
};
```

#### Usage

```js
extract(["a", "b", "c", "d"], { b: 1, c: 2 });
```

### f: [A] → [B] → [[A,B]]

#### Implementation

```js
const combine = <A, B>(val: A[], val2: B[]): [A, B][] => {
  return val.map((item, index) => [item, val2[index]]);
};
```

#### Usage

```js
combine([1, 2, 3, 4], ["a", "b", "c", "d"]);
```

## Task 2 Solution

#### Implementation for fetching mock data

```js
function fetchMockData(variant: "posts"): (id?: number) => Promise<ApiResponse<Post>>;
function fetchMockData(variant: "comments"): (id?: number) => Promise<ApiResponse<Comment>>;
function fetchMockData(variant: "posts" | "comments") {
  return (id?: number) => {
    if (variant === "posts") {
      if (id !== undefined)
        url = `https://jsonplaceholder.typicode.com/posts/${id}`;
      else url = `https://jsonplaceholder.typicode.com/posts`;
    } else {
      if (id !== undefined)
        url = `https://jsonplaceholder.typicode.com/comments?postId=${id}`;
      else url = `https://jsonplaceholder.typicode.com/comments`;
    }

    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        return match(right(res));
      })
      .catch((err) => {
        return match(left(err));
      });
  };
}
```

#### Implementation for fetchComments() and fetchPosts() that use fetchMockData()

```js
const fetchComments = () => {
  return fetchMockData("comments");
};

const fetchPosts = () => {
  return fetchMockData("posts");
};
```

#### Implementation of match function

```js
const match = (
  val: Either<string, Comment[] | Post[]>
): ApiResponse<Comment | Post> => {
  switch (val._tag) {
    case "Left":
      const objL: ApiResponse<Comment | Post> = {
        status: "error",
        error: val.left,
      };
      return objL;
    case "Right":
      const objR: ApiResponse<Comment | Post> = {
        status: "success",
        data: val.right,
      };
      return objR;
  }
};
```

#### Implementation of script that obtains posts, comments, comments on given post, and specific post

```js
const run = () => {
  fetchComments()()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  fetchComments()(20)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  fetchPosts()()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  fetchPosts()(20)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
```

#### Implementation of function that obtains number of comments on specific post

```js
const obtainData = () => {
  fetchComments()(5)
    .then((res) => {
      if (res.status === "success") {
        return res.data.map((item) => 1).reduce((acc, val) => acc + val);
      }
    })
    .then((count) => console.log(count))
    .catch((err) => console.log(err));
};
```

### Task 3 Solution

#### Refactor of DealershipSalesUpdateComponent

##### Multiple dealership and isAuthenticated checks were replaced with one check

##### Logic for dispatching actions was extracted to a seperate function

```js
const dispatchActions = (action: any, options: Object) => {
  const dispatch = useDispatch();
  return dispatch(
    action.request({
      ...options,
    })
  );
};

const DealershipSalesUpdatesContainer = () => {
  const user = useAuthenticatedUser();
  const dealership = useDealershipInQuestion();
  const contact = useDealershipContactInQuestion();

  const [newMessage, setNewMessage] = useState("");

  if (isAuthenticated(user) && dealership) {
    const handleEditing = (
      update: DealershipSalesUpdate,
      newMessage: string
    ) => {
      dispatchActions(dealershipActions.editDealershipUpdate, {
        authenticatedUser: user,
        dealershipId: dealership.id,
        updateId: update.id,
        newMessage: newMessage,
      });
    };

    const handleDelete = (update: DealershipSalesUpdate) => {
      dispatchActions(dealershipActions.deleteDealershipUpdate, {
        authenticatedUser: user,
        dealershipId: dealership.id,
        updateId: update.id,
      });
    };

    const addMessage = () => {
      dispatchActions(dealershipActions.addDealershipUpdate, {
        authenticatedUser: user,
        fields: {
          fkDealershipId: dealership.id,
          message: newMessage,
          fkUserId: user.user.id,
        },
      });
    };

    const editAddMessage = (message: string) => {
      setNewMessage(message);
    };

    if (dealership) {
      const salesUpdates = contact
        ? dealership.salesUpdates.filter(
            (update: { contact: { id: any } }) =>
              update.contact?.id === contact.id
          )
        : dealership.salesUpdates;
      return (
        <DealershipSalesUpdates
          dealership={dealership}
          salesUpdates={salesUpdates}
          user={user}
          handleEditing={handleEditing}
          handleDelete={handleDelete}
          addMessage={addMessage}
          canAddMessage={newMessage.length > 2}
          editAddMessage={editAddMessage}
        />
      );
    }
  }

  return null;
};

export default DealershipSalesUpdatesContainer;
```

#### Refactor of updateFaqTopic within faqs.service.ts

##### Made use of pipe to reduce code in updateFaqTopic

```js
async updateFaqTopic(inputFaqTopic: InputFAQTopic) {
    if (!inputFaqTopic.id) {
        throw new NotFoundException("FAQ ID required for update");
    }
    return pipe(
        await this.faqsTopicsRepository.findOne({
            where: { id: inputFaqTopic.id },
        }),
        (original) => {
            original?.update({
                ...inputFaqTopic,
                name: inputFaqTopic.name,
                slug: this.faqSlug(inputFaqTopic.name),
                buyerSide: inputFaqTopic.buyerSide,
                title: inputFaqTopic.title,
                description: inputFaqTopic.description,
                keywords: inputFaqTopic.keywords,
            });
        }
    );
}
```
