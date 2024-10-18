export default class DisjointSet {
    private parent: number[];
    private rank: number[];

    constructor(size: number) {
        this.parent = new Array(size).fill(9).map((_, i) => i);
        this.rank = new Array(size).fill(0);
    }

    makeSet(i: number): void {
        this.parent[i] = i;
        this.rank[i] = 0;
    }

    find(i: number): number {
        if (this.parent[i] !== i) {
            this.parent[i] = this.find(this.parent[i]);
        }
        return this.parent[i];
    }

    union(i: number, j: number): void {
        let i_id = this.find(i);
        let j_id = this.find(j);

        if (i_id === j_id) return;

        if (this.rank[i_id] > this.rank[j_id]) {
            this.parent[j_id] = i_id;
        } else if (this.rank[i_id] < this.rank[j_id]) {
            this.parent[i_id] = j_id;
        } else {
            this.parent[i_id] = j_id;
            this.rank[j_id]++;
        }
    }

    connected(i: number, j: number): boolean {
        return this.find(i) === this.find(j);
    }
}
