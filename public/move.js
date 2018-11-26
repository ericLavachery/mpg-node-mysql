function moveLoss(unitId,number) {
    let anum = about(number,15);
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let moveLost = anum;
    pop[unitIndex].fatigue = pop[unitIndex].fatigue+moveLost;
};
function moveLossPerc(unitId,number) {
    let anum = about(number,15);
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let moveLost = Math.round(pop[unitIndex].move*anum/100);
    pop[unitIndex].fatigue = pop[unitIndex].fatigue+moveLost;
};
function moveHere(targetTileId) {
    if (isAdjacent(selectedUnit.tileId,targetTileId)) {
        if (mode == 'g_move' && selectedUnit.follow >= 1) {
            let groupSize = 0;
            pop.forEach(function(unit) {
                if (unit.follow == selectedUnit.follow && unit.player == pseudo && unit.tileId == selectedUnit.tileId) {
                    groupSize = groupSize+1;
                }
            });
            if (groupSize >= 2) {
                moveGroup(targetTileId);
            } else {
                moveUnit(targetTileId);
            }
        } else {
            moveUnit(targetTileId);
        }
    }
};
function moveGroup(targetTileId) {
    oldTileId = selectedUnit.tileId;
    // units to be moved
    let popToMove = _.filter(pop, function(unit) {
        return (unit.follow == selectedUnit.follow && unit.player === pseudo && unit.tileId == selectedUnit.tileId);
    });
    // check if all units can move
    let moveOK = true;
    let moveCost = 0;
    let fatigue = 0;
    let movesLeft = 0;
    popToMove.forEach(function(unit) {
        // move the whole group only if not null
        if (unit.follow !== null || unit.id == selectedUnit.id) {
            moveCost = calcMoveCost(targetTileId,unit.id);
            movesLeft = unit.move - unit.fatigue;
            if (moveCost > movesLeft*3) {
                moveOK = false;
            }
        }
    });
    // move all units
    let unitIndex = 0;
    if (moveOK) {
        // clear old tile
        $('#b'+oldTileId).empty();
        $('#s'+oldTileId).empty();
        popToMove.forEach(function(unit) {
            // move the whole group only if not null
            if (unit.follow !== null || unit.id == selectedUnit.id) {
                moveCost = calcMoveCost(targetTileId,unit.id);
                fatigue = unit.fatigue + about(moveCost,10);
                movesLeft = unit.move - fatigue;
                // change infos dans pop
                unitIndex = pop.findIndex((obj => obj.id == unit.id));
                pop[unitIndex].tileId = targetTileId;
                pop[unitIndex].fatigue = fatigue;
                if (unit.id == selectedUnit.id) {
                    // change infos dans selectedUnit
                    selectedUnit.tileId = targetTileId;
                    selectedUnit.fatigue = fatigue;
                }
                // envoi au serveur
                socket.emit('move_unit', {tileId: targetTileId, unitId: unit.id, fatigue: fatigue});
            }
        });
        unfogTile(targetTileId,true,true);
        // draw on new tile
        drawUnit(selectedUnit.id, targetTileId, selectedUnit.pic, 'icon-selected');
        // réaffiche les infos
        showGroupMovesLeft(selectedUnit.tileId, popToMove);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
        showTileUnitList(selectedUnit.tileId);
        drawTileDefaultUnit(oldTileId);
        purgeGroups(targetTileId);
    }
};
// a améliorer!!
function moveUnit(targetTileId) {
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
        fatigue = fatigue + about(moveCost,15);
        movesLeft = move-fatigue;
        // clear old tile
        $('#b'+selectedUnit.tileId).empty();
        $('#s'+selectedUnit.tileId).empty();
        // change infos dans pop
        pop[unitIndex].tileId = targetTileId;
        pop[unitIndex].fatigue = fatigue;
        unfogTile(targetTileId,true,true);
        // draw on new tile
        drawUnit(selectedUnit.id, targetTileId, selectedUnit.pic, 'icon-selected');
        // change infos dans selectedUnit
        selectedUnit.tileId = targetTileId;
        selectedUnit.fatigue = fatigue;
        // envoi au serveur
        socket.emit('move_unit', {tileId: targetTileId, unitId: selectedUnit.id, fatigue: fatigue});
        // affiche les infos
        showUnitMovesLeft(selectedUnit.tileId, selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
        showTileUnitList(selectedUnit.tileId);
        drawTileDefaultUnit(oldTileId);
        purgeGroups(targetTileId);
    }
};
function terMoveCost(tileId) {
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let terIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let moveCost = 30;
    let vegetMoveAdj, escarpMoveAdj, innondMoveAdj;
    // ajustement terrain
    moveCost = moveCost+ter[terIndex].moveCostAdj;
    // vegetation
    vegetMoveAdj = Math.round(ter[terIndex].vegetation*ter[terIndex].vegetation/50);
    moveCost = moveCost+vegetMoveAdj;
    // escarpement
    escarpMoveAdj = Math.round(ter[terIndex].escarpement*ter[terIndex].escarpement/16);
    moveCost = moveCost+escarpMoveAdj;
    // innondation
    innondMoveAdj = ter[terIndex].innondation*2;
    moveCost = moveCost+innondMoveAdj;
    return moveCost;
};
function roadMoveCost(tileId) {
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let terIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let moveCostRoad = 20;
    let vegetMoveAdj, escarpMoveAdj, innondMoveAdj;
    // ajustement terrain
    moveCostRoad = moveCostRoad+Math.round(ter[terIndex].moveCostAdj*70/100);
    // vegetation
    vegetMoveAdj = Math.round(ter[terIndex].vegetation*ter[terIndex].vegetation/50);
    moveCostRoad = moveCostRoad+Math.round(vegetMoveAdj*20/100);
    // escarpement
    escarpMoveAdj = Math.round(ter[terIndex].escarpement*ter[terIndex].escarpement/16);
    if (escarpMoveAdj >= 10) {
        moveCostRoad = moveCostRoad+Math.round((escarpMoveAdj-10)*70/100);
    }
    // innondation
    innondMoveAdj = ter[terIndex].innondation*2;
    moveCostRoad = moveCostRoad+Math.round(innondMoveAdj*40/100);
    return moveCostRoad;
};
function calcMoveCost(targetTileId, unitId) {
    // tile move cost
    let tileIndex = world.findIndex((obj => obj.id == targetTileId));
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let moveCost = terMoveCost(targetTileId);
    let moveCostRoad = roadMoveCost(targetTileId);
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let oldTileIndex = world.findIndex((obj => obj.id == pop[unitIndex].tileId));
    let oldTileFlags = world[oldTileIndex].flags;
    let tileFlags = world[tileIndex].flags;
    if (tileFlags.includes('road_') && oldTileFlags.includes('road_')) {
        moveCost = ter[terrainIndex].moveCostRoad;
    } else {
        if (perso.mapCarto.includes(targetTileId)) {
            if (tileFlags.includes('river_')) {
                moveCost = moveCost+20;
            }
            moveCost = Math.round(moveCost*80/100);
        } else {
            if (tileFlags.includes('river_')) {
                moveCost = moveCost+40;
            }
        }
    }
    // unit move cost
    let move = pop[unitIndex].move;
    if (move >= 1) {
        let moveAdj = pop[unitIndex].moveAdj;
        let unitTileId = pop[unitIndex].tileId;
        moveCost = Math.round(((moveCost-30)*moveAdj/100)+30);
        if (isDiag(unitTileId,targetTileId)) {
            moveCost = Math.round(moveCost*1414/1000);
        }
    } else {
        moveCost = 999;
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
