export default class RingBuffer<T> {
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

    // Add an item to the buffer
    enqueue(item: T): void {
        if (this.isFull()) {
            throw new Error("Buffer Overflow");
        }
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.capacity;
        this.length++;
    }

    // Remove an item from the buffer
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        let element = this.buffer[this.head];
        this.buffer[this.head] = undefined;
        this.head = (this.head + 1) % this.capacity;
        this.length--;
        return element;
    }

    // Peek at the next item to be dequeued without removing it
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.buffer[this.head];
    }

    // Check if the buffer is full
    isFull(): boolean {
        return this.length == this.capacity;
    }

    // Check if the buffer is empty
    isEmpty(): boolean {
        return this.length == 0;
    }
}
