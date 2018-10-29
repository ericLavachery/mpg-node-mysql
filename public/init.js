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
socket.on('unit_moved', function(mvi) {
    showOpponentMove(mvi.tileId, mvi.unitId);
});
function showOpponentMove(tileId, unitId) {
    objIndex = pop.findIndex((obj => obj.id == unitId));
    let movedUnitOldTileId = pop[objIndex].tileId;
    let movedUnitPic = pop[objIndex].pic;
    // bouge l'image sur la carte
    $('#'+movedUnitOldTileId).empty();
    $('#'+tileId).empty().append('<img src="/static/img/units/'+movedUnitPic+'" alt="'+movedUnitPic+'" id="u'+unitId+'">');
    // change le tileId dans pop
    pop[objIndex].tileId = tileId;
    // montrer les unités qui étaient en dessous de celle qui est partie (ouais je me comprend)
    pop.forEach(function(unit) {
        if (unit.tileId == movedUnitOldTileId) {
            showUnit(unit.id,unit.tileId,unit.pic,'units');
        }
    });
};
