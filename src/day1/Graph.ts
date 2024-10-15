import Queue from "./Queue";

interface Edge {
    to: number;
    weight: number;
}

export default class Graph {
    private adjacencyList: Map<number, Edge[]>;
    private isDirected: boolean;

    constructor(isDirected: boolean = false) {
        this.adjacencyList = new Map();
        this.isDirected = isDirected;
    }

    addVertex(vertex: number): void {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(vertex1: number, vertex2: number, weight: number = 1): void {
        if (!this.adjacencyList.has(vertex1)) {
            this.addVertex(vertex1);
        }
        if (!this.adjacencyList.has(vertex2)) {
            this.addVertex(vertex2);
        }

        this.adjacencyList.get(vertex1)?.push({ to: vertex2, weight: weight });
        if (!this.isDirected) {
            this.adjacencyList
                .get(vertex2)
                ?.push({ to: vertex1, weight: weight });
        }
    }

    removeEdge(vertex1: number, vertex2: number): void {
        this.adjacencyList.set(
            vertex1,
            this.adjacencyList
                .get(vertex1)
                ?.filter((edge) => edge.to !== vertex2) || [],
        );

        if (!this.isDirected) {
            this.adjacencyList.set(
                vertex2,
                this.adjacencyList
                    .get(vertex2)
                    ?.filter((edge) => edge.to !== vertex1) || [],
            );
        }
    }

    removeVertex(vertex: number): void {
        this.adjacencyList.delete(vertex);

        for (let [key, edges] of this.adjacencyList) {
            this.adjacencyList.set(
                key,
                edges.filter((edge) => edge.to !== vertex),
            );
        }
    }

    getAdjacencyList(): Map<number, Edge[]> {
        return this.adjacencyList;
    }

    hasEdge(vertex1: number, vertex2: number): boolean {
        return (
            this.adjacencyList
                .get(vertex1)
                ?.some((edge) => edge.to === vertex2) || false
        );
    }
    bfs(source: number, target: number): number[] | null {
        let q = new Queue<number>();

        let seen = new Map<number, boolean>();
        let prev = new Map<number, number>();

        q.enqueue(source);
        seen.set(source, true);
        prev.set(source, -1);

        while (!q.isEmpty()) {
            let curr = q.deque() as number;

            if (curr === target) break;
            let neighbors = this.adjacencyList.get(curr) || [];

            for (let neighbour of neighbors) {
                if (!seen.has(neighbour.to)) {
                    q.enqueue(neighbour.to);
                    seen.set(neighbour.to, true);
                    prev.set(neighbour.to, curr);
                }
            }
        }

        if (!prev.has(target)) return null;
        let path: number[] = [];
        for (let at = target; at !== -1; at = prev.get(at)!) {
            path.push(at);
        }

        path.reverse();
        return path;
    }

    private walk(
        curr: number,
        seen: Map<number, boolean>,
        path: number[],
        target: number,
    ) {
        if (curr === target) {
            path.push(curr);
            return true;
        }
        if (seen.has(curr)) return false;

        seen.set(curr, true);
        path.push(curr);

        let neighbors = this.adjacencyList.get(curr) || [];
        for (let i = 0; i < neighbors.length; ++i) {
            let edge = neighbors[i];

            if (this.walk(edge.to, seen, path, target)) {
                return true;
            }
        }

        path.pop();
        return false;
    }

    dfs(source: number, target: number): number[] | null {
        let seen = new Map<number, boolean>();
        let path: number[] = [];

        if (this.walk(source, seen, path, target)) return path;
        return null;
    }
}
