export default class Map<T extends string | number, V> {
    private buckets: Array<Array<[T, V]>>;
    private size: number;
    private bucketSize: number;

    constructor() {
        this.bucketSize = 31;
        this.buckets = new Array(this.bucketSize).fill(null).map(() => []);
        this.size = 0;
    }

    private hash(key: T): number {
        if (typeof key === "number") {
            return key % this.bucketSize;
        } else {
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash = hash * 31 + key.charCodeAt(i);
                hash = hash % this.bucketSize;
            }
            return hash;
        }
    }

    get(key: T): V | undefined {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return undefined;
    }
    set(key: T, value: V): void {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);
        this.size++;
    }
    delete(key: T): V | undefined {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                const value = bucket[i][1];
                bucket.splice(i, 1);
                this.size--;
                return value;
            }
        }
        return undefined;
    }
    getSize(): number {
        return this.size;
    }
}
