export function getStations(tree, io) {
    io.emit('stations.get');
}

export function loadStations(tree, io, content) {
    io.emit('stations.load', {content});
}
