export default class PriorityQueue<T> {
    private heap: T[] = [];
    private compare: (a: T, b: T) => number;

    constructor(compare: (a: T, b: T) => number) {
        this.compare = compare;
    }

    public size(): number {
        return this.heap.length;
    }

    public isEmpty(): boolean {
        return this.heap.length === 0;
    }

    public peek(): T | null {
        return this.heap.length === 0 ? null : this.heap[0];
    }

    public insert(value: T): void {
        this.heap.push(value);
        this.siftUp();
    }

    public extract(): T | null {
        if (this.heap.length === 0) {
            return null;
        }
        const result = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0 && last !== undefined) {
            this.heap[0] = last;
            this.siftDown();
        }
        return result;
    }

    private siftUp(): void {
        let node = this.heap.length - 1;
        while (node > 0) {
            const parent = this.parent(node);
            if (this.compare(this.heap[node], this.heap[parent]) >= 0) {
                break;
            }
            [this.heap[node], this.heap[parent]] = [
                this.heap[parent],
                this.heap[node],
            ];
            node = parent;
        }
    }

    private siftDown(): void {
        let node = 0;
        while (this.left(node) < this.heap.length) {
            let left = this.left(node);
            let right = this.right(node);
            let min = left;
            if (
                right < this.heap.length &&
                this.compare(this.heap[right], this.heap[left]) < 0
            ) {
                min = right;
            }
            if (this.compare(this.heap[node], this.heap[min]) <= 0) {
                break;
            }
            [this.heap[node], this.heap[min]] = [
                this.heap[min],
                this.heap[node],
            ];
            node = min;
        }
    }
    private parent(i: number): number {
        return Math.floor((i - 1) / 2);
    }
    private left(i: number): number {
        return 2 * i + 1;
    }
    private right(i: number): number {
        return 2 * i + 2;
    }
}
