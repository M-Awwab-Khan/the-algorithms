import Deque from "@code/Deque";
describe("Circular Deque Implementation", () => {
    it("should enqueue items to the back and dequeue from the front", () => {
        const deque = new Deque<number>(3);
        deque.enqueueBack(1);
        deque.enqueueBack(2);
        deque.enqueueBack(3);
        expect(deque.isFull()).toEqual(true);

        expect(deque.dequeueFront()).toEqual(1);
        expect(deque.dequeueFront()).toEqual(2);
        expect(deque.dequeueFront()).toEqual(3);
        expect(deque.isEmpty()).toEqual(true);
    });

    it("should enqueue items to the front and dequeue from the back", () => {
        const deque = new Deque<number>(3);
        deque.enqueueFront(1);
        deque.enqueueFront(2);
        deque.enqueueFront(3);
        expect(deque.isFull()).toEqual(true);

        expect(deque.dequeueBack()).toEqual(1);
        expect(deque.dequeueBack()).toEqual(2);
        expect(deque.dequeueBack()).toEqual(3);
        expect(deque.isEmpty()).toEqual(true);
    });

    it("should handle circular wrap-around for enqueue and dequeue", () => {
        const deque = new Deque<number>(3);
        deque.enqueueBack(1);
        deque.enqueueBack(2);
        deque.dequeueFront();
        deque.enqueueBack(3);
        deque.enqueueBack(4); // should wrap around to the beginning

        expect(deque.peekFront()).toEqual(2);
        expect(deque.peekBack()).toEqual(4);
        expect(deque.isFull()).toEqual(true);
    });

    it("should throw an error on buffer overflow", () => {
        const deque = new Deque<number>(2);
        deque.enqueueBack(1);
        deque.enqueueBack(2);
        expect(() => deque.enqueueBack(3)).toThrowError("Buffer Overflow");
    });

    it("should handle dequeue from an empty deque", () => {
        const deque = new Deque<number>(2);
        expect(deque.dequeueFront()).toEqual(undefined);
        expect(deque.dequeueBack()).toEqual(undefined);
    });

    it("should correctly peek front and back items", () => {
        const deque = new Deque<number>(3);
        deque.enqueueBack(10);
        deque.enqueueBack(20);
        deque.enqueueFront(5);

        expect(deque.peekFront()).toEqual(5); // front element
        expect(deque.peekBack()).toEqual(20); // back element
    });

    it("should correctly track the size of the deque", () => {
        const deque = new Deque<number>(3);
        expect(deque.length).toEqual(0);

        deque.enqueueBack(10);
        deque.enqueueBack(20);
        expect(deque.length).toEqual(2);

        deque.dequeueFront();
        expect(deque.length).toEqual(1);

        deque.enqueueBack(30);
        deque.enqueueFront(5);
        expect(deque.length).toEqual(3);
    });
});
