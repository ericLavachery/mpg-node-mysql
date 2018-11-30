function showTracksList(tileId) {
    $('#tracksList').empty();
    if (showTracks) {
        $('#tracksList').append('<h3>Routes</h3>&nbsp; <span class="detailIcons" id="trackViewButton"><i class="fas fa-arrows-alt-v jaune" onclick="toggleTracksView()"></i></span><br>');
    } else {
        $('#tracksList').append('<h3>Routes</h3>&nbsp; <span class="detailIcons" id="trackViewButton"><i class="fas fa-arrows-alt-v" onclick="toggleTracksView()"></i></span><br>');
    }
    someTracks = false;
    myTracks.forEach(function(track) {
        if (track.tiles.includes('_'+tileId+'_')) {
            if (!someTracks) {
                someTracks = true;
            }
            trackName = capitalizeFirstLetter(track.name);
            $('#tracksList').append('<span class="paramName">'+trackName+'</span><br>');
        }
    });
};
function toggleTracksView() {
    if (showTracks) {
        showTracks = false;
        $('#trackViewButton').empty().append('<i class="fas fa-arrows-alt-v" onclick="toggleTracksView()"></i>');
    } else {
        showTracks = true;
        $('#trackViewButton').empty().append('<i class="fas fa-arrows-alt-v jaune" onclick="toggleTracksView()"></i>');
    }
    showTrackedTiles();
};
function showTrackedTiles() {
    world.forEach(function(tile) {
        if (trackedTiles.includes('_'+tile.id+'_')) {
            showTileTags(tile.id);
        }
    });
};
