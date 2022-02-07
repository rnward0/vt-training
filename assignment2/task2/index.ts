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
  email: email;
  body: string;
}

type ApiResponse<T extends Entity> =
  | { status: "success"; data: T[] }
  | { status: "error"; error: string };

type email = {
  address: string;
};

const mockComments = [
  {
    __tag: "comment",
    postId: 0,
    name: "mock1",
    email: "mock1@mock.mock",
    body: "mock data 1",
  },
];

const mockPosts: Post[] = [
  {
    id: "0",
    __tag: "post",
    userId: 0,
    title: "my post",
    body: "post body",
  },
  {
    id: "1",
    __tag: "post",
    userId: 1,
    title: "my post 2",
    body: "post body 2",
  },
];

//Del. 1
const fetchMockData = (variant: string) => {};

//Del. 2
const fetchComments = () => {};

const fetchPosts = () => {};

//Del. 3
