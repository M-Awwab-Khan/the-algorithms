export default class ArrayList<T> {
    public length: number;
    private array: T[];

    constructor(size: number = 0) {
        this.array = new Array(size);
        this.length = 0;
    }
    prepend(item: T): void {
        for (let i = this.length - 1; i >= 0; --i) {
            this.array[i + 1] = this.array[i];
        }
        this.array[0] = item;
        this.length++;
    }
    insertAt(item: T, idx: number): void {
        for (let i = this.length - 1; i >= idx; --i) {
            this.array[i + 1] = this.array[i];
        }
        this.array[idx] = item;
        this.length++;
    }
    append(item: T): void {
        this.array[this.length] = item;
        this.length++;
    }
    remove(item: T): T | undefined {
        let idx = this._search(item);
        if (idx != -1) {
            for (let i = idx; i < this.length - 1; ++i) {
                this.array[i] = this.array[i + 1];
            }
            this.array[this.length - 1] = undefined as unknown as T;
            this.length--;
            return item;
        }
        return undefined;

    }
    get(idx: number): T | undefined {
        if (idx >= 0 && idx < this.length) {
            return this.array[idx];
        }
        return undefined;
    }
    removeAt(idx: number): T | undefined {
        if (idx >= 0 && idx < this.length) {
            let element = this.array[idx];
            for (let i = idx; i < this.length - 1; ++i) {
                this.array[i] = this.array[i + 1];
            }
            this.array[this.length - 1] = undefined as unknown as T;
            this.length--;
            return element;
        }
        return undefined;

    }
    _search(item: T): number {
        for (let i = 0; i < this.length; ++i) {
            if (this.array[i] === item) {
                return i;
            }
        }

        return -1;
    }
}
