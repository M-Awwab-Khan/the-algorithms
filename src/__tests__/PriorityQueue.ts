import PriorityQueue from "@code/PriorityQueue"; // Assuming your priority queue is implemented in this file

describe("PriorityQueue Tests", () => {
    test("Min-Heap: Inserts elements and maintains min-heap property", () => {
        const minHeap = new PriorityQueue<number>((a, b) => a - b);

        minHeap.insert(10);
        minHeap.insert(5);
        minHeap.insert(20);
        minHeap.insert(3);

        expect(minHeap.extract()).toEqual(3);
        expect(minHeap.extract()).toEqual(5);
        expect(minHeap.extract()).toEqual(10);
        expect(minHeap.extract()).toEqual(20);
    });

    test("Max-Heap: Inserts elements and maintains max-heap property", () => {
        const maxHeap = new PriorityQueue<number>((a, b) => b - a);

        maxHeap.insert(10);
        maxHeap.insert(5);
        maxHeap.insert(20);
        maxHeap.insert(3);

        expect(maxHeap.extract()).toEqual(20);
        expect(maxHeap.extract()).toEqual(10);
        expect(maxHeap.extract()).toEqual(5);
        expect(maxHeap.extract()).toEqual(3);
    });

    test("Min-Heap: insert and extract with mixed values", () => {
        const minHeap = new PriorityQueue<number>((a, b) => a - b);

        minHeap.insert(15);
        minHeap.insert(7);
        minHeap.insert(9);
        minHeap.insert(3);

        expect(minHeap.extract()).toEqual(3);
        expect(minHeap.peek()).toEqual(7); // Peek should return 7
        expect(minHeap.extract()).toEqual(7);
        expect(minHeap.extract()).toEqual(9);
        expect(minHeap.extract()).toEqual(15);
    });

    test("Max-Heap: insert and extract with mixed values", () => {
        const maxHeap = new PriorityQueue<number>((a, b) => b - a);

        maxHeap.insert(1);
        maxHeap.insert(50);
        maxHeap.insert(30);
        maxHeap.insert(2);

        expect(maxHeap.extract()).toEqual(50);
        expect(maxHeap.peek()).toEqual(30); // Peek should return 30
        expect(maxHeap.extract()).toEqual(30);
        expect(maxHeap.extract()).toEqual(2);
        expect(maxHeap.extract()).toEqual(1);
    });

    test("Min-Heap: Handling empty queue", () => {
        const minHeap = new PriorityQueue<number>((a, b) => a - b);

        expect(minHeap.isEmpty()).toEqual(true);
        expect(minHeap.extract()).toEqual(null);
    });

    test("Max-Heap: Handling empty queue", () => {
        const maxHeap = new PriorityQueue<number>((a, b) => b - a);

        expect(maxHeap.isEmpty()).toEqual(true);
        expect(maxHeap.extract()).toEqual(null);
    });

    test("Min-Heap: Handling duplicates", () => {
        const minHeap = new PriorityQueue<number>((a, b) => a - b);

        minHeap.insert(5);
        minHeap.insert(5);
        minHeap.insert(10);
        minHeap.insert(3);

        expect(minHeap.extract()).toEqual(3);
        expect(minHeap.extract()).toEqual(5);
        expect(minHeap.extract()).toEqual(5);
        expect(minHeap.extract()).toEqual(10);
    });

    test("Max-Heap: Handling duplicates", () => {
        const maxHeap = new PriorityQueue<number>((a, b) => b - a);

        maxHeap.insert(10);
        maxHeap.insert(10);
        maxHeap.insert(5);
        maxHeap.insert(20);

        expect(maxHeap.extract()).toEqual(20);
        expect(maxHeap.extract()).toEqual(10);
        expect(maxHeap.extract()).toEqual(10);
        expect(maxHeap.extract()).toEqual(5);
    });

    test("Min-Heap: Peek and size", () => {
        const minHeap = new PriorityQueue<number>((a, b) => a - b);

        minHeap.insert(8);
        minHeap.insert(4);
        minHeap.insert(6);

        expect(minHeap.peek()).toEqual(4); // Peek at the smallest element
        expect(minHeap.size()).toEqual(3); // Should have 3 elements
    });

    test("Max-Heap: Peek and size", () => {
        const maxHeap = new PriorityQueue<number>((a, b) => b - a);

        maxHeap.insert(8);
        maxHeap.insert(12);
        maxHeap.insert(6);

        expect(maxHeap.peek()).toEqual(12); // Peek at the largest element
        expect(maxHeap.size()).toEqual(3); // Should have 3 elements
    });
});
