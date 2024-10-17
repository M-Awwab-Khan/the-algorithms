type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    head?: Node<T>;
    tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        let n = { value: item } as Node<T>;
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
            let current = this.head as Node<T>;
            for (let i = 0; i < idx - 1; ++i) {
                current = current.next as Node<T>;
            }
            let n = { value: item } as Node<T>;
            n.next = current?.next;
            current.next = n;
            this.length++;
        }
    }

    append(item: T): void {
        const n = { value: item } as Node<T>;

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
                this.tail = undefined;
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
                this.tail = undefined;
            }
            return value;
        }

        let prev = this.head as Node<T>;
        for (let i = 0; i < idx - 1; ++i) {
            prev = prev.next as Node<T>;
        }

        const removedValue = prev.next?.value;
        prev.next = prev.next?.next;

        if (prev.next === undefined) {
            this.tail = prev;
        }

        this.length--;
        return removedValue;
    }
    reverse(): void {
        let prev = undefined;
        let current = this.head;
        let next = undefined;

        while (current) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        this.tail = this.head;
        this.head = prev;
    }
}
