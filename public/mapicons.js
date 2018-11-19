function visibleUnitsOnTile(tileId) {
    let vuHere = {domLogin:'xxx',domUnitId:0,domPic:'ppp',numPlayer:0,numAllies:0,numEnemies:0,numOthers:0,catPlayer:0,catAllies:0,catEnemies:0,catOthers:0,numBld:0};
    let tilePop = _.filter(pop, function(unit) {
        return (unit.tileId == tileId);
    });
    let sortedTilePop = _.sortBy(tilePop,'player');
    let lastPlayer = 'xxx';
    let lastPic = 'ppp';
    let lastId = 0;
    let pNumUnits = 0;
    let bestNumUnits = 0;
    sortedTilePop.forEach(function(unit) {
        if (unit.cat == 'bld') {
            vuHere.numBld = vuHere.numBld+1;
        }
        if (unit.player === pseudo) {
            vuHere.numPlayer = vuHere.numPlayer+unit.number;
            if (catToPriority(unit.cat) > catToPriority(vuHere.catPlayer)) {
                vuHere.catPlayer = catToPriority(unit.cat);
            }
        } else {
            if (perso.unitView.includes(unit.id) || perso.bldView.includes(unit.id)) {
                if (perso.enemies.includes(unit.player)) {
                    vuHere.numEnemies = vuHere.numEnemies+unit.number;
                    if (catToPriority(unit.cat) > catToPriority(vuHere.catEnemies)) {
                        vuHere.catEnemies = catToPriority(unit.cat);
                    }
                } else if (perso.allies.includes(unit.player)) {
                    vuHere.numAllies = vuHere.numAllies+unit.number;
                    if (catToPriority(unit.cat) > catToPriority(vuHere.catAllies)) {
                        vuHere.catAllies = catToPriority(unit.cat);
                    }
                } else {
                    vuHere.numOthers = vuHere.numOthers+unit.number;
                    if (catToPriority(unit.cat) > catToPriority(vuHere.catOthers)) {
                        vuHere.catOthers = catToPriority(unit.cat);
                    }
                }
            }
        }
        if (lastPlayer != unit.player && lastPlayer != 'xxx') {
            if (pNumUnits > bestNumUnits) {
                bestNumUnits = pNumUnits;
                vuHere.domLogin = lastPlayer;
                vuHere.domUnitId = lastId;
                vuHere.domPic = lastPic;
            }
            pNumUnits = 0;
        }
        pNumUnits = pNumUnits+unit.number;
        lastPlayer = unit.player;
        lastPic = unit.pic;
        lastId = unit.id;
    });
    if (pNumUnits > bestNumUnits) {
        vuHere.domLogin = lastPlayer;
        vuHere.domUnitId = lastId;
        vuHere.domPic = lastPic;
    }
    // On ne voit que les armées si on a pas d'unité sur place
    // if (vuHere.domLogin != pseudo) {
    //     if (vuHere.numPlayer < 1) {
    //         if (vuHere.catOthers < 9 && vuHere.catAllies < 9 && vuHere.catEnemies < 9) {
    //             vuHere.domLogin = 'xxx';
    //             vuHere.domUnitId = 0;
    //             vuHere.domPic = 'ppp';
    //         }
    //     }
    // }
    return vuHere;
};
function drawUnit(unitId, tileId, icon, folder) {
    let vuHere = visibleUnitsOnTile(tileId);
    showUnit(unitId, tileId, icon, folder);
    showTileBar(tileId,vuHere);
};
function drawTileDefaultUnit(tileId) {
    let vuHere = visibleUnitsOnTile(tileId);
    let folder = 'icon-player';
    if (vuHere.domLogin != pseudo) {
        folder = 'icon-other';
    }
    if (vuHere.domLogin != 'xxx') {
        showUnit(vuHere.domUnitId, tileId, vuHere.domPic, folder);
        showTileBar(tileId,vuHere);
    }
};
function showUnit(unitId, tileId, icon, folder) {
    $('#b'+tileId).empty().append('<img class="uicon" src="/static/img/'+folder+'/'+icon+'" alt="'+icon+'">');
};
function showTileBar(tileId,vuHere) {
    $('#s'+tileId).empty();
    if (vuHere.numPlayer >= 1) {
        $('#s'+tileId).append('<img src="/static/img/cat-player/'+priorityToIcon(vuHere.catPlayer)+'.png" alt="">');
    }
    if (vuHere.numOthers >= 1) {
        $('#s'+tileId).append('<img src="/static/img/cat-other/'+priorityToIcon(vuHere.catOthers)+'.png" alt="">');
    } else if (vuHere.numAllies >= 1) {
        $('#s'+tileId).append('<img src="/static/img/cat-other/'+priorityToIcon(vuHere.catAllies)+'.png" alt="">');
    }
    if (vuHere.numEnemies >= 1) {
        $('#s'+tileId).append('<img src="/static/img/cat-enemy/'+priorityToIcon(vuHere.catEnemies)+'.png" alt="">');
    }
    // if (vuHere.numPlayer > vuHere.numOthers) {
    //     if (vuHere.numPlayer > vuHere.numEnemies) {
    //         if (vuHere.numPlayer > vuHere.numAllies) {
    //             // Player BEST
    //             let icon = priorityToIcon(vuHere.catPlayer);
    //             $('#s'+tileId).append('<img src="/static/img/cat-player/'+priorityToIcon(vuHere.catPlayer)+'.png" alt="">');
    //         } else {
    //
    //         }
    //     } else {
    //
    //     }
    // } else {
    //
    // }

    //     $('#s'+tileId).append('<div class="tileBar" id="bar'+tileId+'">'+tbIcons+'</div>');

};
function catToPriority(cat) {
    switch (cat)
    {
        case 'wrk': return 1;
        case 'spy': return 2;
        case 'sld': return 3;
        case 'shp': return 4;
        case 'bsp': return 5;
        case 'bld': return 6;
        default: return 0;
    }
};
function priorityToCat(prio) {
    switch (prio)
    {
        case 1: return 'wrk';
        case 2: return 'spy';
        case 3: return 'sld';
        case 4: return 'shp';
        case 5: return 'bsp';
        case 6: return 'bld';
        default: return '';
    }
};
function priorityToIcon(prio) {
    switch (prio)
    {
        case 1: return 'wrk';
        case 2: return 'spy';
        case 3: return 'sld';
        case 4: return 'shp';
        case 5: return 'bld';
        case 6: return 'bld';
        case 9: return 'army';
        default: return '';
    }
};
