const {NotImplementedError} = require('../extensions/index.js');
const {ListNode} = require('../extensions');
const {assert} = require('chai');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */
function removeKFromList(l, k) {
    function indexesOf(l, k) {
        const indArr = [];
        let ind = 0;

        while (l) {
            if (l.value === k) {
                indArr.push(ind);
            }
            l = l.next;
            ind++;
        }
        return indArr;
    }

    const posArr = indexesOf(l, k);
    let x = 0;
    posArr.forEach(pos => {
        let current = l;
        if (pos === 0) {
            l = current.next;
            x--;
            return;
        } else {
            let prev = null;
            let ind = 0;
            while (ind < pos + x) {
                prev = current;
                current = current.next;
                ind++;
            }
            x--;
            console.log(`${ind}:`);
            console.log(current.next);
            prev.next = current.next;
        }
    });

    return l;
}

function convertArrayToList(arr) {
    return arr.reverse().reduce((acc, cur) => {
        if (acc) {
            const node = new ListNode(cur);
            node.next = acc;
            return node;
        }
        return new ListNode(cur);
    }, null);
}


const initial = convertArrayToList([3, 1, 2, 3, 4, 5]);
// const initial = convertArrayToList([1, 2, 3, 3, 4, 5]);
const expected = convertArrayToList([1, 2, 4, 5]);
console.log(JSON.stringify(removeKFromList(initial, 3)));//, expected)


module.exports = {
    removeKFromList
};
