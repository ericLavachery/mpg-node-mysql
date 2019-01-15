let numHTiles = 15; // default 15
let numVTiles = 9; // default 9
let xOffset = Number(new URLSearchParams(document.location.search).get("x"));
if (xOffset == null) {xOffset = 0;}
let yOffset = Number(new URLSearchParams(document.location.search).get("y"));
if (yOffset == null) {yOffset = 0;}
let pop = [];
let world = [];
let ter = [];
let ress = [];
let unhiddenTiles = [];
let perso = {};
let mygroups = [];
let myTracks = [];
let trackedTiles = '';
let selectedUnit = [];
let selectedTrack = [];
let selectedTile = [];
let selTer = [];
let selAddon = 'point';
let selCity = '';
let mapEditTemp = -1;
let mode = 'inspect';
let uvp = ''; // unit view priority
let showTracks = false;
let expSquadDetail = false;
let expTileDetail = false;
let exploMLfactor = 1; // explo move loss = moveCost*exploMLfactor
let maxMoveCost = 240; // 180 default
let baseMoveCost = 40; // moveCost is x baseMoveCost /30
let viewOutPerc = 0; // % qu'un tile soit perdu de vue en passant au jour suivant (defaut 5 / dev 0)

$(document).keypress(function(e) {
    if (e.which == 32) {
        toggleMode();
    } else if (e.which == 53 || e.which == 233) {
        gmoveMode();
    } else if (e.which == 178) {
        inspectMode();
    } else if (e.which == 0 || e.which == 38) {
        smoveMode();
    }
    // alert('You pressed '+e.which);
});

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
    if (!window.location.href.includes('/edit')) {
        defineUnhiddenTiles();
        hideHidden();
    }
    writeMapStyles();
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
                tertitle = ter[terIndex].name+' ('+tile.seed+') #'+tile.id;
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
function showTile(tileId,tileTerrainId,tileSeed) {
    if ( $('#'+tileId).hasClass('fog') ) {
        $('#'+tileId).removeClass('fog').addClass('ter'+tileTerrainId+tileSeed);
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
    let terrainIndex = ter.findIndex((obj => obj.id == tileTerrainId));
    let tempMax = ter[terrainIndex].tempMax;
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
    if (tileFlags.includes('city_')) {
        townImg = cityImg(tileFlags,'c',tempMax);
        $('#r'+tileId).append('<img src="/static/img/cities/'+townImg+'.png" width="36">');
    } else if (tileFlags.includes('village_')) {
        townImg = cityImg(tileFlags,'v',tempMax);
        $('#r'+tileId).append('<img src="/static/img/cities/'+townImg+'.png" width="36">');
    } else if (tileFlags.includes('road_')) {
        $('#r'+tileId).append('<i class="fas fa-grip-vertical road"></i>');
    }
    let shad = ter[terrainIndex].shad;
    if (shad != '') {
        $('#c'+tileId).addClass(shad);
        $('#r'+tileId).addClass(shad);
    }
};
function cityImg(tileFlags,townType,tempMax) {
    let townImg = '';
    if (tileFlags.includes('orc_')) {
        townImg = 'orc-'+townType;
        if (tempMax < 18) {townImg = townImg+'s';}
    } else if (tileFlags.includes('trog_')) {
        townImg = 'trog-'+townType;
    } else if (tileFlags.includes('barb_')) {
        townImg = 'barb-'+townType;
        if (tempMax < 18) {townImg = townImg+'s';}
    } else if (tileFlags.includes('cult_')) {
        townImg = 'cult-'+townType;
    } else if (tileFlags.includes('desert_')) {
        townImg = 'desert-'+townType;
    } else if (tileFlags.includes('nomad_')) {
        townImg = 'nomad-'+townType;
    } else if (tileFlags.includes('dwarf_')) {
        townImg = 'dwarf-'+townType;
    } else if (tileFlags.includes('gond_')) {
        townImg = 'gond-'+townType;
        if (tempMax < 18) {townImg = townImg+'s';}
    } else if (tileFlags.includes('mahoud_')) {
        townImg = 'mahoud-'+townType;
    } else if (tileFlags.includes('roh_')) {
        townImg = 'roh-'+townType;
        if (tempMax < 18) {townImg = townImg+'s';}
    } else {
        townImg = 'roh-'+townType;
        if (tempMax < 18) {townImg = townImg+'s';}
    }
    return townImg;
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
function yourMapSize() {
    numHTiles = Number(prompt('Nombre de terrains horizontalement (x)',15));
    numVTiles = Number(prompt('Nombre de terrains horizontalement (y)',9));
    writeMapStyles();
    showMap(world);
    showVisiblePop(world);
};
function writeMapStyles() {
    $('#mapStyles').empty();
    $('#mapStyles').append('.grid-container {grid-template-columns:');
    let i = 0;
    while (i < numHTiles) {
        $('#mapStyles').append(' 72px');
        i++;
    }
    $('#mapStyles').append(';grid-template-rows:');
    i = 0;
    while (i < numVTiles) {
        $('#mapStyles').append(' 72px');
        i++;
    }
    $('#mapStyles').append(';}');
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
    if (window.location.href.includes('/edit')) {
        mapeditMode();
    } else {
        inspectMode();
    }
    areaSelector();
    showOccupiedTiles();
});
function showVisiblePop(wmap) {
    wmap.forEach(function(tile) {
        drawTileDefaultUnit(tile.id)
    });
    if (selectedUnit.id >= 1) {
        selectUnit(selectedUnit.id);
    }
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

// Ressources
socket.on('ressload', function(ressources) {
    ress = ressources;
});
