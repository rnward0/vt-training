import _ from "lodash";
import fetch from "node-fetch";
import { compose, pipe } from "ramda";

interface Entity {
  id: string;
}

interface Post extends Entity {
  __tag: "post";
  userId: number;
  title: string;
  body: string;
}

interface Comments extends Entity {
  __tag: "comment";
  postId: number;
  name: string;
  email: string;
  body: string;
}

type ApiResponse<T extends Entity> =
  | { status: "success"; data: T[] }
  | { status: "error"; error: string };

//Del. 1
const fetchMockData = (variant: "posts" | "comments") => {
  return (id?: number) => {
    if (id !== undefined) {
      return fetch(
        `https://jsonplaceholder.typicode.com/${variant}/?postId=${id}`
      );
    } else {
      return fetch(`https://jsonplaceholder.typicode.com/${variant}`);
    }
  };
};

//Del. 2
const fetchComments = () => {
  return fetchMockData("comments");
};

const fetchPosts = () => {
  return fetchMockData("posts");
};

fetchComments()()
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

//Del. 3
