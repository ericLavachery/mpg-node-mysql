// Button "ATTACK MODE".
// Once clicked, click again to quit ATTACK MODE.
$('#attackButton').click(attackMode);
function attackMode() {
    if (mode != 'attack') {
        mode = 'attack';
        $('#attackButton').empty().append('Quit Attack Mode');
        $('#moveButton').empty().append('Move Mode');
        $('#zone_map').css("background-color", "#a72b2b");
        if (selectedUnit.id >= 1) {
            showUnitInfos(selectedUnit.id);
            showTileInfos(selectedUnit.tileId,true);
        }
    } else {
        mode = 'free';
        $('#attackButton').empty().append('Attack Mode');
        $('#moveButton').empty().append('Move Mode');
        $('#zone_map').css("background-color", "#DDDDDD");
        if (selectedUnit.id >= 1) {
            showUnitInfos(selectedUnit.id);
            showTileInfos(selectedUnit.tileId,true);
        }
    }
}
