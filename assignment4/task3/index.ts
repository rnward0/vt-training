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

const myTree: Tree<number> = {
  tag: "branch",
  left: {
    tag: "leaf",
    value: 1,
  },
  right: {
    tag: "branch",
    left: {
      tag: "leaf",
      value: 9,
    },
    right: {
      tag: "leaf",
      value: 8,
    },
  },
};

const printUtility = <A>(tree: Tree<A>): void => {
  if (isLeaf(tree)) {
    return console.log(tree.value);
  } else {
    printUtility(tree.left);
    printUtility(tree.right);
  }
};

//Deliverable 1

const size = <A>(tree: Tree<A>): number => {
  if (isLeaf(tree)) {
    return 1;
  }
  return 1 + size(tree.left) + size(tree.right);
};

console.log("Size: " + size(myTree));

//Deliverable 2

const max = (tree: Tree<number>, currentMax: number = 0) => {
  if (isLeaf(tree)) {
    currentMax = tree.value > currentMax ? tree.value : currentMax;
  } else {
    currentMax = max(tree.left, currentMax);
    currentMax = max(tree.right, currentMax);
  }
  return currentMax;
};

console.log("Max: " + max(myTree));

//Deliverable 3

const depth = <A>(
  tree: Tree<A>,
  maxCount: number = 0,
  currentCount: number = 0
) => {
  if (isLeaf(tree)) {
    currentCount++;
    if (currentCount > maxCount) {
      maxCount = currentCount;
    }
  } else {
    currentCount++;
    maxCount = depth(tree.left, maxCount, currentCount);
    maxCount = depth(tree.right, maxCount, currentCount);
  }
  return maxCount;
};

console.log("Depth: " + depth(myTree));

//Deliverable 4

const map = <A>(tree: Tree<A>, func: (val: A) => A): Tree<A> => {
  if (isLeaf(tree)) {
    return new Leaf(func(tree.value));
  } else {
    return new Branch(map(tree.left, func), map(tree.right, func));
  }
};

console.log(
  map(myTree, (val: number) => {
    return val * 2;
  })
);

//Deliverable 5

const filter = <A>(tree: Tree<A>, func: (val: A) => boolean): any => {
  if (isLeaf(tree) && func(tree.value)) {
    return;
  } else if (isLeaf(tree) && !func(tree.value)) {
    return new Leaf(tree.value);
  } else if (isBranch(tree) && tree.left && tree.right) {
    return new Branch(filter(tree.left, func), filter(tree.right, func));
  }
};

console.log(
  filter(myTree, (val: number) => {
    return val === 8;
  })
);

//Deliverable 6

//leaf + leaf = leaf, branch + branch = branch, leaf + branch = branch
const zip = (treeA: Tree<number>, treeB: Tree<number>): Tree<number> => {
  if (isLeaf(treeA) && isLeaf(treeB)) {
    return new Leaf(treeA.value + treeB.value);
  } else if (isBranch(treeA) && isBranch(treeB)) {
    const branchLeft = zip(treeA.left, treeB.left);
    const branchRight = zip(treeA.right, treeB.right);
    return new Branch(branchLeft, branchRight);
  } else if (isBranch(treeA) && isLeaf(treeB)) {
    return new Branch(treeA.left, treeA.right);
  } else {
    //isLeaf(treeA) && isBranch(treeB)
  }
  return treeA;
};
