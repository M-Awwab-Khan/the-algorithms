import Queue from "./Queue";
export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    let queue = new Queue<BinaryNode<number>>();
    queue.enqueue(head);

    while (!queue.isEmpty()) {
        let curr = queue.deque();

        if (!curr) continue;
        if (curr.value === needle) {
            return true;
        }

        if (curr.left) {
            queue.enqueue(curr.left);
        }

        if (curr.right) {
            queue.enqueue(curr.right);
        }
    }

    return false;
}

