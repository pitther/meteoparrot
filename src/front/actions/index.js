import {branches} from '../data';

export function selectExtension(tree, index) {
    tree.set(branches.CURRENT_EXTENSION, index);
    tree.commit();
}
