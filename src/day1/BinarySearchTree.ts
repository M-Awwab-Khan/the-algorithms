type TreeNode<T> = {
    value: T;
    left?: TreeNode<T>;
    right?: TreeNode<T>;
};

export default class BinarySearchTree<T> {
    private root?: TreeNode<T>;
    private size: number;

    constructor() {
        this.root = undefined;
        this.size = 0;
    }

    findParent(node: TreeNode<T>, value: T): TreeNode<T> | undefined {
        if (value <= node.value) {
            if (!node.left) return node;
            return this.findParent(node.left, value);
        } else {
            if (!node.right) return node;
            return this.findParent(node.right, value);
        }
    }

    insert(value: T): void {
        let node = {
            value: value,
            left: undefined,
            right: undefined,
        } as TreeNode<T>;
        if (!this.root) {
            this.root = node;
            this.size++;
            return;
        }

        let parent = this.findParent(this.root, value);
        if (!parent) throw new Error("Unable to find insertion position.");
        if (value <= parent.value) {
            parent.left = node;
        } else {
            parent.right = node;
        }
        this.size++;
    }

    private exist(node: TreeNode<T> | undefined, value: T): boolean {
        if (!node) return false;
        if (node.value === value) return true;
        if (value <= node.value) {
            return this.exist(node.left, value);
        }
        return this.exist(node.right, value);
    }

    contains(value: T): boolean {
        return this.exist(this.root, value);
    }

    findNode(node: TreeNode<T> | undefined, value: T): TreeNode<T> | undefined {
        if (!node) return undefined;
        if (node.value === value) return node;
        if (value <= node.value) return this.findNode(node.left, value);
        return this.findNode(node.right, value);
    }

    remove(value: T): void {
        const originalSize = this.size;
        this.root = this.removeNode(this.root, value);
        if (this.size === originalSize) {
            throw new Error("Specified value was not found");
        }
    }

    removeNode(
        node: TreeNode<T> | undefined,
        value: T,
    ): TreeNode<T> | undefined {
        if (!node) return undefined;

        if (value > node.value) {
            node.right = this.removeNode(node.right, value);
        } else if (value < node.value) {
            node.left = this.removeNode(node.left, value);
        } else {
            this.size--;
            if (!node.left && !node.right) {
                return undefined;
            }
            if (!node.left) {
                return node.right;
            }
            if (!node.right) {
                return node.left;
            }

            let successor = this.findSuccessor(node);
            if (successor) {
                node.value = successor.value;
                node.right = this.removeNode(node.right, successor.value);
            }
        }
        return node;
    }

    private findSuccessor(node: TreeNode<T>): TreeNode<T> | undefined {
        let successor = node.right as TreeNode<T>;
        while (successor.left) {
            successor = successor.left;
        }

        return successor;
    }

    findMin(): T | undefined {
        if (!this.root) return undefined;
        let curr = this.root;
        while (curr.left) {
            curr = curr.left;
        }
        return curr.value;
    }

    findMax(): T | undefined {
        if (!this.root) return undefined;
        let curr = this.root;
        while (curr.right) {
            curr = curr.right;
        }
        return curr.value;
    }

    private traverseInOrder(node: TreeNode<T> | undefined, path: T[]): void {
        if (!node) return;

        this.traverseInOrder(node.left, path);
        path.push(node.value);
        this.traverseInOrder(node.right, path);
    }

    inOrderTraversal(): T[] {
        let path: T[] = [];
        this.traverseInOrder(this.root, path);
        return path;
    }

    private traversePreOrder(node: TreeNode<T> | undefined, path: T[]): void {
        if (!node) return;

        path.push(node.value);
        this.traversePreOrder(node.left, path);
        this.traversePreOrder(node.right, path);
    }

    preOrderTraversal(): T[] {
        let path: T[] = [];
        this.traversePreOrder(this.root, path);
        return path;
    }

    private traversePostOrder(node: TreeNode<T> | undefined, path: T[]): void {
        if (!node) return;

        this.traversePostOrder(node.left, path);
        this.traversePostOrder(node.right, path);
        path.push(node.value);
    }

    postOrderTraversal(): T[] {
        let path: T[] = [];
        this.traversePostOrder(this.root, path);
        return path;
    }

    getSize(): number {
        return this.size;
    }

    private calculateHeight(node: TreeNode<T> | undefined): number {
        if (!node) return 0;
        return (
            1 +
            Math.max(
                this.calculateHeight(node.left),
                this.calculateHeight(node.right),
            )
        );
    }

    getHeight(): number {
        return this.calculateHeight(this.root);
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    clear(): void {
        this.root = undefined;
        this.size = 0;
    }
}
