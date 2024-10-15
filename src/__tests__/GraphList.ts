import Graph from "../day1/Graph";

test("Graph basic operations", () => {
    // Initialize an undirected graph
    const graph = new Graph(false);

    // Add vertices
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addVertex(3);

    // Check if vertices are added
    expect(graph.getAdjacencyList().has(1)).toEqual(true);
    expect(graph.getAdjacencyList().has(2)).toEqual(true);
    expect(graph.getAdjacencyList().has(3)).toEqual(true);

    // Add edges
    graph.addEdge(1, 2, 5);
    graph.addEdge(2, 3, 10);

    // Check adjacency list after adding edges
    expect(graph.getAdjacencyList().get(1)).toEqual([{ to: 2, weight: 5 }]);
    expect(graph.getAdjacencyList().get(2)).toEqual([
        { to: 1, weight: 5 },
        { to: 3, weight: 10 },
    ]);
    expect(graph.getAdjacencyList().get(3)).toEqual([{ to: 2, weight: 10 }]);

    // Check if edges exist
    expect(graph.hasEdge(1, 2)).toEqual(true);
    expect(graph.hasEdge(2, 3)).toEqual(true);
    expect(graph.hasEdge(1, 3)).toEqual(false); // No edge between 1 and 3

    // Remove an edge
    graph.removeEdge(1, 2);

    // Check if edge was removed
    expect(graph.hasEdge(1, 2)).toEqual(false);
    expect(graph.getAdjacencyList().get(1)).toEqual([]); // No neighbors
    expect(graph.getAdjacencyList().get(2)).toEqual([{ to: 3, weight: 10 }]);
});

test("Graph remove vertex", () => {
    const graph = new Graph(false);

    // Add vertices and edges
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addVertex(3);
    graph.addEdge(1, 2);
    graph.addEdge(2, 3);

    // Remove vertex 2
    graph.removeVertex(2);

    // Check adjacency list after removing vertex 2
    expect(graph.getAdjacencyList().has(2)).toEqual(false);
    expect(graph.getAdjacencyList().get(1)).toEqual([]); // Edge to 2 is gone
    expect(graph.getAdjacencyList().get(3)).toEqual([]); // Edge to 2 is gone
});

test("Graph BFS", () => {
    const graph = new Graph(false);

    // Add vertices and edges
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addVertex(3);
    graph.addVertex(4);
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(2, 4);
    graph.addEdge(3, 4);

    // Test BFS from vertex 1 to 4
    const bfsPath = graph.bfs(1, 4);
    expect(bfsPath).toEqual([1, 2, 4]);

    // Test BFS when there's no path (e.g., 4 to 5, but vertex 5 doesn't exist)
    const bfsPathNoTarget = graph.bfs(1, 5);
    expect(bfsPathNoTarget).toEqual(null);
});

test("Graph DFS", () => {
    const graph = new Graph(false);

    // Add vertices and edges
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addVertex(3);
    graph.addVertex(4);
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(2, 4);
    graph.addEdge(3, 4);

    // Test DFS from vertex 1 to 4
    const dfsPath = graph.dfs(1, 4);
    expect(dfsPath).toEqual([1, 2, 4]);

    // Test DFS when there's no path (e.g., 4 to 5, but vertex 5 doesn't exist)
    const dfsPathNoTarget = graph.dfs(1, 5);
    expect(dfsPathNoTarget).toEqual(null);
});

test("Graph Directed vs Undirected", () => {
    // Undirected graph
    const undirectedGraph = new Graph(false);
    undirectedGraph.addEdge(1, 2);
    expect(undirectedGraph.getAdjacencyList().get(1)).toEqual([
        { to: 2, weight: 1 },
    ]);
    expect(undirectedGraph.getAdjacencyList().get(2)).toEqual([
        { to: 1, weight: 1 },
    ]);

    // Directed graph
    const directedGraph = new Graph(true);
    directedGraph.addEdge(1, 2);
    expect(directedGraph.getAdjacencyList().get(1)).toEqual([
        { to: 2, weight: 1 },
    ]);
    expect(directedGraph.getAdjacencyList().get(2)).toEqual([]); // No reverse edge
});
