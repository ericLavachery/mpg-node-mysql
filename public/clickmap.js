// Click MAP
function selectOrMove(gridItem) {
    let tileId = gridItem.id;
    let unitId = 0;
    // Is there a unit on the tile?
    if (Object.keys(gridItem.children).length >= 1) {
        unitId = gridItem.children[0].id.substring(1);
        let unitIndex = pop.findIndex((obj => obj.id == unitId));
        unitOwner = pop[unitIndex].player;
    }
    if (unitId >= 1) { // there is a unit
        if (selectedUnit.id == unitId) { // unit already selected => unselect
            selectedUnit = [];
            $("#u"+unitId).attr("src", gridItem.children[0].src.replace("/sunits/", "/units/"));
            $('#unitInfos').empty();
            showTileInfos(tileId,false);
        } else { // unit not selected
            if (unitOwner == pseudo) {
                if (mode == 'move' && selectedUnit.id >= 1) { // move the unit here
                    moveHere(tileId);
                } else { // select this unit
                    selectUnit(unitId);
                }
            } else {
                showUnitInfos(unitId);
                showTileInfos(tileId,true);
            }
        }
    } else { // there is no unit
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
                showUnit(unit.id,unit.tileId,unit.pic,'units');
            }
        });
        // mark the unit
        showUnit(selectedUnit.id,selectedUnit.tileId,selectedUnit.pic,'sunits');
        // show moves left for each adjacent tiles (in title)
        showMovesLeftOnMouseOver(selectedUnit.tileId, unitId);
        showUnitInfos(unitId);
        showTileInfos(selectedUnit.tileId,true);
    } else {
        showUnitInfos(unitId);
    }
}
