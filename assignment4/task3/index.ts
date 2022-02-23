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

const isLeaf = <A>(tree: Tree<A>): tree is Leaf<A> => tree.tag === "leaf";
const isBranch = <A>(tree: Tree<A>): tree is Branch<A> => tree.tag === "branch";

//Deliverable 1

let leaves: number = 0;
let branches: number = 0;

const size = <A>(tree: Tree<A>) => {
  if (isLeaf(tree)) {
    leaves++;
  } else {
    branches++;
    tree.left && size(tree.left);
    tree.right && size(tree.right);
  }
};

//Deliverable 2

let maxVal: number = 0;

const max = (tree: Tree<number>) => {
  if (isLeaf(tree)) {
    maxVal = tree.value > maxVal ? tree.value : maxVal;
  } else {
    tree.left && size(tree.left);
    tree.right && size(tree.right);
  }
};

const depth = () => {};

//Deliverable 4

const map = <A>(tree: Tree<A>, func: (tree: Tree<A>) => unknown) => {
  if (isLeaf(tree)) {
    func(tree);
  } else {
    tree.left && func(tree) && map(tree.left, func);
    tree.right && func(tree) && map(tree.right, func);
  }
};

const filter = <A>(tree: Tree<A>, func: (tree: Tree<A>) => unknown) => {};

const zip = () => {};
