// Click MAP
function selectOrMove(tileId) {
    if (mode == 'mapedit') {
        mapEdit(tileId);
    } else {
        // Squad on the tile?
        let ownPopHere = _.filter(pop, function(unit) {
            return (unit.tileId == tileId && unit.player === pseudo);
        });
        let sortedOwnPopHere = _.sortBy(ownPopHere,'number');
        let unitId = 0;
        let anyUnitId = 0;
        let unitOwner = pseudo;
        sortedOwnPopHere.forEach(function(unit) {
            anyUnitId = unit.id;
            if (unit.genre != 'ressource' && unit.genre != 'coffre') {
                unitId = unit.id;
            }
            // unitOwner = unit.player;
        });
        if (unitId == 0) {
            unitId = anyUnitId;
        }
        let unitIndex = pop.findIndex((obj => obj.id == unitId));
        if (unitId >= 1) { // there is a unit
            if (selectedUnit.tileId == tileId) { // a unit is selected here => unselect
                unSelectUnit(selectedUnit.id);
            } else { // no selected unit here
                if (mode == 'inspect' || selectedUnit.onTrack >= 1) {
                    if (unitOwner == pseudo) {
                        selectUnit(unitId);
                    } else {
                        unSelectUnit(selectedUnit.id);
                    }
                } else if (mode == 'g_move' || mode == 's_move') {
                    if (selectedUnit.id >= 1) { // a unit is selected => move it here
                        moveHere(tileId);
                    } else { // no unit selected => select this one
                        if (unitOwner == pseudo) {
                            selectUnit(unitId);
                        } else {
                            unSelectUnit(selectedUnit.id);
                        }
                    }
                }
            }
        } else { // there is no unit
            if (perso.mapView.includes(tileId)) {
                showTileInfos(tileId,false);
            }
            if (selectedUnit.id >= 1 && selectedUnit.onTrack == 0) { // a unit is selected => move it here
                if (mode == 'g_move' || mode == 's_move') {
                    moveHere(tileId);
                }
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
        autoUnfog(selectedUnit.tileId);
        if (selectedUnit.onTrack >= 1) {
            selectTrack(selectedUnit.onTrack);
        }
    } else {
        showUnitInfos(unitId);
    }
};
function unSelectUnit(unitId) {
    let oldTileId = selectedUnit.tileId;
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
    showTileInfos(oldTileId,false);
};
