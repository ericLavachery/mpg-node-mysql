$('#gmoveButton').click(gmoveMode);
function gmoveMode() {
    mode = 'g_move';
    document.title = pseudo + ' - Group Move';
    $("#sidebarMapEdit").hide();
    $('#gmoveButton').addClass('boutonVert');
    $('#smoveButton').removeClass('boutonVert');
    $('#inspectButton').removeClass('boutonVert');
    $('#mapeditButton').removeClass('boutonVert');
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
    document.title = pseudo + ' - Move';
    $("#sidebarMapEdit").hide();
    cursorSwitch('.','grid-item','stop');
    $('#smoveButton').addClass('boutonVert');
    $('#gmoveButton').removeClass('boutonVert');
    $('#inspectButton').removeClass('boutonVert');
    $('#mapeditButton').removeClass('boutonVert');
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
    document.title = pseudo + ' - Inspect';
    $("#sidebarMapEdit").hide();
    cursorSwitch('.','grid-item','insp');
    $('#inspectButton').addClass('boutonVert');
    $('#gmoveButton').removeClass('boutonVert');
    $('#smoveButton').removeClass('boutonVert');
    $('#mapeditButton').removeClass('boutonVert');
    $('#cadreMap').css("background-color", "#2f372a");
    if (selectedUnit.id >= 1) {
        showMovesLeft(selectedUnit.tileId,selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
        showTileUnitList(selectedUnit.tileId);
    }
    clearMovesLeft();
};
function toggleMode() {
    if (mode == 'inspect') {
        gmoveMode();
    } else {
        inspectMode();
    }
};
