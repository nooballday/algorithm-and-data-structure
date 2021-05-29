class NodeX {
    value;
    verticies = [];
    constructor(value, verticies) {
        this.value = value;
        this.verticies = this.verticies.concat(verticies);
    }
}

class Vertex {
    nodes;
    weight;
    constructor(nodes, weight) {
        this.nodes = nodes;
        this.weight = weight;
    }
}

const vAB = new Vertex('AB', 6);
const vAD = new Vertex('AD', 1);
const vAC = new Vertex('AC', 2);
const vBD = new Vertex('BD', 2);
const vBC = new Vertex('BC', 5);
const vBE = new Vertex('BE', 2);
const vDE = new Vertex('DE', 1);
const vEC = new Vertex('EC', 5);

const nA = new NodeX('A', [vAB, vAD]);
const nB = new NodeX('B', [vAB, vBD, vBE, vBC]);
const nC = new NodeX('C', [vBC, vEC]);
const nD = new NodeX('D', [vAD, vBD, vDE]);
const nE = new NodeX('E', [vDE, vBE]);

const graph = {
    A: nA,
    B: nB,
    C: nC,
    D: nD,
    E: nE
}

/**--------------Dijkstra Algorithm ---------------- */

const availableNodes = ['A', 'B', 'C', 'D', 'E'];

// dijkstra table
const djTable = new Map();
availableNodes.forEach(e => {
    djTable.set(e, {
        sD: Infinity,
        previousVertex: ''
    });
});

const origin = 'A';
const destination = 'C';
const visited = [];
const unvisited = ['A', 'B', 'C', 'D', 'E'];

while (unvisited.length > 0) {
    const currentNode = unvisited.includes(origin) ? { i: unvisited.indexOf((origin)), s: origin } : getShortestUnvisisted();
    const n = currentNode.s;
    if (n == origin) {
        djTable.set(n, {
            sD: 0,
            previousVertex: ''
        });
    }
    const distanceFromOrigin = djTable.get(n).sD;
    const neighbors = graph[n].verticies; //array
    neighbors.forEach(neighbor => {
        const destination = neighbor.nodes.replace(n, '');
        if (visited.includes(destination)) return; //skip if neighbor is already visited
        const currentNeighbordDistance = djTable.get(destination).sD;
        const newDistance = distanceFromOrigin + neighbor.weight;
        if (newDistance < currentNeighbordDistance) {
            const newDJTableData = {
                sD: newDistance,
                previousVertex: n
            }
            djTable.set(destination, newDJTableData); //update djTable with newer shorter distance
        }
    });
    const xV = unvisited.splice(currentNode.i, 1);
    visited.push(xV[0]);
}

/**
 * 
 * @returns {i : index in unvisisted , s: Node value}
 */
function getShortestUnvisisted() {
    let shortest = {
        w: Infinity,
        s: ''
    };
    unvisited.forEach((u, i) => {
        const cDjTable = djTable.get(u);
        if (cDjTable.sD < shortest.w) {
            shortest = {
                w: cDjTable.sD,
                i: i,
                s: u
            }
        }
    });
    return shortest;
}

console.log(djTable);

let currentPath = destination;
const path = [];

while (currentPath != origin) {
    path.unshift(currentPath);
    const cDjTable = djTable.get(currentPath);
    currentPath = cDjTable.previousVertex;
    if (currentPath == origin) path.unshift(currentPath);
}

if (currentPath == origin) {
    console.log(`Found Shortest Path with distance of ${djTable.get(destination).sD} : ` + path.join(" -> "));
} else {
    console.log("Path not found");
}