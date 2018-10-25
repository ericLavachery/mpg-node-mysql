// Click MAP : Select unit or move selected unit to that tile
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
                selectedUnit.id = unitId;
                selectedUnit.pic = gridItem.children[0].alt;
                selectedUnit.tileId = tileId;
                selectedUnit.x = world[tileId-1].x;
                selectedUnit.y = world[tileId-1].y;
                // unmark all units (from pseudo)
                pop.forEach(function(unit) {
                    if (unit.player === pseudo) {
                        $("#u"+unit.id).attr("src", gridItem.children[0].src.replace("/sunits/", "/units/"));
                    }
                });
                // mark the unit
                $("#"+imgId).attr("src", gridItem.children[0].src.replace("/units/", "/sunits/"));
                // show moves left for each adjacent tiles (in title)
                showMovesLeftOnMouseOver(tileId, unitId);
                showUnitInfos(unitId);
                showTileInfos(tileId,true);
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
