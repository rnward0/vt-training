import React, { useEffect, useState } from "react";

interface Entity {
  id: string;
}

type ApiResponse<T extends Entity> =
  | { status: "success"; data: T[] }
  | { status: "error"; error: string };

const App: React.FC = () => {
  const [data, setData] = useState([]);

  //Del. 1
  const fetchMockData = (variant: "posts" | "comments") => {
    return (id?: number) => {
      if (id !== undefined) {
        return fetch(
          `https://jsonplaceholder.typicode.com/${variant}/?postId=${id}`
        )
          .then((res) => res.json())
          .then((res) => {
            return { status: "success", data: res };
          });
      } else {
        return fetch(`https://jsonplaceholder.typicode.com/${variant}`)
          .then((res) => res.json())
          .then((res) => {
            return { status: "success", data: res };
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

  const match = () => {};

  useEffect(() => {
    fetchComments()()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  });

  return (
    <div>
      {data.map((item: any, index: number) => {
        return <div key={index}>{item.name}</div>;
      })}
    </div>
  );
};

export default App;
