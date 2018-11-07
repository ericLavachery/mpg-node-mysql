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
            // selectedUnit = [];
            // $("#u"+unitId).attr("src", gridItem.children[0].src.replace("/sunits/", "/units/"));
            // $('#unitInfos').empty();
            // showTileInfos(tileId,false);
            unSelectUnit(selectedUnit.id);
        } else { // unit not selected
            if (unitOwner == pseudo) {
                if (mode == 'move' && selectedUnit.id >= 1) { // move the unit here
                    moveHere(tileId);
                } else { // select this unit
                    selectUnit(unitId);
                }
            } else {
                if (mode == 'move' && selectedUnit.id >= 1) { // move the unit here
                    moveHere(tileId);
                } else { // only show tile infos
                    // showUnit(selectedUnit.id,selectedUnit.tileId,selectedUnit.icon,'units');
                    // selectedUnit = [];
                    // showUnitInfos(unitId);
                    // showTileInfos(tileId,true);
                    unSelectUnit(selectedUnit.id);
                }
            }
        }
    } else { // there is no VISIBLE unit
        showTileInfos(tileId,false);
        if (selectedUnit.id >= 1) { // a unit is selected => move it here
            moveHere(tileId);
        }
    }
};
function selectUnit(unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    if (pop[unitIndex].player == pseudo) {
        selectedUnit = pop[unitIndex];
        // console.log(selectedUnit);
        let tileIndex = world.findIndex((obj => obj.id == selectedUnit.tileId));
        selectedUnit.x = world[tileIndex].x;
        selectedUnit.y = world[tileIndex].y;
        // unmark all units (from pseudo)
        pop.forEach(function(unit) {
            if (unit.player == pseudo && unit.id != selectedUnit.id) {
                showUnit(unit.id,unit.tileId,unit.icon,'units');
            }
        });
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
    // $("#u"+unitId).attr("src", gridItem.children[0].src.replace("/sunits/", "/units/"));
    showUnit(selectedUnit.id,selectedUnit.tileId,selectedUnit.icon,'units');
    $('#unitInfos').empty();
    // showTileInfos(selectedUnit.tileId,false);
    cursorSwitch('.','grid-item','pointer');
    selectedUnit = [];
};
