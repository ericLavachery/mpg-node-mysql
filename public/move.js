// Button "MOVE MODE" only needed to move where there's already a unit.
// Once clicked, click again to quit MOVE MODE.
$('#moveButton').click(moveMode);
function moveMode() {
    if (mode != 'move') {
        mode = 'move';
        $('#moveButton').empty().append('Quit Move Mode');
        $('#attackButton').empty().append('Attack Mode');
        $('#zone_map').css("background-color", "#2b89a7");
    } else {
        mode = 'free';
        $('#moveButton').empty().append('Move Mode');
        $('#attackButton').empty().append('Attack Mode');
        $('#zone_map').css("background-color", "#DDDDDD");
    }
}
function moveUnit(tileId) {
    if (isAdjacent(selectedUnit.tileId,tileId)) {
        // tile move cost
        let tileIndex = world.findIndex((obj => obj.id == tileId));
        let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
        let moveCost = ter[terrainIndex].moveCost;
        // unit move cost
        let unitIndex = pop.findIndex((obj => obj.id == selectedUnit.id));
        let move = pop[unitIndex].move;
        let moveAdj = pop[unitIndex].moveAdj;
        let fatigue = pop[unitIndex].fatigue;
        if (fatigue < 0) {
            fatigue = 0;
        };
        let movesLeft = move-fatigue;
        moveCost = calcMoveCost(tileId,selectedUnit.id);
        // console.log(moveCost);
        if (movesLeft*3 >= moveCost) {
            fatigue = fatigue+moveCost;
            movesLeft = move-fatigue;
            // bouge l'image sur la carte
            $('#'+selectedUnit.tileId).empty();
            $('#'+tileId).empty().append('<img src="/static/img/sunits/'+selectedUnit.pic+'" alt="'+selectedUnit.pic+'" id="u'+selectedUnit.id+'">');
            // change infos dans pop
            pop[unitIndex].tileId = tileId;
            pop[unitIndex].fatigue = fatigue;
            // change le tile dans selectedUnit
            oldTileId = selectedUnit.tileId;
            selectedUnit.tileId = tileId;
            // envoi au serveur
            socket.emit('move_unit', { tileId: tileId, unitId: selectedUnit.id, fatigue: fatigue});
            // affiche les infos
            showMovesLeftOnMouseOver(selectedUnit.tileId, selectedUnit.id);
            showUnitInfos(selectedUnit.id);
            showTileInfos(selectedUnit.tileId,true);
            // remettre les unités qui étaient en dessous de celle qui est partie (ouais je me comprend, quoi)
            pop.forEach(function(unit) {
                if (unit.tileId == oldTileId) {
                    showUnit(unit.id,unit.tileId,unit.pic,'units');
                }
            });
        }
    }
};
function calcMoveCost(targetTileId, unitId) {
    // tile move cost
    let tileIndex = world.findIndex((obj => obj.id == targetTileId));
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let moveCost = ter[terrainIndex].moveCost;
    // unit move cost
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let move = pop[unitIndex].move;
    let moveAdj = pop[unitIndex].moveAdj;
    let unitTileId = pop[unitIndex].tileId;
    moveCost = Math.round(((moveCost-30)*moveAdj/100)+30);
    if (isDiag(unitTileId,targetTileId)) {
        moveCost = Math.round(moveCost*1414/1000);
    }
    return moveCost;
}
function isAdjacent(myTileId, thatTileId) {
    let myTileX = world[myTileId-1].x;
    let myTileY = world[myTileId-1].y;
    let thatTileX = world[thatTileId-1].x;
    let thatTileY = world[thatTileId-1].y;
    if (thatTileX == myTileX+1 || thatTileX == myTileX || thatTileX == myTileX-1) {
        if (thatTileY == myTileY+1 || thatTileY == myTileY || thatTileY == myTileY-1) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
function isDiag(myTileId, thatTileId) {
    let diag = false;
    let myTileX = world[myTileId-1].x;
    let myTileY = world[myTileId-1].y;
    let thatTileX = world[thatTileId-1].x;
    let thatTileY = world[thatTileId-1].y;
    let tot = 0;
    if (thatTileX == myTileX+1 || thatTileX == myTileX-1) {
        tot = tot+1;
    }
    if (thatTileY == myTileY+1 || thatTileY == myTileY-1) {
        tot = tot+1;
    }
    if (tot >= 2) {
        diag = true;
    }
    return diag;
};
