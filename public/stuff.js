// STUFF
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
function isJSON(string) {
    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
};
function about(number,aleat) {
    let numAleat = Math.round(number*aleat/100);
    let aboutNum = Math.floor((Math.random() * (numAleat*2)) + 1)+number-numAleat;
    return aboutNum;
};
function emitSinglePopChange(id,prop,value) {
    socket.emit('single_pop_change', {id: id, prop: prop, value: value});
};
function emitPlayersChange(perso) {
    socket.emit('player_change', perso);
};
