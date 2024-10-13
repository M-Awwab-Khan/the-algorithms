type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.tail = undefined;
        this.head = undefined;
    }

    prepend(item: T): void {
        this.length++;
        const node = { value: item } as Node<T>;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length || idx < 0) {
            throw new Error("Invalid index for insertion");
        } else if (idx === 0) {
            this.prepend(item);
        } else if (idx === this.length) {
            this.append(item);
        } else {
            let curr = this.getAt(idx) as Node<T>;
            let node = { value: item } as Node<T>;
            node.prev = curr.prev;
            node.next = curr;
            curr.prev = node;
            if (node.prev) {
                node.prev.next = node;
            }
            this.length++;
        }
    }
    append(item: T): void {
        this.length++;
        let node = { value: item } as Node<T>;
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head;
        while (curr) {
            // This replaces the for-loop
            if (curr.value === item) {
                return this.removeNode(curr)?.value; // Check if curr is not undefined
            }
            curr = curr.next;
        }
        return undefined; // Item not found
    }

    removeNode(node: Node<T>): Node<T> {
        this.length--;

        if (this.length === 0) {
            this.head = this.tail = undefined;
        } else if (node.prev && node.next) {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        } else if (node.prev) {
            this.tail = node.prev;
            this.tail.next = undefined;
        } else if (node.next) {
            this.head = node.next;
            this.head.prev = undefined;
        }

        node.next = node.prev = undefined; // Clear references
        return node; // Always return the node
    }
    get(idx: number): T | undefined {
        const node = this.getAt(idx);
        if (!node) {
            return undefined;
        }
        return node.value;
    }
    removeAt(idx: number): T | undefined {
        let node = this.getAt(idx);
        if (!node) {
            return undefined;
        } else {
            return this.removeNode(node)?.value;
        }
    }

    getAt(idx: number): Node<T> | undefined {
        if (idx >= this.length || idx < 0) {
            return undefined;
        }
        let curr = this.head;
        for (let i = 0; curr && i < idx; ++i) {
            curr = curr.next;
        }
        return curr;
    }
}
