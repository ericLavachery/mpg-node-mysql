function showTracksList(tileId) {
    someTracks = false;
    myTracks.forEach(function(track) {
        if (track.tiles.includes('_'+tileId+'_')) {
            if (!someTracks) {
                $('#tracksList').empty().append('<h3>Routes</h3><br>');
            }
            someTracks = true;
        }
    });
};
