class Node<T> {
    value: T;
    next: Node<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}


export default class SinglyLinkedList<T> {
    public length: number;
    head: Node<T> | null
    tail: Node<T> | null


    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    prepend(item: T): void {
        let n = new Node<T>(item);
        n.next = this.head;
        this.head = n;
        this.length++;
        if (this.length === 1) {
            this.tail = n;
        }
    }

    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            this.prepend(item);
        } else if (idx === this.length) {
            this.append(item);
        } else if (idx < 0 || idx > this.length) {
            throw new Error("Index out of bounds");
        } else {
            let current: Node<T> | null = this.head;
            for (let i = 0; i < idx - 1; ++i) {
                current = current.next;
            }
            let n = new Node<T>(item);
            n.next = current.next;
            current.next = n;
            this.length++;
        }
    }

    append(item: T): void {
        const n = new Node(item);

        if (!this.tail) {
            this.head = n;
            this.tail = n;
        } else {
            this.tail.next = n;
            this.tail = n;
        }

        this.length++;
    }


    remove(item: T): T | undefined {
        if (!this.head) return undefined;

        if (this.head.value === item) {
            const removedValue = this.head.value;
            this.head = this.head.next;
            this.length--;

            if (this.length === 0) {
                this.tail = null;
            }
            return removedValue;
        }

        let prev = this.head;
        let current = this.head.next;

        while (current) {
            if (current.value === item) {
                prev.next = current.next;
                if (current === this.tail) {
                    this.tail = prev;
                }
                this.length--;
                return current.value;
            }
            prev = current;
            current = current.next;
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        let current = this.head;
        for (let i = 0; i < idx; ++i) {
            current = current?.next;
        }
        return current?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            throw new Error("Index out of bounds");
        }

        if (idx === 0) {
            const value = this.head?.value;
            this.head = this.head?.next;
            this.length--;

            if (this.length === 0) {
                this.tail = null;
            }
            return value;
        }

        let prev = this.head;
        for (let i = 0; i < idx - 1; ++i) {
            prev = prev?.next as Node<T>;
        }

        const removedValue = prev.next?.value;
        prev.next = prev.next?.next;

        if (prev.next === null) {
            this.tail = prev;
        }

        this.length--;
        return removedValue;
    }

}
