type Node<T> = {
    value: T;
    next?: Node<T> | null;
};

export default class Queue<T> {
    public length: number;
    public head: Node<T> | null
    public tail: Node<T> | null

    constructor() {
        this.head = this.tail = null;
        this.length = 0;
    }

    enqueue(item: T): void {
        const node = { value: item, next: null } as Node<T>;

        if (!this.tail) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        this.length++;
    }

    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        const headValue = this.head.value;
        this.head = this.head.next;
        this.length--;

        if (this.length === 0) {
            this.tail = null;
        }

        return headValue;
    }

    peek(): T | undefined {

        return this.head?.value
    }
}
