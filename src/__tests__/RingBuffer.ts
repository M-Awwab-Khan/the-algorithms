import RingBuffer from "@code/RingBuffer";

test("RingBuffer", function () {
    const buffer = new RingBuffer<number>(3); // example capacity

    buffer.enqueue(5);
    expect(buffer.dequeue()).toEqual(5);
    expect(buffer.dequeue()).toEqual(undefined);

    buffer.enqueue(42);
    buffer.enqueue(9);
    expect(buffer.dequeue()).toEqual(42);
    expect(buffer.dequeue()).toEqual(9);
    expect(buffer.dequeue()).toEqual(undefined);

    buffer.enqueue(42);
    buffer.enqueue(9);
    buffer.enqueue(12);
    expect(buffer.peek()).toEqual(42);  // Peek at the first element without removing it
});
