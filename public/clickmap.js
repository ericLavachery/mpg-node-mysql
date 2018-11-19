// Click MAP
function selectOrMove(tileId) {
    // Squad on the tile?
    let ownPopHere = _.filter(pop, function(unit) {
        return (unit.tileId == tileId && unit.player === pseudo);
    });
    let sortedOwnPopHere = _.sortBy(ownPopHere,'number');
    let unitId = 0;
    let unitOwner = pseudo;
    ownPopHere.forEach(function(unit) {
        unitId = unit.id;
        unitOwner = unit.player;
    });
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    if (unitId >= 1) { // there is a unit
        if (selectedUnit.id == unitId) { // unit already selected => unselect
            unSelectUnit(selectedUnit.id);
        } else { // unit not selected
            if (mode == 'g_move' || mode == 's_move') {
                if (selectedUnit.id >= 1) { // a unit is selected => move it here
                    moveHere(tileId);
                } else { // no unit selected => select this one
                    if (unitOwner == pseudo) {
                        selectUnit(unitId);
                    } else {
                        unSelectUnit(selectedUnit.id);
                    }
                }
            } else if (mode == 'inspect') {
                if (unitOwner == pseudo) {
                    selectUnit(unitId);
                } else {
                    unSelectUnit(selectedUnit.id);
                }
            }
        }
    } else { // there is no VISIBLE unit
        showTileInfos(tileId,false);
        if (selectedUnit.id >= 1) { // a unit is selected => move it here
            if (mode == 'g_move' || mode == 's_move') {
                moveHere(tileId);
            }
        }
    }
};
function selectUnit(unitId) {
    // unmark old selected unit
    drawTileDefaultUnit(selectedUnit.tileId);
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    if (pop[unitIndex].player == pseudo) {
        selectedUnit = pop[unitIndex];
        // console.log(selectedUnit);
        let tileIndex = world.findIndex((obj => obj.id == selectedUnit.tileId));
        selectedUnit.x = world[tileIndex].x;
        selectedUnit.y = world[tileIndex].y;
        // mark the unit
        drawUnit(selectedUnit.id,selectedUnit.tileId,selectedUnit.pic,'icon-selected');
        // show moves left for each adjacent tiles (in title)
        showMovesLeft(selectedUnit.tileId, unitId);
        showUnitInfos(unitId);
        showTileInfos(selectedUnit.tileId,true);
        showTileUnitList(selectedUnit.tileId);
        explore(true);
    } else {
        showUnitInfos(unitId);
    }
};
function unSelectUnit(unitId) {
    drawTileDefaultUnit(selectedUnit.tileId);
    $('#unitInfos').empty();
    $('#tileUnitList').empty();
    clearMovesLeft();
    selectedUnit = [];
    if (mode == 'inspect') {
        cursorSwitch('.','grid-item','insp');
    } else {
        cursorSwitch('.','grid-item','pointer');
    }
};
