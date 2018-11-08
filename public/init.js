let pop = [];
let world = [];
let ter = [];
let mygroups = [];
let selectedUnit = [];
let mode = 'move';

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
    loadGroups(wpop);
    moveMode();
    cursorSwitch('.','grid-item','pointer');
});
function showPop(wpop) {
    let lastTileId = 0;
    let sortedPop = _.sortBy(_.sortBy(wpop,'icon'),'tileId');
    sortedPop.forEach(function(unit) {
        if (unit.player != pseudo) {
            if (unit.icon != 'spy' && unit.icon != 'bsp') {
                if (unit.tileId != lastTileId) {
                    showUnit(unit.id, unit.tileId, unit.icon, 'ounits');
                }
                lastTileId = unit.tileId;
            }
        }
    });
    lastTileId = 0;
    sortedPop.forEach(function(unit) {
        if (unit.player == pseudo) {
            if (unit.tileId != lastTileId) {
                showUnit(unit.id, unit.tileId, unit.icon, 'units');
            }
            lastTileId = unit.tileId;
        }
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
