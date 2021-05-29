function getNode(key, left, right) {
    const newNode = new Map()
    newNode.set('key', key);
    newNode.set('left', left);
    newNode.set('right', right);
    return newNode;
}

const node12 = getNode(12, null, null)
const node6 = getNode(6, node12, null)
const node2 = getNode(2, null, null)
const node11 = getNode(11, null, null)
const node4 = getNode(4, null, null)
const node8 = getNode(8, node11, node4)
const node1 = getNode(1, node6, node2)
const node0 = getNode(0, node1, node8)

let counter = 0

function traverseDFS(node) {
    console.log(`parent : ${node.get('key')}`);

    const leftChild = node.get('left');
    if (leftChild !== null) {
        console.log('left child : ' + leftChild.get('key'))
        traverse(leftChild);
    }

    const rightChild = node.get('right');
    if (rightChild !== null) {
        console.log('right child : ' + rightChild.get('key'))
        traverse(rightChild);
    }
}

// traverseDFS(node0);

function traverseBFS(node, searchValue) {
    const stack = [];
    stack.push(node);

    while (stack.length > 0) {
        let currentNode = stack[0]

        if (currentNode.get('key') == searchValue) {
            console.log('found it!')
            return;
        }

        if (currentNode.get('left') != null) {
            stack.push(currentNode.get('left'));
        }

        if (currentNode.get('right') != null) {
            stack.push(currentNode.get('right'));
        }

        console.log(`current node is : ${currentNode.get('key')}`)
        stack.shift();
    }
}

// traverseBFS(node0, 11);


const path = []

function searchDFS(node, searchValue) {

    path.push(node.get('key'));

    if(node.get('key') == searchValue) {
        console.log('found it : ' + path.join(' -> '));
        return;
    }

    const leftChild = node.get('left');
    if (leftChild !== null) {
        searchDFS(leftChild, searchValue);
        path.pop()
    }

    const rightChild = node.get('right');
    if (rightChild !== null) {
        searchDFS(rightChild, searchValue);
        path.pop()
    }
}

searchDFS(node0, 6)