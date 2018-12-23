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
        $('#cadreMap').css("background-color", "#2f372a");
        clearMovesLeft();
        $("#sidebarInfos").hide();
        $("#sidebarCommand").hide();
        $("#sidebarMapEdit").show();
        showMap(world);
        // showVisiblePop(world);
        showAllTerrainTypes();
    }
    expTileDetail = true;
};
$('#viewUnitsButton').click(viewUnits);
function viewUnits() {
    showVisiblePop(world);
};
function showAllTerrainTypes(tileId) {
    $('#terrainTypes').empty();
    // pointer
    $('#terrainTypes').append('<img class="terTypeButtonSel" id="point" src="/static/img/wtiles/pointer.png" title="pointer une case sans rien changer" onclick="pointMap()">');
    // seed
    $('#terrainTypes').append('<img class="terTypeButton" id="tt0" src="/static/img/wtiles/seed.png" title="permuter les images sans changer le terrain" onclick="selectTerrainType(0)">');
    // road
    $('#terrainTypes').append('<img class="terTypeButton" id="togroad" src="/static/img/wtiles/road.png" title="ajouter ou enlever une route" onclick="toggleAddons(`road`)">');
    // river
    $('#terrainTypes').append('<img class="terTypeButton" id="togriver" src="/static/img/wtiles/river.png" title="ajouter ou enlever une rivière" onclick="toggleAddons(`river`)">');
    let terricon = '';
    let sortedTer = _.sortBy(_.sortBy(_.sortBy(_.sortBy(_.sortBy(ter,'name'),'vegetation'),'escarpement'),'innondation'),'tempMax');
    sortedTer.forEach(function(terrain) {
        if (!terrain.name.includes('non vu')) {
            if (terrain.icon != '') {
                terricon = terrain.icon;
            } else {
                terricon = 'def';
            }
            $('#terrainTypes').append('<img class="terTypeButton" id="tt'+terrain.id+'" src="/static/img/wtiles/'+terricon+'.png" title="'+terrain.name+'" onclick="selectTerrainType('+terrain.id+')">');
        }
    });
};
function toggleAddons(addon) {
    cursorSwitch('.','grid-item','copy');
    selTer = [];
    selAddon = addon;
    $('.terTypeButtonSel').addClass('terTypeButton').removeClass('terTypeButtonSel');
    $('#tog'+addon).removeClass('terTypeButton').addClass('terTypeButtonSel');
    $('#terrainDetails').empty();
};
function pointMap() {
    cursorSwitch('.','grid-item','pointer');
    selTer = [];
    selAddon = 'point';
    $('.terTypeButtonSel').addClass('terTypeButton').removeClass('terTypeButtonSel');
    $('#point').removeClass('terTypeButton').addClass('terTypeButtonSel');
    $('#terrainDetails').empty();
};
function selectTerrainType(terrainId) {
    selAddon = '';
    // toggle terrain image on re-click
    let tericon = selTer.icon;
    if (terrainId == selTer.id) {
        if ($('#tt'+terrainId).attr("src").includes('2')) {
            tericon = selTer.icon+3;
        } else if ($('#tt'+terrainId).attr("src").includes('3')) {
            tericon = selTer.icon;
        } else {
            tericon = selTer.icon+2;
        }
        $('#tt'+terrainId).attr("src",'/static/img/wtiles/'+tericon+'.png');
    }
    // select terrain type
    if (terrainId >= 1) {
        cursorSwitch('.','grid-item','copy');
        let terIndex = ter.findIndex((obj => obj.id == terrainId));
        selTer = ter[terIndex];
        $('.terTypeButtonSel').addClass('terTypeButton').removeClass('terTypeButtonSel');
        $('#tt'+selTer.id).removeClass('terTypeButton').addClass('terTypeButtonSel');
        showTerrainInfos(terrainId);
    } else {
        cursorSwitch('.','grid-item','progress');
        selTer = [];
        $('.terTypeButtonSel').addClass('terTypeButton').removeClass('terTypeButtonSel');
        $('#tt0').removeClass('terTypeButton').addClass('terTypeButtonSel');
        $('#terrainDetails').empty();
    }
    if (selectedTile.id >= 1) {
        showTileInfos(selectedTile.id,false,'#tileDetails');
    }
};
function showTerrainInfos(terrainId) {
    $('#terrainDetails').empty();
    let terrainIndex = ter.findIndex((obj => obj.id == terrainId));
    let linkH = 'h4'
    // TYPE TERRAIN
    $('#terrainDetails').append('<span class="blockTitle"><'+linkH+'>'+terName(ter[terrainIndex].name)+'</'+linkH+'></span>');
    // Terrain SPEC
    let spec = terSpec(ter[terrainIndex].name);
    if (spec != '') {
        $('#terrainDetails').append('<span class="paramName">Type</span><span class="paramValue">'+spec+'</span><br>');
    }
    // escarpement, végétation, innondation
    $('#terrainDetails').append('<span class="paramName">Escarpement</span><span class="paramValue">'+ter[terrainIndex].escarpement+'</span><br>');
    $('#terrainDetails').append('<span class="paramName">Végétation</span><span class="paramValue">'+ter[terrainIndex].vegetation+'</span><br>');
    $('#terrainDetails').append('<span class="paramName">Innondation</span><span class="paramValue">'+ter[terrainIndex].innondation+'</span><br>');
};
function mapEdit(tileId) {
    let nextkur = 'pointer';
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    selectedTile = world[tileIndex];
    // console.log(selectedTile);
    if (selAddon == '') {
        if (selTer.id >= 1) {
            nextkur = 'copy';
            if (selectedTile.terrainId == selTer.id) {
                toggleTilePic(tileId);
            } else {
                world[tileIndex].terrainId = selTer.id;
                selectedTile.terrainId = selTer.id;
                emitSingleWorldChange(tileId,'terrainId',selTer.id);
            }
        } else {
            nextkur = 'progress';
            toggleTilePic(tileId);
        }
    } else if (selAddon != 'point') {
        nextkur = 'copy';
        if (!selectedTile.flags.includes(selAddon+'_')) {
            world[tileIndex].flags = selectedTile.flags+selAddon+'_';
            selectedTile.flags = selectedTile.flags+selAddon+'_';
            emitSingleWorldChange(tileId,'flags',selectedTile.flags);
        } else {
            world[tileIndex].flags = selectedTile.flags.replace(selAddon+'_','');
            selectedTile.flags = selectedTile.flags.replace(selAddon+'_','');
            emitSingleWorldChange(tileId,'flags',selectedTile.flags);
        }
    }
    showTileInfos(selectedTile.id,false,'#tileDetails');
    if (selAddon != 'point') {
        showMap(world);
        cursorSwitch('.','grid-item',nextkur);
    }
};
function toggleTilePic(tileId) {
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    if (selectedTile.seed == 'a') {
        world[tileIndex].seed = 'b';
        selectedTile.seed = 'b';
        emitSingleWorldChange(tileId,'seed','b');
    } else if (selectedTile.seed == 'b') {
        world[tileIndex].seed = 'c';
        selectedTile.seed = 'c';
        emitSingleWorldChange(tileId,'seed','c');
    } else if (selectedTile.seed == 'c') {
        world[tileIndex].seed = 'a';
        selectedTile.seed = 'a';
        emitSingleWorldChange(tileId,'seed','a');
        // si 2 versions du même terrain, inclus les 2 dans le cycle
        let terIndex = ter.findIndex((obj => obj.id == selectedTile.terrainId));
        clicTer = ter[terIndex];
        if (clicTer.name.includes('(1)')) {
            let otherTileName = clicTer.name.replace("(1)","(2)");
            let otherTerIndex = ter.findIndex((obj => obj.name == otherTileName));
            clicTer = ter[otherTerIndex];
            world[tileIndex].terrainId = clicTer.id;
            selectedTile.terrainId = clicTer.id;
            emitSingleWorldChange(tileId,'terrainId',clicTer.id);
        } else if (clicTer.name.includes('(2)')) {
            let otherTileName = clicTer.name.replace("(2)","(1)");
            let otherTerIndex = ter.findIndex((obj => obj.name == otherTileName));
            clicTer = ter[otherTerIndex];
            world[tileIndex].terrainId = clicTer.id;
            selectedTile.terrainId = clicTer.id;
            emitSingleWorldChange(tileId,'terrainId',clicTer.id);
        }
        if (selTer.id >= 1) {
            selTer = clicTer;
        }
    }
};
