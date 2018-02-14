import Baobab from 'baobab';

import initial from './initial';

const tree = new Baobab(initial, {
    immutable: true,
    persistent: true,
    asynchronous: false,
    autoCommit: false
});

window.tree = tree;
export default tree;
