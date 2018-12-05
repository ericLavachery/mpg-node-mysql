$('#gmoveButton').click(gmoveMode);
function gmoveMode() {
    mode = 'g_move';
    $('#gmoveButton').addClass('boutonVert');
    $('#smoveButton').removeClass('boutonVert');
    $('#inspectButton').removeClass('boutonVert');
    // $('#gmoveButton').empty().append('Groupe');
    // $('#smoveButton').empty().append('Solo');
    // $('#inspectButton').empty().append('Inspecter');
    $('#cadreMap').css("background-color", "#a4a700");
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
    $('#smoveButton').addClass('boutonVert');
    $('#gmoveButton').removeClass('boutonVert');
    $('#inspectButton').removeClass('boutonVert');
    // $('#gmoveButton').empty().append('Groupe');
    // $('#smoveButton').empty().append('Solo');
    // $('#inspectButton').empty().append('Inspecter');
    $('#cadreMap').css("background-color", "#346c6c");
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
    $('#inspectButton').addClass('boutonVert');
    $('#gmoveButton').removeClass('boutonVert');
    $('#smoveButton').removeClass('boutonVert');
    // $('#smoveButton').empty().append('Solo &nbsp;<i class="fas fa-shoe-prints"></i>');
    // $('#gmoveButton').empty().append('Groupe &nbsp;<i class="fas fa-shoe-prints"></i><i class="fas fa-shoe-prints"></i>');
    // $('#inspectButton').empty().append('Inspecter &nbsp;<i class="fas fa-search"></i>');
    $('#cadreMap').css("background-color", "#2f372a");
    if (selectedUnit.id >= 1) {
        showMovesLeft(selectedUnit.tileId,selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
        showTileUnitList(selectedUnit.tileId);
    }
    clearMovesLeft();
};
