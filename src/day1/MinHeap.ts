export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    buildHeap(array: number[]): void {
        this.length = array.length;
        this.data = array;

        const startIdx = Math.floor(this.length / 2) - 1;
        for (let i = startIdx; i >= 0; --i) {
            this.heapifyDown(i);
        }
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }
    delete(): number {
        if (this.length === 0) {
            throw new Error("Heap is empty");
        }
        const out = this.data[0];
        this.length--;
        if (this.length === 0) {
            this.data = [];
            return out;
        }

        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }

    peak(): number | undefined {
        if (length === 0) return undefined;
        return this.data[0];
    }

    size(): number {
        return this.length;
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }

        const parentIdx = this.parent(idx);
        const parentValue = this.data[parentIdx];
        const value = this.data[idx];

        if (value < parentValue) {
            this.data[parentIdx] = value;
            this.data[idx] = parentValue;
            this.heapifyUp(parentIdx);
        }
    }
    private heapifyDown(idx: number): void {
        if (idx >= this.length) return;
        const value = this.data[idx];
        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx);

        let smallestIdx = idx;

        if (lIdx < this.length && this.data[lIdx] < this.data[smallestIdx]) {
            smallestIdx = lIdx;
        }
        if (rIdx < this.length && this.data[rIdx] < this.data[smallestIdx]) {
            smallestIdx = rIdx;
        }

        if (smallestIdx != idx) {
            this.data[idx] = this.data[smallestIdx];
            this.data[smallestIdx] = value;
            this.heapifyDown(smallestIdx);
        }
    }
    private leftChild(idx: number): number {
        return 2 * idx + 1;
    }

    private rightChild(idx: number): number {
        return 2 * idx + 2;
    }
    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }
}

