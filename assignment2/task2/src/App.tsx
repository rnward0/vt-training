import React, { useEffect, useState } from "react";

// interface Entity {
//   id: string;
// }

// interface Post extends Entity {
//   __tag: "post";
//   userId: number;
//   title: string;
//   body: string;
// }

// interface Comments extends Entity {
//   __tag: "comment";
//   postId: number;
//   name: string;
//   email: string;
//   body: string;
// }

// type ApiResponse<T extends Entity> =
//   | { status: "success"; data: T[] }
//   | { status: "error"; error: string };

const App: React.FC = () => {
  const [data, setData] = useState({});
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

  useEffect(() => {
    alert("effect");
    fetchComments()()
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  });

  return <div>{data}</div>;
};

export default App;
