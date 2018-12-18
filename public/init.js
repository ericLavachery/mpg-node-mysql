let numHTiles = 15;
let numVTiles = 9;
let xOffset = 0;
let yOffset = 0;
let pop = [];
let world = [];
let ter = [];
let perso = {};
let mygroups = [];
let myTracks = [];
let trackedTiles = '';
let selectedUnit = [];
let selectedTrack = [];
let selectedTile = [];
let selTer = [];
let mode = 'inspect';
let uvp = ''; // unit view priority
let showTracks = false;
let expSquadDetail = false;
let expTileDetail = false;

// Tracks
socket.on('tracksload', function(tracks) {
    myTracks = tracks;
    myTracks.forEach(function(track) {
        trackedTiles = trackedTiles+track.tiles;
    });
});
// Quand on reçoit la carte, on l'insère dans la page
socket.on('mapload', function(wmap) {
    world = wmap;
    showMap(wmap);
});
// Dessine la carte
function showMap(wmap) {
    // reset
    document.getElementById("zone_map").innerHTML = '';
    // fill
    let minX = xOffset+1;
    let maxX = xOffset+numVTiles;
    let minY = yOffset+1;
    let maxY = yOffset+numHTiles;
    let visMap = _.filter(wmap, function(tile) {
        return (tile.x >= minX && tile.x <= maxX && tile.y >= minY && tile.y <= maxY);
    });
    let sortedVisMap = _.sortBy(_.sortBy(visMap,'y'),'x');
    let terclass = '';
    let tertitle = '';
    sortedVisMap.forEach(function(tile) {
        if (perso.mapView.includes(tile.id) || mode == 'mapedit') {
            terclass = 'ter'+tile.terrainId+tile.seed;
            if (mode == 'mapedit') {
                let terIndex = ter.findIndex((obj => obj.id == tile.terrainId));
                tertitle = ter[terIndex].name+' #'+tile.id;
            } else {
                tertitle = '#'+tile.id;
            }
            $('#zone_map').append('<div id="'+tile.id+'" class="grid-item '+terclass+'" onclick="selectOrMove('+tile.id+')" title="'+tertitle+'"><span class="mapNote" id="r'+tile.id+'"></span><span class="bigIcon" id="b'+tile.id+'"></span><span class="mapNote" id="c'+tile.id+'"></span><br><span class="smallIcons" id="s'+tile.id+'"></span><br></div>');
            showTileTags(tile.id);
        } else {
            $('#zone_map').append('<div id="'+tile.id+'" class="grid-item fog" onclick="selectOrMove('+tile.id+')" title="#'+tile.id+'"><span class="bigIcon" id="b'+tile.id+'"></span><br><span class="smallIcons" id="s'+tile.id+'"></span><br></div>');
        }
    });
};
function showTile(tileId,tileTerrainId) {
    if ( $('#'+tileId).hasClass('fog') ) {
        $('#'+tileId).removeClass('fog').addClass('ter'+tileTerrainId);
    }
    $('#'+tileId).empty().append('<span class="mapNote" id="r'+tileId+'"></span><span class="bigIcon" id="b'+tileId+'"></span><span class="mapNote" id="c'+tileId+'"></span><br><span class="smallIcons" id="s'+tileId+'"></span><br>');
    showTileTags(tileId);
};
function showTileTags(tileId) {
    $('#c'+tileId).empty();
    $('#r'+tileId).empty();
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let tileFlags = world[tileIndex].flags;
    let tileTerrainId = world[tileIndex].terrainId;
    if (selectedTrack.id >= 1) {
        if (selectedTrack.tiles.includes('_'+tileId+'_')) {
            $('#c'+tileId).append('<i class="fas fa-arrows-alt-v karto"></i>');
        }
    } else {
        if (showTracks && trackedTiles.includes('_'+tileId+'_')) {
            $('#c'+tileId).append('<i class="fas fa-arrows-alt-v karto"></i>');
        }
    }
    if (perso.mapCarto.includes(tileId)) {
        $('#c'+tileId).append('<i class="far fa-map karto"></i>');
    }
    if (tileFlags.includes('river_')) {
        $('#r'+tileId).append('<i class="fas fa-water river"></i>');
    }
    if (tileFlags.includes('road_')) {
        $('#r'+tileId).append('<i class="fas fa-grip-vertical road"></i>');
    }
    let terrainIndex = ter.findIndex((obj => obj.id == tileTerrainId));
    let shad = ter[terrainIndex].shad;
    $('.road').removeClass('shadg').removeClass('shadw');
    $('.karto').removeClass('shadg').removeClass('shadw');
    if (shad != '') {
        $('.road').addClass(shad);
        $('.karto').addClass(shad);
    }
};
// infos terrains
socket.on('terload', function(wter) {
    ter = wter;
    writeTerStyles(wter);
});
// write 3!! classes per terrain type to CSS
function writeTerStyles(wter) {
    let bg = '';
    let bg2 = '';
    let bg3 = '';
    $('#terStyles').empty();
    wter.forEach(function(terrain) {
        if (terrain.icon != '') {
            bg = ' background-image: url(/static/img/wtiles/'+terrain.icon+'.png);';
            bg2 = ' background-image: url(/static/img/wtiles/'+terrain.icon+'2.png);';
            bg3 = ' background-image: url(/static/img/wtiles/'+terrain.icon+'3.png);';
        } else {
            bg = '';
            bg2 = '';
            bg3 = '';
        }
        $('#terStyles').append('.ter'+terrain.id+'a {background-color: #FFFF00;'+bg+'}');
        $('#terStyles').append('.ter'+terrain.id+'b {background-color: #FFFF00;'+bg2+'}');
        $('#terStyles').append('.ter'+terrain.id+'c {background-color: #FFFF00;'+bg3+'}');
    });
};

// infos persos
socket.on('persoload', function(wperso) {
    perso = wperso;
    if (perso.prefs.includes('_detu_')) {
        expSquadDetail = true;
    }
    if (perso.prefs.includes('_dett_')) {
        expTileDetail = true;
    }
    if (perso.bldIdent === null) {
        perso.bldIdent = [];
    }
    if (perso.bldView === null) {
        perso.bldView = [];
    }
    if (perso.unitView === null) {
        perso.unitView = [];
    }
    if (perso.unitIdent === null) {
        perso.unitIdent = [];
    }
    if (perso.mapView === null) {
        perso.mapView = [];
    }
    if (perso.mapCarto === null) {
        perso.mapCarto = [];
    }
    if (perso.exploredTiles === null) {
        perso.exploredTiles = [];
    }
    if (perso.enemies === null) {
        perso.enemies = [];
    }
    if (perso.allies === null) {
        perso.allies = [];
    }
});

// Affichage des unités
socket.on('popload', function(wpop) {
    pop = wpop;
    showVisiblePop(world);
    loadGroups(wpop);
    inspectMode();
});
function showVisiblePop(wmap) {
    wmap.forEach(function(tile) {
        drawTileDefaultUnit(tile.id)
    });
};
// infos groupes
function loadGroups(wpop) {
    let lastTileId = 0;
    let lastGroupNum = 0;
    let lastGroupCreated = 0;
    let newGroup = {};
    let sortedPop = _.sortBy(_.sortBy(wpop,'tileId'),'follow');
    sortedPop.forEach(function(unit) {
        if (unit.follow >= 1 && unit.player === pseudo) {
            if (lastTileId == unit.tileId && lastGroupNum == unit.follow && lastGroupCreated != unit.follow) {
                newGroup = {number: unit.follow, type: 'group'};
                mygroups.push(newGroup);
                lastGroupCreated = unit.follow;
            }
            lastGroupNum = unit.follow;
            lastTileId = unit.tileId;
        }
    });
};
