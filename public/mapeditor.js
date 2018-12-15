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
        // showVisiblePop(world);
        showAllTerrainTypes();
    }
};
$('#viewUnitsButton').click(viewUnits);
function viewUnits() {
    showVisiblePop(world);
};
function showAllTerrainTypes(tileId) {
    $('#terrainTypes').empty();
    let terricon = '';
    let sortedTer = _.sortBy(_.sortBy(_.sortBy(ter,'vegetation'),'escarpement'),'innondation');
    sortedTer.forEach(function(terrain) {
        if (terrain.icon != '') {
            terricon = terrain.icon;
        } else {
            terricon = 'def';
        }
        $('#terrainTypes').append('<img class="terTypeButton" id="tt'+terrain.id+'" src="/static/img/wtiles/'+terricon+'.png" title="'+terrain.name+'" onclick="selectTerrainType('+terrain.id+')">');
    });
};
function selectTerrainType(terrainId) {
    let terIndex = ter.findIndex((obj => obj.id == terrainId));
    selTer = ter[terIndex];
    $('.terTypeButtonSel').addClass('terTypeButton').removeClass('terTypeButtonSel');
    $('#tt'+selTer.id).removeClass('terTypeButton').addClass('terTypeButtonSel');
};
function mapEdit(tileId) {
    if (selTer.id >= 1) {
        let tileIndex = world.findIndex((obj => obj.id == tileId));
        selectedTile = world[tileIndex];
        // console.log(selectedTile);
        if (selectedTile.terrainId == selTer.id) {
            if (selectedTile.seed == 'a') {
                world[tileIndex].seed = 'b';
                selectedTile.seed = 'b';
                emitSingleWorldChange(tileId,'seed','b');
            } else if (selectedTile.seed == 'b') {
                world[tileIndex].seed = 'c';
                selectedTile.seed = 'c';
                emitSingleWorldChange(tileId,'seed','c');
            } else {
                world[tileIndex].seed = 'a';
                selectedTile.seed = 'a';
                emitSingleWorldChange(tileId,'seed','a');
            }
        } else {
            world[tileIndex].terrainId = selTer.id;
            selectedTile.terrainId = selTer.id;
            emitSingleWorldChange(tileId,'terrainId',selTer.id);
        }
        showMap(world);
        // showVisiblePop(world);
    }
};
