// OPPONENT MOVES
socket.on('unit_moved', function(data) {
    showOpponentMove(data.tileId, data.unitId);
});
function showOpponentMove(tileId, unitId) {
    objIndex = pop.findIndex((obj => obj.id == unitId));
    let movedUnitOldTileId = pop[objIndex].tileId;
    let movedUnitIcon = pop[objIndex].icon;
    // bouge l'image sur la carte
    $('#'+movedUnitOldTileId).empty();
    $('#'+tileId).empty().append('<img src="/static/img/units/'+movedUnitIcon+'.png" alt="'+movedUnitIcon+'" id="u'+unitId+'">');
    // change le tileId dans pop
    pop[objIndex].tileId = tileId;
    // montrer les unités qui étaient en dessous de celle qui est partie (ouais je me comprend)
    pop.forEach(function(unit) {
        if (unit.tileId == movedUnitOldTileId) {
            showUnit(unit.id,unit.tileId,unit.icon,'units');
        }
    });
};
// OPPONENT JOINS
socket.on('units_joined', function(data) {
    let allIds = ','+data.idsToDelete+',';
    let unitIndex = pop.findIndex((obj => obj.id == data.joinToId));
    pop[unitIndex].fatigue = data.fatigue;
    pop[unitIndex].number = data.totalUnits;
    pop.slice().reverse().forEach(function(unit) {
        if (allIds.includes(","+unit.id+",")) {
            unitIndex = pop.findIndex((obj => obj.id == unit.id));
            pop.splice(unitIndex,1);
        }
    });
});
// OPPONENT SPLITS
socket.on('unit_splited', function(data) {
    splitOnClientPop(data);
});
// PLAYER SPLITS
socket.on('my_unit_splited', function(data) {
    splitOnClientPop(data);
    showUnitInfos(selectedUnit.id);
    showTileInfos(selectedUnit.tileId,true);
});
function splitOnClientPop(data) {
    let unitIndex = pop.findIndex((obj => obj.id == data.splitedUnitId));
    let newUnit = JSON.parse(JSON.stringify(pop[unitIndex]));
    newUnit.number = Number(data.splitValue);
    newUnit.id = Number(data.newId);
    pop.push(newUnit);
    pop[unitIndex].number = pop[unitIndex].number-data.splitValue;
}
