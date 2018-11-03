// Button "MOVE MODE" (only needed to move where there's already a unit).
// Once clicked, click again to quit MOVE MODE.
$('#moveButton').click(moveMode);
function moveMode() {
    if (mode != 'move') {
        mode = 'move';
        $('#moveButton').empty().append('Quit Move Mode');
        $('#attackButton').empty().append('Attack Mode');
        $('#zone_map').css("background-color", "#2b89a7");
        if (selectedUnit.id >= 1) {
            showUnitInfos(selectedUnit.id);
            showTileInfos(selectedUnit.tileId,true);
        }
    } else {
        mode = 'free';
        $('#moveButton').empty().append('Move Mode');
        $('#attackButton').empty().append('Attack Mode');
        $('#zone_map').css("background-color", "#DDDDDD");
        if (selectedUnit.id >= 1) {
            showUnitInfos(selectedUnit.id);
            showTileInfos(selectedUnit.tileId,true);
        }
    }
};
function moveGroup(targetTileId, groupNumber) {
    // something
};
function moveUnit(targetTileId) {
    if (isAdjacent(selectedUnit.tileId,targetTileId)) {
        oldTileId = selectedUnit.tileId;
        // tile move cost
        let tileIndex = world.findIndex((obj => obj.id == targetTileId));
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
        moveCost = calcMoveCost(targetTileId,selectedUnit.id);
        // console.log(moveCost);
        if (movesLeft*3 >= moveCost) {
            fatigue = fatigue+moveCost;
            movesLeft = move-fatigue;
            // bouge l'image sur la carte
            $('#'+selectedUnit.tileId).empty();
            $('#'+targetTileId).empty().append('<img src="/static/img/sunits/'+selectedUnit.pic+'" alt="'+selectedUnit.pic+'" id="u'+selectedUnit.id+'">');
            // change infos dans pop
            pop[unitIndex].tileId = targetTileId;
            pop[unitIndex].fatigue = fatigue;
            // change infos dans selectedUnit
            selectedUnit.tileId = targetTileId;
            selectedUnit.fatigue = fatigue;
            // envoi au serveur
            socket.emit('move_unit', { tileId: targetTileId, unitId: selectedUnit.id, fatigue: fatigue});
            // affiche les infos
            showMovesLeftOnMouseOver(selectedUnit.tileId, selectedUnit.id);
            showUnitInfos(selectedUnit.id);
            showTileInfos(selectedUnit.tileId,true);
            // montrer les unités qui étaient en dessous de celle qui est partie (ouais je me comprend)
            pop.forEach(function(unit) {
                if (unit.tileId == oldTileId) {
                    showUnit(unit.id,unit.tileId,unit.pic,'units');
                }
            });
            purgeGroups(targetTileId);
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
};
function isAdjacent(myTileId, thatTileId) {
    let myTileIndex = world.findIndex((obj => obj.id == myTileId));
    let myTileX = world[myTileIndex].x;
    let myTileY = world[myTileIndex].y;
    let thatTileIndex = world.findIndex((obj => obj.id == thatTileId));
    let thatTileX = world[thatTileIndex].x;
    let thatTileY = world[thatTileIndex].y;
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
    let myTileIndex = world.findIndex((obj => obj.id == myTileId));
    let myTileX = world[myTileIndex].x;
    let myTileY = world[myTileIndex].y;
    let thatTileIndex = world.findIndex((obj => obj.id == thatTileId));
    let thatTileX = world[thatTileIndex].x;
    let thatTileY = world[thatTileIndex].y;
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
