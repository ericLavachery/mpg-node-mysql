let numHTiles = 15;
let numVTiles = 9;
let xOffset = 0;
let yOffset = 0;

let pop = [];
let world = [];
let ter = [];
let perso = {};
let mygroups = [];
let selectedUnit = [];
let mode = 'inspect';
let uvp = ''; // unit view priority

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
    let visiMap = _.filter(wmap, function(tile) {
        return (tile.x >= minX && tile.x <= maxX && tile.y >= minY && tile.y <= maxY);
    });
    let sortedVisMap = _.sortBy(_.sortBy(visiMap,'y'),'x');
    sortedVisMap.forEach(function(tile) {
        if (perso.mapView.includes(tile.id)) {
            $('#zone_map').append('<div id="'+tile.id+'" class="grid-item ter'+tile.terrainId+'" onclick="selectOrMove('+tile.id+')" title=""><span class="mapNote" id="r'+tile.id+'"></span><span class="bigIcon" id="b'+tile.id+'"></span><span class="mapNote" id="c'+tile.id+'"></span><br><span class="smallIcons" id="s'+tile.id+'"></span><br></div>');
            showTileTags(tile.id);
        } else {
            $('#zone_map').append('<div id="'+tile.id+'" class="grid-item fog" onclick="selectOrMove('+tile.id+')" title=""><span class="bigIcon" id="b'+tile.id+'"></span><br><span class="smallIcons" id="s'+tile.id+'"></span><br></div>');
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
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let tileFlags = world[tileIndex].flags;
    if (perso.mapCarto.includes(tileId)) {
        $('#c'+tileId).append('<i class="far fa-map karto"></i>');
    }
    if (tileFlags.includes('river_')) {
        $('#r'+tileId).append('<i class="fas fa-water river"></i>');
    }
    if (tileFlags.includes('road_')) {
        $('#r'+tileId).append('<i class="fas fa-grip-vertical road"></i>');
    }
};
// infos terrains
socket.on('terload', function(wter) {
    ter = wter;
    writeTerStyles(wter);
});
// write 1 class per terrain type to CSS
function writeTerStyles(wter) {
    let bg = '';
    $('#terStyles').empty();
    wter.forEach(function(terrain) {
        if (terrain.icon != '') {
            bg = ' background-image: url(/static/img/tiles/'+terrain.icon+'.png);';
        } else {
            bg = '';
        }
        $('#terStyles').append('.ter'+terrain.id+' {background-color: '+terrain.color+';'+bg+'}');
    });
};

// infos persos
socket.on('persoload', function(wperso) {
    perso = wperso;
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

// Tracks
socket.on('tracksload', function(tracks) {
    myTracks = tracks;
});
