let graph = new Map();

function getNode(value, verticies) {
    const node = new Map();
    node.set('value', value);
    node.set('verticies', verticies);
    return node;
}

function getVertex(nodeDestination, weight) {
    const vertex = new Map();
    vertex.set('node', nodeDestination);
    vertex.set('weight', weight);
    return vertex;
}

function addNode(node) {
    if (typeof node == 'object') {
        node.forEach(element => {
            graph.set(element.get('value'), element);
        });
    } else {
        graph.set(node.value, node);
    }
}

const nodeAverticies = [getVertex('C', 2), getVertex('E', 1)]
const nodeA = getNode('A', nodeAverticies);

const nodeBverticies = [getVertex('A', 1), getVertex('F', 5), getVertex('D', 3)]
const nodeB = getNode('B', nodeBverticies);

const nodeC = getNode('C', null);

const nodeD = getNode('D', null);

const nodeEverticies = [getVertex('G', 4)]
const nodeE = getNode('E', nodeEverticies);

const nodeFverticies = [getVertex('E', 3)]
const nodeF = getNode('F', nodeFverticies);

const nodeG = getNode('G', null);

addNode([nodeA, nodeB, nodeC, nodeD, nodeE, nodeF, nodeG]);

const possiblePath = [];
const tStart = 'B';
const destination = 'G';
let path = [];
let weightArr = [];

function getPath(sGraph, start, weight) {
    const nodeStart = sGraph.get(start);
    path.push(nodeStart.get('value'));
    weightArr.push(weight);

    if (nodeStart.get('value') == destination) {
        possiblePath.push({
            path: path.join(','),
            totalWeight: weightArr.reduce((a, b) => a + b)
        });
    }

    let verticies = nodeStart.get('verticies');
    if (verticies != null) {
        verticies.forEach(e => { // e is a Map object
            getPath(sGraph, e.get('node'), e.get('weight'));
            path.pop();
            weightArr.pop();
        })
    }
}

// getPath(graph, tStart, 0);

// console.log(possiblePath)

