import {branches} from '../data';

export function selectExtension(tree, index) {
    tree.set(branches.CURRENT_EXTENSION, index);
    tree.commit();
}

export function setStations(tree, stations) {
    tree.set(branches.STATIONS, stations);
    tree.commit();
}
