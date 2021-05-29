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

const nodeBverticies = [getVertex('F', 5), getVertex('D', 3)]
const nodeB = getNode('B', nodeBverticies);

const nodeC = getNode('C', null);

const nodeD = getNode('D', null);

const nodeEverticies = [getVertex('B', 4), getVertex('G', 4)]
const nodeE = getNode('E', nodeEverticies);

const nodeFverticies = [getVertex('E', 3)]
const nodeF = getNode('F', nodeFverticies);

const nodeG = getNode('G', null);

addNode([nodeA, nodeB, nodeC, nodeD, nodeE, nodeF, nodeG]);

// const visitedNode = [];
// const destination = 'G'

function findPathA(start) {
    let currentNode = graph.get(start);
    if (visitedNode.includes(currentNode.get('value'))) {
        //already visited
        visitedNode.pop();
    } else {
        visitedNode.push(currentNode.get('value'));

        if (start == destination) {
            //found node
            console.log('path is : ' + visitedNode.join('->'));
        }

        let currentVerticies = currentNode.get('verticies');
        if (currentVerticies != null) {
            currentVerticies.forEach(e => {
                findPath(e.get('node'));
                visitedNode.pop();
            })
        }
    }
}

const visitedNode = [];
const finish = 'G';
function findPath(start) {
    const queue = [];
    queue.push(start);
    while (queue.length > 0) {
        if (queue.includes(finish)) {
            console.log('found node!!')
            return;
        }
        const currentNode = graph.get(queue[0]);
        const currentVerticies = currentNode.get('verticies');
        if (currentVerticies != null) {
            currentVerticies.forEach(e => {
                const eNode = e.get('node');
                if (!visitedNode.includes(eNode)) {//not yet visited, repeat
                    queue.push(eNode);
                }
            })
        }
        const shifted = queue.shift();
        visitedNode.push(shifted);
    }
}

findPath('B');