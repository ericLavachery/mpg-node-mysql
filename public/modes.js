$('#gmoveButton').click(gmoveMode);
function gmoveMode() {
    mode = 'g_move';
    cursorSwitch('.','grid-item','pointer');
    $('#gmoveButton').empty().append('||&nbsp; Group Move &nbsp;||');
    $('#smoveButton').empty().append('Single Move');
    $('#inspectButton').empty().append('Inspect');
    $('#zone_map').css("background-color", "#a4a700");
    if (selectedUnit.id >= 1) {
        showMovesLeft(selectedUnit.tileId,selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
    }
};
$('#smoveButton').click(smoveMode);
function smoveMode() {
    mode = 's_move';
    cursorSwitch('.','grid-item','pointer');
    $('#gmoveButton').empty().append('Group Move');
    $('#smoveButton').empty().append('||&nbsp; Single Move &nbsp;||');
    $('#inspectButton').empty().append('Inspect');
    $('#zone_map').css("background-color", "#323232");
    if (selectedUnit.id >= 1) {
        showMovesLeft(selectedUnit.tileId,selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
    }
};
$('#inspectButton').click(inspectMode);
function inspectMode() {
    mode = 'inspect';
    cursorSwitch('.','grid-item','insp');
    $('#smoveButton').empty().append('Single Move');
    $('#gmoveButton').empty().append('Group Move');
    $('#inspectButton').empty().append('||&nbsp; Inspect &nbsp;||');
    $('#zone_map').css("background-color", "#338e8b");
    if (selectedUnit.id >= 1) {
        showMovesLeft(selectedUnit.tileId,selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
    }
};
