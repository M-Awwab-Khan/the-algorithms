export default class Map<T extends string | number, V> {
    private buckets: Array<Array<[T, V]>>;
    private size: number;
    private bucketSize: number;

    constructor() {
        this.bucketSize = 31;
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
        if (!this.buckets[index]) {
            return undefined;
        }
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
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);
    }
    delete(key: T): V | undefined {
        const index = this.hash(key);
    }
    getSize(): number {
        return this.size;
    }
}

