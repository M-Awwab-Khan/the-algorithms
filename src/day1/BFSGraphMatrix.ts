import Queue from "./Queue";

export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    let q = new Queue<number>();
    let seen: boolean[] = new Array(graph.length).fill(false);
    let prev: number[] = new Array(graph.length).fill(-1);

    q.enqueue(source);

    while (!q.isEmpty()) {
        let curr = q.deque() as number;

        if (curr === needle) {
            break;
        }
        let adjs = graph[curr];
        for (let i = 0; i < adjs.length; ++i) {
            if (adjs[i] !== 0 && !seen[i]) {
                seen[i] = true;
                q.enqueue(i);
                prev[i] = curr;
            }
        }
    }
    //lets build back the path
    if (prev[needle] === -1) {
        return null;
    }

    let path: number[] = [];
    let curr = needle;
    while (prev[curr] !== -1) {
        path.push(curr);
        curr = prev[curr];
    }

    return [source].concat(path.reverse());
}

