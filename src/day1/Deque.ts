export default class Deque<T> {
    private buffer: (T | undefined)[];
    private capacity: number;
    private head: number;
    private tail: number;
    public length: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.buffer = new Array(capacity); // Pre-allocate buffer with given capacity
        this.head = 0; // Points to the next item to be dequeued
        this.tail = 0; // Points to the next available spot for enqueue
        this.length = 0; // Number of items in the buffer
    }

    enqueueBack(item: T): void {
        if (this.isFull()) {
            throw new Error("Buffer Overflow");
        }
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.capacity;
        this.length++;
    }

    dequeueFront(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        let element = this.buffer[this.head];
        this.buffer[this.head] = undefined;
        this.head = (this.head + 1) % this.capacity;
        this.length--;
        return element;
    }

    enqueueFront(item: T): void {
        if (this.isFull()) {
            throw new Error("Buffer Overflow");
        }
        this.head = (this.head - 1 + this.capacity) % this.capacity;
        this.buffer[this.head] = item;
        this.length++;
    }

    dequeueBack(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        this.tail = (this.tail - 1 + this.capacity) % this.capacity;
        let element = this.buffer[this.tail];
        this.buffer[this.tail] = undefined;
        this.length--;
        return element;
    }

    peekFront(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.buffer[this.head];
    }

    peekBack(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.buffer[(this.tail - 1 + this.capacity) % this.capacity];
    }

    isFull(): boolean {
        return this.length == this.capacity;
    }

    isEmpty(): boolean {
        return this.length == 0;
    }
}
