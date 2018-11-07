// Button "ATTACK MODE".
// Once clicked, click again to quit ATTACK MODE.
$('#attackButton').click(attackMode);
function attackMode() {
    if (mode != 'attack') {
        mode = 'attack';
        cursorSwitch('.','grid-item','sword');
        $('#attackButton').empty().append('Quit Attack Mode');
        $('#moveButton').empty().append('Move Mode');
        $('#zone_map').css("background-color", "#c40000");
        if (selectedUnit.id >= 1) {
            showMovesLeft(selectedUnit.tileId,selectedUnit.id);
            showUnitInfos(selectedUnit.id);
            showTileInfos(selectedUnit.tileId,true);
        }
    } else {
        mode = 'free';
        $('#attackButton').empty().append('Attack Mode');
        $('#moveButton').empty().append('Move Mode');
        $('#zone_map').css("background-color", "#323232");
        if (selectedUnit.id >= 1) {
            showMovesLeft(selectedUnit.tileId,selectedUnit.id);
            showUnitInfos(selectedUnit.id);
            showTileInfos(selectedUnit.tileId,true);
        }
        cursorSwitch('.','grid-item','pointer');
    }
}
