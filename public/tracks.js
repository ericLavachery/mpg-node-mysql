function showTracksList(tileId) {
    $('#tracksList').empty();
    if (showTracks) {
        $('#tracksList').append('<h3>Itinéraires</h3>&nbsp; <span class="detailIcons" id="trackViewButton"><i class="fas fa-arrows-alt-v jaune" onclick="toggleTracksView()"></i></span><br>');
    } else {
        $('#tracksList').append('<h3>Itinéraires</h3>&nbsp; <span class="detailIcons" id="trackViewButton"><i class="fas fa-arrows-alt-v" onclick="toggleTracksView()"></i></span><br>');
    }
    someTracks = false;
    myTracks.forEach(function(track) {
        if (track.tiles.includes('_'+tileId+'_')) {
            if (!someTracks) {
                someTracks = true;
            }
            trackName = capitalizeFirstLetter(track.name);
            if (track.id == selectedTrack.id) {
                $('#tracksList').append('<a href="#" onclick="toggleSelectTrack('+track.id+')"><span class="paramName jaune">'+trackName+'</span></a><br>');
            } else {
                $('#tracksList').append('<span class="paramName"><a href="#" onclick="toggleSelectTrack('+track.id+')">'+trackName+'</a></span><br>');
            }
        }
    });
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
