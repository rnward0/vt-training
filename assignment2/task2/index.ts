import { right, left, Either } from "fp-ts/lib/Either";
import fetch from "node-fetch";

interface Entity {
  id: string;
}

interface Post extends Entity {
  __tag: "post";
  userId: number;
  title: string;
  body: string;
}

interface Comment extends Entity {
  __tag: "comment";
  postId: number;
  name: string;
  email: string;
  body: string;
}

type ApiResponse<T extends Entity> =
  | { status: "success"; data: T[] }
  | { status: "error"; error: string };

let url = ``;

//Del. 1
function fetchMockData(
  variant: "posts"
): (id?: number) => Promise<ApiResponse<Post>>;
function fetchMockData(
  variant: "comments"
): (id?: number) => Promise<ApiResponse<Comment>>;
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

//Del. 2
const fetchComments = () => {
  return fetchMockData("comments");
};

const fetchPosts = () => {
  return fetchMockData("posts");
};

//Del. 3
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

//Del. 4
const run = () => {
  //get all comments
  fetchComments()()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  //get comments on specific post
  fetchComments()(20)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  //get all posts
  fetchPosts()()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  //get specific post
  fetchPosts()(20)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

//Del. 5
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

obtainData();
