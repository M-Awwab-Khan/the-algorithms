const dir = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
]

function walk(maze: string[], curr: Point, end: Point, wall: string, seen: boolean[][], path: Point[]): boolean {
    //base cases
    //1. off the maze
    if ((curr.x < 0 || curr.x >= maze[0].length) || (curr.y < 0 || curr.y >= maze.length)) {
        return false;
    }
    //2. its a wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }
    //3. its seen
    if (seen[curr.y][curr.x] === true) {
        return false;
    }

    //4. its the end
    if (curr.x === end.x && curr.y === end.y) {
        path.push(end);
        return true;
    }

    // Recursion

    //pre-condition
    seen[curr.y][curr.x] = true;
    path.push(curr);


    //recurse
    for (let i = 0; i < dir.length; ++i) {
        let new_position = { x: curr.x + dir[i][0], y: curr.y + dir[i][1] }
        if (walk(maze, new_position, end, wall, seen, path)) {
            return true;
        }
    }

    //post-condition
    path.pop();
    return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i = 0; i < maze.length; ++i) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, start, end, wall, seen, path);
    return path;
}
