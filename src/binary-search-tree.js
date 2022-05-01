const {NotImplementedError} = require('../extensions/index.js');
const {assert} = require('chai');

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.tree = null;
    }

    root() {
        return this.tree;
    }

    add(data) {
        function addWithin(node, data) {
            if (!node) {
                return new Node(data);
            }
            if (node.data === data) {
                return node;
            }

            if (node.data < data) {
                node.right = addWithin(node.right, data);
            } else {
                node.left = addWithin(node.left, data);
            }
            return node;
        }

        this.tree = addWithin(this.tree, data);
    }

    has(data) {
        function searchWithin(node, data) {
            if (!node) {
                return false;
            }
            if (node.data === data) {
                return true;
            }
            return node.data > data
                ? searchWithin(node.left, data)
                : searchWithin(node.right, data);
        }

        return searchWithin(this.tree, data);
    }

    find(data) {
        function searchWithin(node, data) {
            if (!node) {
                return null;
            }
            if (node.data === data) {
                return node;
            }
            return node.data > data
                ? searchWithin(node.left, data)
                : searchWithin(node.right, data);
        }

        return searchWithin(this.tree, data);
    }

    remove(data) {
        function removeNode(node, data) {
            if (!node) {
                return null;
            }
            if (node.data > data) {
                node.left = removeNode(node.left, data);
                return node;
            } else if (node.data < data) {
                node.right = removeNode(node.right, data);
                return node;
            } else {
                if (!node.left && !node.right) {
                    return null;
                }
                if (!node.left) {
                    return node.right;
                }
                if (!node.right) {
                    return node.left;
                }
                let maxFromLeft = node.left;
                while (maxFromLeft.right) {
                    maxFromLeft = maxFromLeft.right;
                }
                node.data = maxFromLeft.data;
                node.left = removeNode(node.left, maxFromLeft.data);
                return node;
            }
        }

        this.tree = removeNode(this.tree, data);
    }

    min() {
        if (!this.tree) {
            return null;
        }
        let min = this.tree;
        while (min.left) {
            min = min.left;
        }
        return min.data;
    }

    max() {
        if (!this.tree) {
            return null;
        }
        let max = this.tree;
        while (max.right) {
            max = max.right;
        }
        return max.data;
    }
}

// const tree = new BinarySearchTree();
// tree.root();
// tree.add(9);
// tree.add(14);
// tree.add(2);
// tree.add(6);
// tree.add(128);
// tree.add(8);
// tree.add(31);
// tree.add(54);
// tree.add(1);
// tree.remove(14);
// tree.remove(8);
// tree.remove(9);
// console.log(tree.has(14)); //, false);
// console.log(tree.has(8)); //, false);
// console.log(tree.has(9)); //, false);
// console.log(tree.has(2)); //, true);
// console.log(tree.has(6)); //, true);

module.exports = {
    BinarySearchTree
};