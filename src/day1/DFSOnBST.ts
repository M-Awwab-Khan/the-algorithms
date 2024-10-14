function walk(node: BinaryNode<number>, needle: number): boolean {
  if (!node) {
    return false;
  }
  if (node.value === needle) {
    return true;
  }
  if (needle > node.value) {
    return walk(node.right, needle);
  }
  if (needle <= node.value) {
    return walk(node.left, needle); 
  }
}


export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  return walk(head, needle);
}
