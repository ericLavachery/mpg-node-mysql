function visibleUnitsOnTile(tileId) {
    let vuHere = {domLogin:'xxx',domUnitId:0,domPic:'ppp',numPlayer:0,numAllies:0,numEnemies:0,numOthers:0,catPlayer:0,catAllies:0,catEnemies:0,catOthers:0,numBld:0,isMov:false};
    let auHere = {numAllies:0,numEnemies:0,numOthers:0,numBld:0};
    let tilePop = _.filter(pop, function(unit) {
        return (unit.tileId == tileId);
    });
    let sortedTilePop = _.sortBy(tilePop,'player');
    let lastPlayer = 'xxx';
    let lastPic = 'ppp';
    let lastId = 0;
    let pNumUnits = 0;
    let bestNumUnits = 0;
    let prioStop = false;
    sortedTilePop.forEach(function(unit) {
        if (unit.cat == 'bld') {
            if (perso.bldView.includes(unit.id)) {
                if (perso.bldIdent.includes(unit.id)) {
                    vuHere.numBld = vuHere.numBld+1;
                }
            }
            auHere.numBld = auHere.numBld+1;
        }
        if (unit.player === pseudo) {
            if (unit.move > unit.fatigue && vuHere.isMov === false) {
                vuHere.isMov = true;
            }
            vuHere.numPlayer = vuHere.numPlayer+unit.number;
            if (uvp == 'res' && unit.cat == 'res') {
                vuHere.catPlayer = 1;
                prioStop = true;
            } else if (uvp == 'wrk' && unit.cat == 'wrk') {
                vuHere.catPlayer = 2;
                prioStop = true;
            } else if (uvp == 'spy' && unit.cat == 'spy') {
                vuHere.catPlayer = 3;
                prioStop = true;
            } else if (uvp == 'bsp' && unit.cat == 'bsp') {
                vuHere.catPlayer = 6;
                prioStop = true;
            } else if (uvp == 'shp' && unit.cat == 'shp') {
                vuHere.catPlayer = 5;
                prioStop = true;
            } else if (uvp == 'sld' && unit.cat == 'sld') {
                vuHere.catPlayer = 4;
                prioStop = true;
            } else if (uvp == 'bld' && unit.cat == 'bld') {
                vuHere.catPlayer = 7;
                prioStop = true;
            } else if (!prioStop) {
                if (catToPriority(unit.cat) > vuHere.catPlayer) {
                    vuHere.catPlayer = catToPriority(unit.cat);
                }
            }
        } else {
            if (perso.unitView.includes(unit.id) || perso.bldView.includes(unit.id)) {
                if (perso.unitIdent.includes(unit.id) || perso.bldIdent.includes(unit.id)) {
                    if (perso.enemies.includes(unit.player)) {
                        vuHere.numEnemies = vuHere.numEnemies+unit.number;
                        if (catToPriority(unit.cat) > vuHere.catEnemies) {
                            vuHere.catEnemies = catToPriority(unit.cat);
                        }
                    } else if (perso.allies.includes(unit.player)) {
                        vuHere.numAllies = vuHere.numAllies+unit.number;
                        if (catToPriority(unit.cat) > vuHere.catAllies) {
                            vuHere.catAllies = catToPriority(unit.cat);
                        }
                    } else {
                        vuHere.numOthers = vuHere.numOthers+unit.number;
                        if (catToPriority(unit.cat) > vuHere.catOthers) {
                            vuHere.catOthers = catToPriority(unit.cat);
                        }
                    }
                } else {
                    vuHere.numOthers = vuHere.numOthers+unit.number;
                    if (catToPriority(unit.cat) > vuHere.catOthers) {
                        vuHere.catOthers = catToPriority(unit.cat);
                    }
                }
            }
            // all units (not only the viewed ones) - For Armies
            if (perso.enemies.includes(unit.player)) {
                auHere.numEnemies = auHere.numEnemies+unit.number;
            } else if (perso.allies.includes(unit.player)) {
                auHere.numAllies = auHere.numAllies+unit.number;
            } else {
                auHere.numOthers = auHere.numOthers+unit.number;
            }
        }
        // Big Icon?
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
    // Armées non vues
    if (vuHere.numPlayer >= 150) {
        vuHere.catPlayer = 9;
    }
    if (auHere.numEnemies >= 150) {
        vuHere.catEnemies = 9;
    }
    if (auHere.numOthers >= 150) {
        vuHere.catOthers = 9;
    }
    if (auHere.numAllies >= 150) {
        vuHere.catAllies = 9;
    }
    // On ne voit que les armées si on a pas d'unités sur place
    if (vuHere.domLogin != pseudo) {
        if (vuHere.numPlayer < 1) {
            if (vuHere.catOthers < 9 && vuHere.catAllies < 9 && vuHere.catEnemies < 9 && vuHere.numBld < 1) {
                vuHere.domLogin = 'xxx';
                vuHere.domUnitId = 0;
                vuHere.domPic = 'ppp';
            }
            if (!perso.mapCarto.includes(tileId)) {
                vuHere.domLogin = 'xxx';
                vuHere.domUnitId = 0;
                vuHere.domPic = 'ppp';
            }
        }
    }
    return vuHere;
};
function drawUnit(unitId, tileId, icon, folder) {
    let vuHere = visibleUnitsOnTile(tileId);
    showUnit(unitId, tileId, icon, folder);
    showTileBar(tileId,vuHere);
};
function drawTileDefaultUnit(tileId) {
    $('#b'+tileId).empty();
    let vuHere = visibleUnitsOnTile(tileId);
    let folder = 'icon-player';
    if (vuHere.domLogin != pseudo) {
        folder = 'icon-other';
    } else if (vuHere.isMov === false) {
        folder = 'icon-nomove';
    }
    if (vuHere.domLogin != 'xxx') {
        showUnit(vuHere.domUnitId, tileId, vuHere.domPic, folder);
        showTileBar(tileId,vuHere);
    }
};
function showUnit(unitId, tileId, icon, folder) {
    $('#b'+tileId).empty().append('<img class="uicon" src="/static/img/'+folder+'/'+icon+'" alt="'+icon+'">');
};
function highlightTile(tileId,icon) {
    $('#b'+tileId).empty().append('<img class="uicon" src="/static/img/'+icon+'.png" alt="">');
};
function showTileBar(tileId,vuHere) {
    $('#s'+tileId).empty();
    if (vuHere.numPlayer >= 1) {
        $('#s'+tileId).append('<img src="/static/img/cat-player/'+priorityToIcon(vuHere.catPlayer)+'.png" alt="">');
    }
    if (vuHere.numOthers >= 1 || vuHere.catOthers >= 9) {
        $('#s'+tileId).append('<img src="/static/img/cat-other/'+priorityToIcon(vuHere.catOthers)+'.png" alt="">');
    } else if (vuHere.numAllies >= 1 || vuHere.catAllies >= 9) {
        $('#s'+tileId).append('<img src="/static/img/cat-other/'+priorityToIcon(vuHere.catAllies)+'.png" alt="">');
    }
    if (vuHere.numEnemies >= 1 || vuHere.catEnemies >= 9) {
        $('#s'+tileId).append('<img src="/static/img/cat-enemy/'+priorityToIcon(vuHere.catEnemies)+'.png" alt="">');
    }
};
function catToPriority(cat) {
    switch (cat)
    {
        case 'res': return 1;
        case 'wrk': return 2;
        case 'spy': return 3;
        case 'sld': return 4;
        case 'shp': return 5;
        case 'bsp': return 6;
        case 'bld': return 7;
        default: return 0;
    }
};
function priorityToCat(prio) {
    switch (prio)
    {
        case 1: return 'res';
        case 2: return 'wrk';
        case 3: return 'spy';
        case 4: return 'sld';
        case 5: return 'shp';
        case 6: return 'bsp';
        case 7: return 'bld';
        default: return '';
    }
};
function priorityToIcon(prio) {
    switch (prio)
    {
        case 1: return 'res';
        case 2: return 'wrk';
        case 3: return 'spy';
        case 4: return 'sld';
        case 5: return 'shp';
        case 6: return 'bld';
        case 7: return 'bld';
        case 9: return 'army';
        default: return '';
    }
};
function catPriorityChange(cat) {
    let folder = 'cat-selected'
    if (uvp == cat) {
        uvp = '';
        folder = 'cat-unsel'
    } else {
        uvp = cat;
    }
    if (uvp == 'bld') {
        $('.mapCity').css('z-index',50);
    } else {
        $('.mapCity').css('z-index',1);
    }
    showVisiblePop(world);
    $('#res-button').attr("src","/static/img/cat-unsel/res.svg");
    $('#wrk-button').attr("src","/static/img/cat-unsel/wrk.svg");
    $('#spy-button').attr("src","/static/img/cat-unsel/spy.svg");
    $('#bsp-button').attr("src","/static/img/cat-unsel/bsp.svg");
    $('#bld-button').attr("src","/static/img/cat-unsel/bld.svg");
    $('#sld-button').attr("src","/static/img/cat-unsel/sld.svg");
    $('#shp-button').attr("src","/static/img/cat-unsel/shp.svg");
    $('#'+cat+'-button').attr("src","/static/img/"+folder+"/"+cat+".svg");
};
