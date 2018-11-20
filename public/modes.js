$('#gmoveButton').click(gmoveMode);
function gmoveMode() {
    mode = 'g_move';
    $('#gmoveButton').empty().append('<i class="fas fa-check-circle"></i>&nbsp; Groupe &nbsp;<i class="fas fa-check-circle"></i>');
    $('#smoveButton').empty().append('Solo');
    $('#inspectButton').empty().append('Inspecter');
    $('#zone_map').css("background-color", "#a4a700");
    if (selectedUnit.id >= 1) {
        cursorSwitch('.','grid-item','stop');
        showMovesLeft(selectedUnit.tileId,selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
        showTileUnitList(selectedUnit.tileId);
    } else {
        cursorSwitch('.','grid-item','pointer');
    }
};
$('#smoveButton').click(smoveMode);
function smoveMode() {
    mode = 's_move';
    cursorSwitch('.','grid-item','stop');
    $('#gmoveButton').empty().append('Groupe');
    $('#smoveButton').empty().append('<i class="fas fa-check-circle"></i>&nbsp; Solo &nbsp;<i class="fas fa-check-circle"></i>');
    $('#inspectButton').empty().append('Inspecter');
    $('#zone_map').css("background-color", "#323232");
    if (selectedUnit.id >= 1) {
        cursorSwitch('.','grid-item','stop');
        showMovesLeft(selectedUnit.tileId,selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
        showTileUnitList(selectedUnit.tileId);
    } else {
        cursorSwitch('.','grid-item','pointer');
    }
};
$('#inspectButton').click(inspectMode);
function inspectMode() {
    mode = 'inspect';
    cursorSwitch('.','grid-item','insp');
    $('#smoveButton').empty().append('Solo');
    $('#gmoveButton').empty().append('Groupe');
    $('#inspectButton').empty().append('<i class="fas fa-check-circle"></i>&nbsp; Inspecter &nbsp;<i class="fas fa-check-circle"></i>');
    $('#zone_map').css("background-color", "#338e8b");
    if (selectedUnit.id >= 1) {
        showMovesLeft(selectedUnit.tileId,selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
        showTileUnitList(selectedUnit.tileId);
    }
    clearMovesLeft();
};
