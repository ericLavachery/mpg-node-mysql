// Click MAP
function selectOrMove(gridItem) {
    let tileId = gridItem.id;
    let unitId = 0;
    let imgId = 0;
    // Is there a unit on the tile?
    if (Object.keys(gridItem.children).length >= 1) {
        unitId = gridItem.children[0].id.substring(1);
        imgId = gridItem.children[0].id;
        unitOwner = pop[unitId-1].player;
    }
    if (unitId >= 1) { // there is a unit
        if (selectedUnit.id === unitId) { // unit already selected => unselect
            selectedUnit = {
                id: '',
                pic: '',
                tileId: '',
                x: '',
                y: ''
            };
            $("#"+imgId).attr("src", gridItem.children[0].src.replace("/sunits/", "/units/"));
            $('#unitInfos').empty();
            showTileInfos(tileId,false);
        } else { // unit not selected
            if (unitOwner === pseudo) { // select the unit
                // selectedUnit.id = unitId;
                // selectedUnit.pic = gridItem.children[0].alt;
                // selectedUnit.tileId = tileId;
                // selectedUnit.x = world[tileId-1].x;
                // selectedUnit.y = world[tileId-1].y;
                // // unmark all units (from pseudo)
                // pop.forEach(function(unit) {
                //     if (unit.player === pseudo) {
                //         $("#u"+unit.id).attr("src", gridItem.children[0].src.replace("/sunits/", "/units/"));
                //     }
                // });
                // // mark the unit
                // $("#"+imgId).attr("src", gridItem.children[0].src.replace("/units/", "/sunits/"));
                // // show moves left for each adjacent tiles (in title)
                // showMovesLeftOnMouseOver(tileId, unitId);
                // showUnitInfos(unitId);
                // showTileInfos(tileId,true);
                selectUnit(unitId);
            } else {
                showUnitInfos(unitId);
                showTileInfos(tileId,true);
            }
        }
    } else { // there is no unit
        showTileInfos(tileId,false);
        if (selectedUnit.id !== '') { // there is a selected unit => move it here
            moveUnit(tileId);
        }
    }
};
function selectUnitFromTileInfoList(listItem) {
    let unitSelectedFromListId = listItem.id.substring(14);
    selectUnit(unitSelectedFromListId);
};
function selectUnit(unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    selectedUnit.id = unitId;
    selectedUnit.pic = pop[unitIndex].pic;
    selectedUnit.tileId = pop[unitIndex].tileId;
    let tileIndex = world.findIndex((obj => obj.id == selectedUnit.tileId));
    selectedUnit.x = world[tileIndex].x;
    selectedUnit.y = world[tileIndex].y;
    // unmark all units (from pseudo)
    pop.forEach(function(unit) {
        if (unit.player === pseudo) {
            if (Object.keys(unit.tileId).length >= 1) {
                $("#u"+unit.id).attr('src', $("#u"+unit.id).attr('src').replace('/sunits/', '/units/'));
            }
        }
    });
    // mark the unit
    if (Object.keys(selectedUnit.tileId).length >= 1) {
        $("#u"+unitId).attr('src', $("#u"+unitId).attr('src').replace('/units/', '/sunits/'));
    } else {
        showUnit(selectedUnit.id,selectedUnit.tileId,selectedUnit.pic,'sunits');
    }
    // show moves left for each adjacent tiles (in title)
    showMovesLeftOnMouseOver(selectedUnit.tileId, unitId);
    showUnitInfos(unitId);
    showTileInfos(selectedUnit.tileId,true);
}
