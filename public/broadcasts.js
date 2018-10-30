// OPPONENT MOVES
socket.on('unit_moved', function(mvi) {
    showOpponentMove(mvi.tileId, mvi.unitId);
});
function showOpponentMove(tileId, unitId) {
    objIndex = pop.findIndex((obj => obj.id == unitId));
    let movedUnitOldTileId = pop[objIndex].tileId;
    let movedUnitPic = pop[objIndex].pic;
    // bouge l'image sur la carte
    $('#'+movedUnitOldTileId).empty();
    $('#'+tileId).empty().append('<img src="/static/img/units/'+movedUnitPic+'" alt="'+movedUnitPic+'" id="u'+unitId+'">');
    // change le tileId dans pop
    pop[objIndex].tileId = tileId;
    // montrer les unités qui étaient en dessous de celle qui est partie (ouais je me comprend)
    pop.forEach(function(unit) {
        if (unit.tileId == movedUnitOldTileId) {
            showUnit(unit.id,unit.tileId,unit.pic,'units');
        }
    });
};
// OPPONENT JOINS
socket.on('units_joined', function(jui) {
    let allIds = ','+jui.idsToDelete+',';
    let unitIndex = pop.findIndex((obj => obj.id == jui.joinToId));
    pop[unitIndex].fatigue = jui.fatigue;
    pop[unitIndex].number = jui.totalUnits;
    pop.slice().reverse().forEach(function(unit) {
        if (allIds.includes(","+unit.id+",")) {
            unitIndex = pop.findIndex((obj => obj.id == unit.id));
            pop.splice(unitIndex,1);
        }
    });
});
// OPPONENT SPLITS
socket.on('unit_splited', function(sui) {
    splitOnClientPop(sui);
});
// PLAYER SPLITS
socket.on('my_unit_splited', function(sui) {
    splitOnClientPop(sui);
    showUnitInfos(selectedUnit.id);
    showTileInfos(selectedUnit.tileId,true);
});
function splitOnClientPop(sui) {
    let unitIndex = pop.findIndex((obj => obj.id == sui.splitedUnitId));
    let newUnit = JSON.parse(JSON.stringify(pop[unitIndex]));
    newUnit.number = Number(sui.splitValue);
    newUnit.id = Number(sui.newId);
    pop.push(newUnit);
    pop[unitIndex].number = pop[unitIndex].number-sui.splitValue;
}
