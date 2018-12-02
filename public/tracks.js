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
                $('#tracksList').append('<a href="#" onclick="toggleSelectTrack('+track.id+')"><span class="paramName jaune">'+trackName+'</span></a><br><span class="trackFL jaune">'+track.firstTileName+' - '+track.lastTileName+'</span><br>');
                selectedTrackHere = true;
            } else {
                $('#tracksList').append('<span class="paramName"><a href="#" onclick="toggleSelectTrack('+track.id+')">'+trackName+'</a></span><br>');
            }
        }
    });
    if (!selectedTrackHere && selectedTrack.id >= 1) {
        $('#tracksList').append('<a href="#" onclick="toggleSelectTrack('+selectedTrack.id+')"><span class="paramName jaune">( '+capitalizeFirstLetter(selectedTrack.name)+' )</span></a><br><span class="trackFL jaune">'+selectedTrack.firstTileName+' - '+selectedTrack.lastTileName+'</span><br>');
    }
    $('#tracksList').append('<span class="paramName"><a href="#" onclick="addTrack('+tileId+')">Nouvel itinéraire</a></span><br>');
    $('#tracksList').append('<div class="espace"></div>');
    if (selectedTrack.id >= 1 && selectedUnit.id >= 1) {
        trackButtons();
    }
};
function trackButtons() {
    if (selectedTrack.firstTile == selectedUnit.tileId || selectedTrack.lastTile == selectedUnit.tileId) {
        buttonInfos = "Enlever ce terrain de l'itinéraire";
        $('#tracksList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="addToTrack"><i class="fas fa-minus-square"></i></button><span class="butSpace"></span>');
    }
    if (isAdjacent(selectedTrack.firstTile,selectedUnit.tileId) || isAdjacent(selectedTrack.lastTile,selectedUnit.tileId)) {
        if (!selectedTrack.tiles.includes('_'+selectedUnit.tileId+'_')) {
            buttonInfos = "Ajouter ce terrain à l'itinéraire";
            $('#tracksList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="addToTrack"><i class="fas fa-plus-square"></i></button><span class="butSpace"></span>');
        }
    }
    if (selectedUnit.id >= 1 && selectedTrack.tiles.includes('_'+selectedUnit.tileId+'_')) {
        buttonInfos = "Envoyer ce bataillon vers le début de l'itinéraire";
        $('#tracksList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="addToTrack"><i class="fas fa-arrow-alt-circle-right"></i> <span class="ibFont">'+selectedTrack.firstTileName+'</span></button><span class="butSpace"></span>');
        buttonInfos = "Envoyer ce bataillon vers la fin de l'itinéraire";
        $('#tracksList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="addToTrack"><i class="fas fa-arrow-alt-circle-right"></i> <span class="ibFont">'+selectedTrack.lastTileName+'</span></button><span class="butSpace"></span>');
    }
};
function addTrack(tileId) {
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let trackName = prompt('Donnez un nom à ce nouvel itinéraire :');
    if (trackName != null) {
        if (trackName.length >= 3) {
            let newTrack = {};
            newTrack.player = pseudo;
            newTrack.name = trackName;
            newTrack.tiles = '_'+tileId+'_';
            newTrack.firstTile = tileId;
            newTrack.lastTile = tileId;
            newTrack.firstTileName = world[tileIndex].name;
            newTrack.lastTileName = world[tileIndex].name;
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
