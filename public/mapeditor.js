$('#mapeditButton').click(toggleMapedit);
function toggleMapedit() {
    if (mode == 'mapedit') {
        backToInspectMode();
    } else {
        mapeditMode();
    }
    expTileDetail = true;
};
function mapeditMode() {
    mode = 'mapedit';
    document.title = 'Map Editor';
    cursorSwitch('.','grid-item','pointer');
    $('#mapeditButton').addClass('boutonVert');
    $('#inspectButton').removeClass('boutonVert');
    $('#gmoveButton').removeClass('boutonVert');
    $('#smoveButton').removeClass('boutonVert');
    $('#cadreMap').css("background-color", "#2f372a");
    clearMovesLeft();
    $("#sidebarInfos").hide();
    $("#sidebarCommand").hide();
    $(".edonly").show();
    showMap(world);
    tempSelector();
    terrainTypesSelector();
    areaSelector();
};
function backToInspectMode() {
    $("#sidebarInfos").show();
    $("#sidebarCommand").show();
    $(".edonly").hide();
    inspectMode();
    showMap(world);
    showVisiblePop(world);
    loadGroups(pop);
    inspectMode();
};
$('#viewUnitsButton').click(viewUnits);
function viewUnits() {
    showVisiblePop(world);
};
function areaSelector() {
    let drop = '#areaDropdown';
    let klas = ' class="modeButtons"';
    let klim = 'Climat ';
    if (mode == 'mapedit') {
        drop = '#areaDropdownME';
        klas = '';
        klim = '';
    }
    $(drop).empty();
    $(drop).append('<select'+klas+' name="areaX" id="areaDropX" title="Région (N-S)" onchange="areaXSelect(this);"><option value="0">&nbsp;N-S (x)</option></select>');
    let i = 0;
    while (i < 150) {
        if (i == xOffset) {
            $('#areaDropX').append('<option value="'+i+'" selected>&nbsp;'+i+'</option>');
        } else {
            $('#areaDropX').append('<option value="'+i+'">&nbsp;'+i+'</option>');
        }
        if (i < xOffset && i+7 > xOffset) {
            $('#areaDropX').append('<option value="'+xOffset+'" selected>&nbsp;'+xOffset+'</option>');
        }
        i = i+7;
        if (i >= 150) {break;}
    }
    $(drop).append('<br><select'+klas+' name="areaY" id="areaDropY" title="Région (O-E)" onchange="areaYSelect(this);"><option value="0">&nbsp;O-E (y)</option></select>');
    i = 0;
    while (i < 120) {
        if (i == yOffset) {
            $('#areaDropY').append('<option value="'+i+'" selected>&nbsp;'+i+'</option>');
        } else {
            $('#areaDropY').append('<option value="'+i+'">&nbsp;'+i+'</option>');
        }
        if (i < yOffset && i+13 > yOffset) {
            $('#areaDropY').append('<option value="'+yOffset+'" selected>&nbsp;'+yOffset+'</option>');
        }
        i = i+13;
        if (i >= 120) {break;}
    }
    if (xOffset >= 126) {
        $(drop).append('<br><div class="klim">'+klim+'Tropical</div>');
    } else if (xOffset >= 105) {
        $(drop).append('<br><div class="klim">'+klim+'Subtropical</div>');
    } else if (xOffset >= 70) {
        $(drop).append('<br><div class="klim">'+klim+'Tempéré chaud</div>');
    } else if (xOffset >= 35) {
        $(drop).append('<br><div class="klim">'+klim+'Tempéré froid</div>');
    } else if (xOffset >= 14) {
        $(drop).append('<br><div class="klim">'+klim+'Subarctique</div>');
    } else {
        $(drop).append('<br><div class="klim">'+klim+'Polaire</div>');
    }
};
function areaXSelect(x) {
    xOffset = Number(x.value);
    showMap(world);
    if (mode != 'mapedit') {
        showVisiblePop(world);
    }
    areaSelector();
    console.log('x'+xOffset+' y'+yOffset);
};
function areaYSelect(y) {
    yOffset = Number(y.value);
    showMap(world);
    if (mode != 'mapedit') {
        showVisiblePop(world);
    }
    areaSelector();
    console.log('x'+xOffset+' y'+yOffset);
};
function areaMove(direction) {
    let x = 0;
    let y = 0;
    switch(direction) {
        case 'n':
        x = Number(xOffset)-3;
        if (x < 0) {
            x = 0;
        }
        y = Number(yOffset);
        break;
        case 's':
        x = Number(xOffset)+3;
        if (x > 147) {
            x = 147;
        }
        y = Number(yOffset);
        break;
        case 'e':
        y = Number(yOffset)+3;
        if (y > 117) {
            y = 117;
        }
        x = Number(xOffset);
        break;
        case 'w':
        y = Number(yOffset)-3;
        if (y < 0) {
            y = 0;
        }
        x = Number(xOffset);
        break;
    }
    areaGo(x,y);
};
function areaGo(x,y) {
    xOffset = x;
    yOffset = y;
    let offset = {x:xOffset,y:yOffset};
    perso.prefs.offset = offset;
    emitPlayersChange(perso);
    showMap(world);
    if (mode != 'mapedit') {
        showVisiblePop(world);
    }
    areaSelector();
};
function tempSelector() {
    $('#tempDropdown').empty();
    $('#tempDropdown').append('<select name="temp" id="tempDrop" title="Limiter le choix de terrains en fonction du climat" onchange="tempSelect(this);"><option value="-1">&nbsp;Climats</option><option value="0">&nbsp;Polaire (0)</option><option value="10">&nbsp;Subarctique (10)</option><option value="20">&nbsp;Tempéré froid (20)</option><option value="30">&nbsp;Tempéré chaud (30)</option><option value="40">&nbsp;Subtropical (40)</option><option value="50">&nbsp;Tropical (50)</option><option value="-1">&nbsp;Tous</option></select>');
};
function tempSelect(temp) {
    mapEditTemp = temp.value;
    terrainTypesSelector();
};
function terrainTypesSelector() {
    $('#terrainTypes').empty();
    // pointer
    $('#terrainTypes').append('<img class="terTypeButtonSel" id="point" src="/static/img/wtiles/pointer.png" title="pointer une case sans rien changer" onclick="pointMap()">');
    // seed
    $('#terrainTypes').append('<img class="terTypeButton" id="tt0" src="/static/img/wtiles/seed.png" title="permuter les images sans changer le terrain" onclick="selectTerrainType(0)">');
    // road
    $('#terrainTypes').append('<img class="terTypeButton" id="togroad" src="/static/img/wtiles/road.png" title="ajouter ou enlever une route" onclick="toggleAddons(`road`)">');
    // river
    $('#terrainTypes').append('<img class="terTypeButton" id="togriver" src="/static/img/wtiles/river.png" title="ajouter ou enlever une rivière" onclick="toggleAddons(`river`)">');
    // cities
    $('#terrainTypes').append('<img class="terTypeButton" id="togvillage" src="/static/img/wtiles/village.png" title="ajouter ou enlever un village" onclick="toggleCities(`village_`)">');
    $('#terrainTypes').append('<img class="terTypeButton" id="togcity" src="/static/img/wtiles/city.png" title="ajouter ou enlever une ville" onclick="toggleCities(`city_`)">');
    let terricon = '';
    let filteredTer = ter;
    if (mapEditTemp != -1) {
        filteredTer = _.filter(ter, function(terrain) {
            return (terrain.tempMin <= mapEditTemp && terrain.tempMax >= mapEditTemp);
        });
    }
    let illupop = ''
    let sortedTer = _.sortBy(_.sortBy(_.sortBy(_.sortBy(_.sortBy(filteredTer,'name'),'vegetation'),'escarpement'),'innondation'),'ordre');
    sortedTer.forEach(function(terrain) {
        if (!terrain.name.includes('non vu') && terrain.name != 'rien') {
            if (terrain.icon != '') {
                terricon = terrain.icon;
            } else {
                terricon = 'def';
            }
            if (terrain.illu != '') {
                illupop = '<span><img src="/static/img/biomes/'+terrain.illu+'.jpg" width="600"></span>'
            } else {
                illupop = '';
            }
            $('#terrainTypes').append('<span class="infoBiome"><img class="terTypeButton" id="tt'+terrain.id+'" src="/static/img/wtiles/'+terricon+'.png" title="'+terrain.name+'" onclick="selectTerrainType('+terrain.id+')">'+illupop+'</span>');
        }
    });
};
function toggleAddons(addon) {
    cursorSwitch('.','grid-item','copy');
    selTer = [];
    selAddon = addon;
    selCity = '';
    $('.terTypeButtonSel').addClass('terTypeButton').removeClass('terTypeButtonSel');
    $('#tog'+addon).removeClass('terTypeButton').addClass('terTypeButtonSel');
    $('#terrainDetails').empty();
};
function toggleCities(townType) {
    cursorSwitch('.','grid-item','copy');
    selTer = [];
    selAddon = '';
    selCity = townType;
    $('.terTypeButtonSel').addClass('terTypeButton').removeClass('terTypeButtonSel');
    if (selCity == 'village_') {
        $('#togvillage').removeClass('terTypeButton').addClass('terTypeButtonSel');
    } else {
        $('#togcity').removeClass('terTypeButton').addClass('terTypeButtonSel');
    }
    $('#terrainDetails').empty();
};
function pointMap() {
    cursorSwitch('.','grid-item','pointer');
    selTer = [];
    selAddon = 'point';
    selCity = '';
    $('.terTypeButtonSel').addClass('terTypeButton').removeClass('terTypeButtonSel');
    $('#point').removeClass('terTypeButton').addClass('terTypeButtonSel');
    $('#terrainDetails').empty();
};
function selectTerrainType(terrainId) {
    selAddon = '';
    selCity = '';
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
    $('#terrainDetails').append('<span class="blockTitle infoMapEdit"><'+linkH+'>'+terName(ter[terrainIndex].name)+'</'+linkH+'></span>');
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
    let terIndex = ter.findIndex((obj => obj.id == selectedTile.terrainId));
    let cityFlag = '';
    if (selCity != '') {
        nextkur = 'copy';
        cityFlags = newCityFlag(selectedTile.flags,selCity);
        if (cityFlags.old == '') {
            selectedTile.flags = selectedTile.flags+cityFlags.new;
            emitSingleWorldChange(tileId,'flags',selectedTile.flags);
        } else {
            selectedTile.flags = selectedTile.flags.replace(cityFlags.old,cityFlags.new);
            emitSingleWorldChange(tileId,'flags',selectedTile.flags);
        }
        // console.log(world[tileIndex].flags);
    } else if (selAddon == '') {
        if (selTer.id >= 1) {
            nextkur = 'copy';
            if (selectedTile.terrainId == selTer.id) {
                toggleTilePic(tileId);
            } else {
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
            if (!ter[terIndex].road && selAddon == 'road') {
                // no road here
            } else {
                selectedTile.flags = selectedTile.flags+selAddon+'_';
                emitSingleWorldChange(tileId,'flags',selectedTile.flags);
            }
        } else {
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
function newCityFlag(tileFlags,townType) {
    let cityFlags = {old:'',new:''};
    cityFlags.new = townType;
    if (tileFlags.includes('city_')) {
        cityFlags.old = 'city_';
    } else if (tileFlags.includes('village_')) {
        cityFlags.old = 'village_';
    } else {
        cityFlags.old = '';
    }
    if (cityFlags.old == '') {
        cityFlags.new = townType+'roh_';
    } else {
        if (tileFlags.includes('roh_')) {
            cityFlags.old = cityFlags.old+'roh_';
            cityFlags.new = cityFlags.new+'gond_';
        } else if (tileFlags.includes('gond_')) {
            cityFlags.old = cityFlags.old+'gond_';
            cityFlags.new = cityFlags.new+'barb_';
        } else if (tileFlags.includes('barb_')) {
            cityFlags.old = cityFlags.old+'barb_';
            cityFlags.new = cityFlags.new+'desert_';
        } else if (tileFlags.includes('desert_')) {
            cityFlags.old = cityFlags.old+'desert_';
            cityFlags.new = cityFlags.new+'nomad_';
        } else if (tileFlags.includes('nomad_')) {
            cityFlags.old = cityFlags.old+'nomad_';
            cityFlags.new = cityFlags.new+'mahoud_';
        } else if (tileFlags.includes('mahoud_')) {
            cityFlags.old = cityFlags.old+'mahoud_';
            cityFlags.new = cityFlags.new+'dwarf_';
        } else if (tileFlags.includes('dwarf_')) {
            cityFlags.old = cityFlags.old+'dwarf_';
            cityFlags.new = cityFlags.new+'orc_';
        } else if (tileFlags.includes('orc_')) {
            cityFlags.old = cityFlags.old+'orc_';
            cityFlags.new = cityFlags.new+'trog_';
        } else if (tileFlags.includes('trog_')) {
            cityFlags.old = cityFlags.old+'trog_';
            cityFlags.new = cityFlags.new+'cult_';
        } else if (tileFlags.includes('cult_')) {
            cityFlags.old = cityFlags.old+'cult_';
            cityFlags.new = '';
        }
    }
    return cityFlags;
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
