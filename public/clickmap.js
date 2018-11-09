// Click MAP
function selectOrMove(gridItem) {
    let tileId = gridItem.id;
    let unitId = 0;
    // Is there a VISIBLE unit on the tile?
    if (Object.keys(gridItem.children).length >= 1) {
        unitId = gridItem.children[0].id.substring(1);
        let unitIndex = pop.findIndex((obj => obj.id == unitId));
        unitOwner = pop[unitIndex].player;
    }
    if (unitId >= 1) { // there is a VISIBLE unit
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
        showUnit(selectedUnit.id,selectedUnit.tileId,selectedUnit.icon,'sunits');
        // show moves left for each adjacent tiles (in title)
        showMovesLeft(selectedUnit.tileId, unitId);
        showUnitInfos(unitId);
        showTileInfos(selectedUnit.tileId,true);
    } else {
        showUnitInfos(unitId);
    }
};
function unSelectUnit(unitId) {
    drawTileDefaultUnit(selectedUnit.tileId);
    $('#unitInfos').empty();
    clearMovesLeft();
    selectedUnit = [];
    cursorSwitch('.','grid-item','pointer');
};
