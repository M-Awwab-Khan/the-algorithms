class Node<T> {
    value: T
    next: Node<T> | null
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
        let n = new Node<T>;
        n.value = item;
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
            let n = new Node<T>;
            n.value = item;
            n.next = current.next;
            current.next = n;
            this.length++;
        }
    }

    append(item: T): void {
        if (this.tail) {
            let n = new Node<T>;
            n.value = item;
            this.tail.next = n;
            this.tail = n;
            this.length++;
        } else {
            this.prepend(item);
        }
    }

    remove(item: T): T | undefined {
        if (this.head?.value === item) {
            this.head = this.head.next;
            this.length--;
            return item;
        } else {
            let prev = null;
            let current = this.head;
            for (let i = 0; i < this.length; ++i) {
                if (current.value == item) {
                    break;
                }
                prev = current;
                current = current?.next;
            }
            prev.next = current?.next;
            current.next = null;
            this.length--;
            return current?.value;
        }

    }
    get(idx: number): T | undefined {
        let current = this.head;
        for (let i = 0; i < idx; ++i) {
            current = current?.next;
        }
        return current?.value;
    }
    removeAt(idx: number): T | undefined {
        if (idx === 0) {
            let temp = this.head?.value;
            this.head = this.head?.next;
            this.length--;
            return temp;
        } else {
            let prev: Node<T> | null = this.head;
            for (let i = 0; i < idx - 1; ++i) {
                prev = prev.next;
            }
            let temp = prev?.next?.value;
            prev.next = prev?.next?.next;
            this.length--;
            return temp;
        }
    }
}
