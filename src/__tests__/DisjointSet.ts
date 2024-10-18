// Import the DisjointSet class
import DisjointSet from "@code/DisjointSet";

test("Test basic union-find operations", () => {
    const ds = new DisjointSet(5); // Create a disjoint set with 5 elements (0 to 4)

    // Initially, each element is in its own set
    expect(ds.find(0)).toEqual(0);
    expect(ds.find(1)).toEqual(1);
    expect(ds.find(2)).toEqual(2);
    expect(ds.find(3)).toEqual(3);
    expect(ds.find(4)).toEqual(4);

    // Union elements 0 and 1
    ds.union(0, 1);
    expect(ds.find(0)).toEqual(ds.find(1)); // 0 and 1 should be in the same set

    // Union elements 1 and 2
    ds.union(1, 2);
    expect(ds.find(0)).toEqual(ds.find(2)); // 0, 1, and 2 should all be in the same set

    // Union elements 3 and 4
    ds.union(3, 4);
    expect(ds.find(3)).toEqual(ds.find(4)); // 3 and 4 should be in the same set

    // Check if 0 and 4 are in the same set (they shouldn't be)
    expect(ds.connected(0, 4)).toEqual(false);

    // Union elements 0 and 3 (connect 0's set and 3's set)
    ds.union(0, 3);
    expect(ds.find(0)).toEqual(ds.find(3)); // Now, all elements (0,1,2,3,4) should be in the same set

    // Check if 0 and 4 are in the same set (they should be now)
    expect(ds.connected(0, 4)).toEqual(true);
});

test("Test already connected elements", () => {
    const ds = new DisjointSet(3);
    ds.union(0, 1);

    // Try to union 0 and 1 again
    ds.union(0, 1);

    // Check that union didn't break anything
    expect(ds.connected(0, 1)).toEqual(true);
    expect(ds.connected(1, 2)).toEqual(false);
});

test("Test path compression effectiveness", () => {
    const ds = new DisjointSet(10);

    // Create a chain 0 -> 1 -> 2 -> 3 -> 4 -> ... -> 9
    for (let i = 0; i < 9; i++) {
        ds.union(i, i + 1);
    }

    // After path compression, all should point to the same root
    expect(ds.find(9)).toEqual(ds.find(0)); // All elements should have the same root after union
    expect(ds.find(1)).toEqual(ds.find(0));
    expect(ds.find(5)).toEqual(ds.find(0));
});
