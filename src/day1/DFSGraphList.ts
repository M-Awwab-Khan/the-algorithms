function walk(
    graph: WeightedAdjacencyList,
    curr: number,
    seen: boolean[],
    path: number[],
    needle: number,
) {
    if (curr === needle) {
        path.push(curr);
        return true;
    }
    if (seen[curr]) return false;

    seen[curr] = true;
    path.push(curr);

    let neighbors = graph[curr];
    for (let i = 0; i < neighbors.length; ++i) {
        let edge = neighbors[i];

        if (walk(graph, edge.to, seen, path, needle)) {
            return true;
        }
    }

    path.pop();
    return false;
}

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    let seen: boolean[] = new Array(graph.length).fill(false);
    let path: number[] = [];

    if (walk(graph, source, seen, path, needle)) return path;
    return null;
}

