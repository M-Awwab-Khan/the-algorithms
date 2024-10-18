import BinarySearchTree from "@code/BinarySearchTree";

describe("BinarySearchTree", () => {
    let bst: BinarySearchTree<number>;

    beforeEach(() => {
        bst = new BinarySearchTree();
    });

    it("should insert and find values correctly", () => {
        bst.insert(5);
        bst.insert(3);
        bst.insert(7);
        bst.insert(2);
        bst.insert(4);
        bst.insert(6);
        bst.insert(8);

        expect(bst.contains(5)).toBe(true);
        expect(bst.contains(3)).toBe(true);
        expect(bst.contains(7)).toBe(true);
        expect(bst.contains(2)).toBe(true);
        expect(bst.contains(4)).toBe(true);
        expect(bst.contains(6)).toBe(true);
        expect(bst.contains(8)).toBe(true);
        expect(bst.contains(10)).toBe(false);
    });

    it("should remove values correctly", () => {
        bst.insert(5);
        bst.insert(3);
        bst.insert(7);
        bst.insert(2);
        bst.insert(4);
        bst.insert(6);
        bst.insert(8);

        bst.remove(5);
        expect(bst.contains(5)).toBe(false);
        expect(bst.contains(3)).toBe(true);
        expect(bst.contains(7)).toBe(true);
        expect(bst.contains(2)).toBe(true);
        expect(bst.contains(4)).toBe(true);
        expect(bst.contains(6)).toBe(true);
        expect(bst.contains(8)).toBe(true);

        bst.remove(3);
        expect(bst.contains(3)).toBe(false);
        expect(bst.contains(2)).toBe(true);
        expect(bst.contains(4)).toBe(true);
    });

    it("should handle edge cases", () => {
        bst.insert(5);

        expect(bst.findMin()).toBe(5);
        expect(bst.findMax()).toBe(5);

        bst.remove(5);
        expect(bst.findMin()).toBe(undefined);
        expect(bst.findMax()).toBe(undefined);

        expect(bst.isEmpty()).toBe(true);
    });
});
