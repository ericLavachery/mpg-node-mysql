$('#mapeditButton').click(mapeditMode);
function mapeditMode() {
    if (mode == 'mapedit') {
        $("#sidebarInfos").show();
        $("#sidebarCommand").show();
        $("#sidebarMapEdit").hide();
        inspectMode();
        showMap(world);
        showVisiblePop(world);
        loadGroups(pop);
        inspectMode();
    } else {
        mode = 'mapedit';
        cursorSwitch('.','grid-item','pointer');
        $('#mapeditButton').addClass('boutonVert');
        $('#inspectButton').removeClass('boutonVert');
        $('#gmoveButton').removeClass('boutonVert');
        $('#smoveButton').removeClass('boutonVert');
        $('#cadreMap').css("background-color", "#533f5d");
        clearMovesLeft();
        $("#sidebarInfos").hide();
        $("#sidebarCommand").hide();
        $("#sidebarMapEdit").show();
        showMap(world);
        showVisiblePop(world);
        loadGroups(pop);
        showAllTerrainTypes();
    }
};
function showAllTerrainTypes(tileId) {
    $('#terrainTypes').empty();
    let sortedTer = _.sortBy(_.sortBy(_.sortBy(ter,'vegetation'),'escarpement'),'innondation');
    sortedTer.forEach(function(terrain) {
        if (terrain.icon != '') {
            $('#terrainTypes').append('<img class="terTypeButton" src="/static/img/wtiles/'+terrain.icon+'.png" title="'+terrain.name+'">');
        } else {
            $('#terrainTypes').append('<img class="terTypeButton" src="/static/img/wtiles/def.png" title="'+terrain.name+'">');
        }
    });
};
function mapEdit(tileId) {

};
