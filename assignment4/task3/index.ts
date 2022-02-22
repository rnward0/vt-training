type Tree<A> = Leaf<A> | Branch<A>;

class Leaf<A> {
  tag: "leaf" = "leaf";
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }
}

class Branch<A> {
  tag: "branch" = "branch";
  readonly left: Tree<A>;
  readonly right: Tree<A>;

  constructor(left: Tree<A>, right: Tree<A>) {
    this.left = left;
    this.right = right;
  }
}

const size = <A>(tree: Tree<A>) => {
  let leaves: number = 0;
  let branches: number = 0;
};

const max = () => {};

const depth = () => {};

const map = () => {};

const filter = () => {};

const zip = () => {};
