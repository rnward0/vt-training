import React, { useEffect, useState } from "react";
import { right, left, Either } from "fp-ts/lib/Either";

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

const App: React.FC = () => {
  const [data, setData] = useState<ApiResponse<Comment | Post>>({
    status: "error",
    error: "data not fetched yet!",
  });

  //Del. 1
  const fetchMockData = (variant: "posts" | "comments") => {
    return (id?: number) => {
      if (id !== undefined) {
        if (variant === "posts") {
          return fetch(`https://jsonplaceholder.typicode.com/${variant}/${id}`)
            .then((res) => res.json())
            .then((res) => {
              return match(right(res));
            });
        } else {
          return fetch(
            `https://jsonplaceholder.typicode.com/${variant}/?postId=${id}`
          )
            .then((res) => res.json())
            .then((res) => {
              return match(right(res));
            });
        }
      } else {
        console.log("id not defined");
        return fetch(`https://jsonplaceholder.typicode.com/${variant}`)
          .then((res) => res.json())
          .then((res) => {
            return match(right(res));
          });
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

  const obtainData = () => {};

  useEffect(() => {
    fetchComments()()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        const errData = match(left(err));
        setData(errData);
      });
  }, []);

  return (
    <div>
      {data.status === "success" ? (
        data.data.map((item: any, index: number) => {
          return (
            <ul key={index}>
              <div>{item.name}</div>
            </ul>
          );
        })
      ) : (
        <div>{data.error}</div>
      )}
    </div>
  );
};

export default App;
