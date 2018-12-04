function showTracksList(tileId) {
    $('#tracksList').empty();
    if (showTracks) {
        $('#tracksList').append('<span class="blockTitle"><h3>Itinéraires</h3>&nbsp; <span class="detailIcons klik" id="trackViewButton"><i class="fas fa-arrows-alt-v jaune" onclick="toggleTracksView()"></i></span></span>');
    } else {
        $('#tracksList').append('<span class="blockTitle"><h3>Itinéraires</h3>&nbsp; <span class="detailIcons klik" id="trackViewButton"><i class="fas fa-arrows-alt-v" onclick="toggleTracksView()"></i></span></span>');
    }
    $('#tracksList').append('<br>');
    let someTracks = false;
    let selectedTrackHere = false;
    let trackName = '';
    myTracks.forEach(function(track) {
        if (track.tiles.includes('_'+tileId+'_')) {
            if (!someTracks) {
                someTracks = true;
            }
            trackName = capitalizeFirstLetter(track.name);
            if (track.id == selectedTrack.id) {
                $('#tracksList').append('<a href="#" onclick="toggleSelectTrack('+track.id+')"><span class="tracksList jaune">'+trackName+'</span></a><br><span class="trackFL jaune">'+track.firstTileName+' - '+track.lastTileName+'</span><br>');
                selectedTrackHere = true;
            } else {
                $('#tracksList').append('<span class="tracksList"><a href="#" onclick="toggleSelectTrack('+track.id+')">'+trackName+'</a></span><br>');
            }
        }
    });
    if (!selectedTrackHere && selectedTrack.id >= 1) {
        $('#tracksList').append('<a href="#" onclick="toggleSelectTrack('+selectedTrack.id+')"><span class="tracksList jaune">( '+capitalizeFirstLetter(selectedTrack.name)+' )</span></a><br><span class="trackFL jaune">'+selectedTrack.firstTileName+' - '+selectedTrack.lastTileName+'</span><br>');
    }
    $('#tracksList').append('<div class="espace"></div>');
    if (selectedTrack.id >= 1 && selectedUnit.id >= 1) {
        if (selectedUnit.tileId == selectedTile.id) {
            trackButtons();
        }
    }
    if (selectedTrack.id >= 1 && selectedUnit.id >= 1) {
        $('#tracksList').append('<div class="espace"></div><span class="note">'+"Pour envoyer un bataillon ou un groupe sur cet itinéraire, faites-le d'abord avancer manuellement dans la direction choisie.</span>"+'<div class="espace"></div>');
    }
    $('#tracksList').append('<span class="paramName"><a href="#" onclick="addTrack('+tileId+')">Nouvel itinéraire</a></span><br>');
};
function trackButtons() {
    if (selectedTrack.tiles.includes('_'+selectedUnit.tileId+'_')) {
        buttonInfos = "Enlever ce terrain ("+selectedTile.terrain+" id "+selectedTile.id+") de l'itinéraire ("+selectedTrack.name+")";
        $('#tracksList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" onclick="trackTileOut('+selectedUnit.tileId+','+selectedTrack.id+')"><i class="fas fa-minus-square"></i></button><span class="butSpace"></span>');
    }
    if (!selectedTrack.tiles.includes('_'+selectedUnit.tileId+'_')) {
        // vérifie si un (et un seul) tile de la track est adjacent
        let numNearTiles = 0;
        let nearTile1 = 0;
        let nearTile2 = 0;
        let addOK = false;
        let unitTileIndex = world.findIndex((obj => obj.id == selectedUnit.tileId));
        let worldAround = _.filter(world, function(tile) {
            return ((tile.x == world[unitTileIndex].x || tile.x == world[unitTileIndex].x-1 || tile.x == world[unitTileIndex].x+1) && (tile.y == world[unitTileIndex].y || tile.y == world[unitTileIndex].y-1 || tile.y == world[unitTileIndex].y+1));
        });
        worldAround.forEach(function(tile) {
            if (selectedTrack.tiles.includes('_'+tile.id+'_') && tile.id != selectedUnit.tileId) {
                numNearTiles = numNearTiles+1;
                if (numNearTiles == 1) {
                    nearTile1 = tile.id;
                } else if (numNearTiles == 2) {
                    nearTile2 = tile.id;
                }
            }
        });
        if (numNearTiles == 1) {addOK = true;}
        // exeption pour une jonction (si les tiles existants ne sont pas adjacents)
        if (numNearTiles == 2 && !isAdjacent(nearTile1, nearTile2)) {
            addOK = true;
        }
        if (addOK) {
            buttonInfos = "Ajouter ce terrain ("+selectedTile.terrain+" id "+selectedTile.id+") à l'itinéraire ("+selectedTrack.name+")";
            $('#tracksList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" onclick="trackTileIn('+selectedUnit.tileId+','+selectedTrack.id+')"><i class="fas fa-plus-square"></i></button><span class="butSpace"></span>');
        }
    }
    if (selectedTrack.tiles.includes('_'+selectedUnit.tileId+'_') && selectedTrack.tiles.includes('_'+selectedUnit.prevTileId+'_')) {
        buttonInfos = "Faire suivre l'itinéraire ("+selectedTrack.name+") par ce bataillon ("+selectedUnit.number+" "+xType(selectedUnit.id)+")";
        let nextTile = findNextTile();
        let theNextTile = '';
        if (nextTile.tileName != '') {
            theNextTile = nextTile.tileName;
        } else {
            theNextTile = nextTile.terrain+' ('+nextTile.id+')';
        }
        $('#tracksList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" onclick="goTo('+selectedUnit.id+','+selectedTrack.id+')"><i class="fas fa-arrow-alt-circle-right"></i> <span class="ibFont">'+theNextTile+'</span></button><span class="butSpace"></span>');
    }
};
function findNextTile() {
    let nextTile = {};
    let unitTileIndex = world.findIndex((obj => obj.id == selectedUnit.tileId));
    let worldAround = _.filter(world, function(tile) {
        return ((tile.x == world[unitTileIndex].x || tile.x == world[unitTileIndex].x-1 || tile.x == world[unitTileIndex].x+1) && (tile.y == world[unitTileIndex].y || tile.y == world[unitTileIndex].y-1 || tile.y == world[unitTileIndex].y+1));
    });
    worldAround.forEach(function(tile) {
        if (selectedTrack.tiles.includes('_'+tile.id+'_') && tile.id != selectedUnit.tileId && tile.id != selectedUnit.prevTileId) {
            nextTile.id = tile.id;
            nextTile.x = tile.x;
            nextTile.y = tile.y;
            nextTile.tileName = tile.tileName;
            nextTile.terrain = tile.terrain;
        }
    });
    return nextTile;
};
function trackTileOut(tileId,trackId) {
    // XXXX changer les firstTile et lastTile
    // si tileId = first ou last : recherche autour de tileId : le tile inclu dans track.tiles est le nouveau
    let trackIndex = myTracks.findIndex((obj => obj.id == trackId));
    let oldTiles = myTracks[trackIndex].tiles;
    let newTiles = oldTiles.replace('_'+tileId+'_','_');
    myTracks[trackIndex].tiles = newTiles;
    showTrackedTiles();
    showTracksList(tileId);
    emitSingleTracksChange(trackId,'tiles',newTiles);
};
function trackTileIn(tileId,trackId) {
    // XXXX changer les firstTile et lastTile
    // recherche autour de tileId : si un des tiles est le first ou last :
    // si il est le seul tile autour : tileId est le nouveau
    // si il y en a un autre : jonction : first et last ne changent pas
    let trackIndex = myTracks.findIndex((obj => obj.id == trackId));
    let oldTiles = myTracks[trackIndex].tiles;
    let newTiles = oldTiles+tileId+'_';
    myTracks[trackIndex].tiles = newTiles;
    showTrackedTiles();
    showTracksList(tileId);
    emitSingleTracksChange(trackId,'tiles',newTiles);
};
function goTo(unitId,trackId) {
    console.log('squad '+unitId+' follows track '+trackId);
};
function addTrack(tileId) {
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let trackName = prompt('Donnez un nom à ce nouvel itinéraire :');
    let depart = prompt('Donnez un nom au point de départ :');
    let destination = prompt('Donnez un nom à la destination :');
    if (trackName != null) {
        if (trackName.length >= 3) {
            let newTrack = {};
            newTrack.player = pseudo;
            newTrack.name = trackName;
            newTrack.tiles = '_'+tileId+'_';
            newTrack.firstTile = tileId;
            newTrack.lastTile = tileId;
            newTrack.firstTileName = depart;
            newTrack.lastTileName = destination;
            // newTrack.firstTileName = world[tileIndex].tileName;
            // newTrack.lastTileName = world[tileIndex].tileName;
            socket.emit('add_track', newTrack);
        }
    }
};
function toggleTracksView() {
    if (showTracks) {
        showTracks = false;
        tracksViewButtonOff();
    } else {
        showTracks = true;
        tracksViewButtonOn();
        selectedTrack = [];
    }
    showTrackedTiles();
    showTracksList(selectedTile.id);
};
function tracksViewButtonOff() {
    $('#trackViewButton').empty().append('<i class="fas fa-arrows-alt-v" onclick="toggleTracksView()"></i>');
};
function tracksViewButtonOn() {
    $('#trackViewButton').empty().append('<i class="fas fa-arrows-alt-v jaune" onclick="toggleTracksView()"></i>');
};
function showTrackedTiles() {
    world.forEach(function(tile) {
        if (trackedTiles.includes('_'+tile.id+'_')) {
            showTileTags(tile.id);
        }
    });
};
function toggleSelectTrack(trackId) {
    let trackIndex = myTracks.findIndex((obj => obj.id == trackId));
    if (selectedTrack.id == trackId) {
        selectedTrack = [];
    } else {
        selectedTrack = myTracks[trackIndex];
        showTracks = false;
        tracksViewButtonOff();
    }
    showTrackedTiles();
    showTracksList(selectedTile.id);
};
