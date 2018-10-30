let pop = [];
let world = [];
let ter = [];
let selectedUnit = [];
let mode = 'free';

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
    wmap.forEach(function(tile) {
        // console.log(tile);
        $('#zone_map').append('<div id="' + tile.id + '" class="grid-item ' + tile.terrain + '" onclick="selectOrMove(this)" title=""></div>');
    });
};
// infos terrains
socket.on('terload', function(wter) {
    ter = wter;
});

// Affichage des unités
socket.on('popload', function(wpop) {
    pop = wpop;
    showPop(wpop);
});
function showPop(wpop) {
    wpop.forEach(function(unit) {
        showUnit(unit.id, unit.tileId, unit.pic, 'units');
    });
};
function showUnit(unitId, tileId, pic, folder) {
    $('#'+tileId).empty().append('<img src="/static/img/'+folder+'/'+pic+'" alt="'+pic+'" id="u'+unitId+'">');
};
