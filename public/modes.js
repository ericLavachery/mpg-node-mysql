$('#moveButton').click(moveMode);
function moveMode() {
    mode = 'move';
    cursorSwitch('.','grid-item','move');
    $('#moveButton').empty().append('||&nbsp; Move &nbsp;||');
    $('#freeButton').empty().append('Free');
    $('#attackButton').empty().append('Attack');
    $('#zone_map').css("background-color", "#a4a700");
    if (selectedUnit.id >= 1) {
        showMovesLeft(selectedUnit.tileId,selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
    }
};
$('#freeButton').click(freeMode);
function freeMode() {
    mode = 'free';
    cursorSwitch('.','grid-item','pointer');
    $('#moveButton').empty().append('Move');
    $('#freeButton').empty().append('||&nbsp; Free &nbsp;||');
    $('#attackButton').empty().append('Attack');
    $('#zone_map').css("background-color", "#323232");
    if (selectedUnit.id >= 1) {
        showMovesLeft(selectedUnit.tileId,selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
    }
};
$('#attackButton').click(attackMode);
function attackMode() {
    mode = 'attack';
    cursorSwitch('.','grid-item','sword');
    $('#freeButton').empty().append('Free');
    $('#moveButton').empty().append('Move');
    $('#attackButton').empty().append('||&nbsp; Attack &nbsp;||');
    $('#zone_map').css("background-color", "#c40000");
    if (selectedUnit.id >= 1) {
        showMovesLeft(selectedUnit.tileId,selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
    }
};
