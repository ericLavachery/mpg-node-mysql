// STUFF
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
function isDiv(n,d) {
   return n % d == 0;
}
function xType(unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let correctType = pop[unitIndex].type;
    if (pop[unitIndex].number == 1) {
        correctType = pop[unitIndex].typeSing;
    }
    return correctType;
};
function terName(name) {
    if (name.includes('(') && name.includes(')')) {
        let regex = /\((.*?)\)/;
        let parString = ' '+regex.exec(name)[0];
        return capitalizeFirstLetter(name.replace(parString, ""));
    } else {
        return capitalizeFirstLetter(name);
    }
};
function terSpec(name) {
    if (name.includes('(') && name.includes(')')) {
        let regex = /\((.*?)\)/;
        return capitalizeFirstLetter(regex.exec(name)[1]);
    } else {
        return '';
    }
};
function noParString(string) {
    if (string.includes('(') && string.includes(')')) {
        let regex = /\((.*?)\)/;
        let parString = ' '+regex.exec(string)[0];
        return string.replace(parString, "");
    } else {
        return string;
    }
};
function onlyParString(string) {
    if (string.includes('(') && string.includes(')')) {
        let regex = /\((.*?)\)/;
        return regex.exec(string)[1];
    } else {
        return '';
    }
};
function about(number,aleat) {
    let numAleat = Math.round(number*aleat/100);
    let aboutNum = Math.floor((Math.random() * (numAleat*2)) + 1)+number-numAleat;
    return aboutNum;
};
function emitSinglePopChange(id,prop,value) {
    socket.emit('single_pop_change', {id: id, prop: prop, value: value});
};
function emitSingleWorldChange(id,prop,value) {
    socket.emit('single_world_change', {id: id, prop: prop, value: value});
};
function emitSingleTracksChange(id,prop,value) {
    socket.emit('single_tracks_change', {id: id, prop: prop, value: value});
};
function emitPlayersChange(perso) {
    socket.emit('player_change', perso);
};

$('#testmenow').click(shareTest);
function shareTest() {
    if (isJSON.isJSON(perso.unitView)) {
        console.log('yes it is');
    } else {
        console.log('no it is not');
    }
    // mmd.makeMyDay(4,3);
};
