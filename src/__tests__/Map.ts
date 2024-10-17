import MyMap from "@code/Map";

test("Map", function () {
    const map = new MyMap<string, number>();
    map.set("foo", 55);
    expect(map.getSize()).toEqual(1);
    map.set("fool", 75);
    expect(map.getSize()).toEqual(2);
    map.set("foolish", 105);
    expect(map.getSize()).toEqual(3);
    map.set("bar", 69);
    expect(map.getSize()).toEqual(4);

    expect(map.get("bar")).toEqual(69);
    expect(map.get("blaz")).toEqual(undefined);

    map.delete("barblabr");
    expect(map.getSize()).toEqual(4);

    map.delete("bar");
    expect(map.getSize()).toEqual(3);
    expect(map.get("bar")).toEqual(undefined);
});
