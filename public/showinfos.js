// SHOW INFOS
function showUnitInfos(unitId) {
    $('#unitInfos').empty();
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let move = pop[unitIndex].move;
    let moveAdj = pop[unitIndex].moveAdj;
    let fatigue = pop[unitIndex].fatigue;
    if (fatigue < 0) {fatigue = 0;};
    let movesLeft = move-fatigue;
    let hpLeft = pop[unitIndex].hp-pop[unitIndex].damage;
    let tileIndex = world.findIndex((obj => obj.id == pop[unitIndex].tileId));
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let terCover = ter[terrainIndex].cover;
    let terDefense = ter[terrainIndex].defense;
    let defense = pop[unitIndex].defense;
    defense = Math.round((defense*terDefense/100)+defense);
    let cover = Math.round(terCover*pop[unitIndex].coverAdj/100);
    defense = Math.round((defense*cover/100)+defense);
    let attack = Math.round((pop[unitIndex].attack*cover/100)+pop[unitIndex].attack);
    // effects of fatigue
    let shape = Math.round(movesLeft/(move/2)*100);
    if (shape > 100) {shape = 100;};
    defense = Math.round(defense*(shape+300)/400);
    attack = Math.round(attack*(shape+300)/400);
    $('#unitInfos').append('<h3>'+pop[unitIndex].number+' '+pop[unitIndex].type+'</h3>');
    $('#unitInfos').append('<span class="paramName">Owner</span><span class="paramValue">'+pop[unitIndex].player+'</span><br>');
    if (shape >= 100) {
        $('#unitInfos').append('<span class="paramName">Moves</span><span id="infosMovesLeft" class="paramValue">'+Math.round(movesLeft/10)+'</span><span class="paramValue">&nbsp;/&nbsp;'+Math.round(move/10)+'</span><br>');
    } else {
        $('#unitInfos').append('<span class="paramName">Moves</span><span id="infosMovesLeft" class="paramValue rouge">'+Math.round(movesLeft/10)+'</span><span class="paramValue">&nbsp;/&nbsp;'+Math.round(move/10)+'</span><br>');
    }
    if (hpLeft >= pop[unitIndex].hp) {
        $('#unitInfos').append('<span class="paramName">HP</span><span class="paramValue">'+hpLeft+'</span><span class="paramValue">&nbsp;/&nbsp;'+pop[unitIndex].hp+'</span><br>');
    } else {
        $('#unitInfos').append('<span class="paramName">HP</span><span class="paramValue rouge">'+hpLeft+'</span><span class="paramValue">&nbsp;/&nbsp;'+pop[unitIndex].hp+'</span><br>');
    }
    $('#unitInfos').append('<span class="paramName">Attack</span><span class="paramValue">'+attack+'&nbsp;/&nbsp;'+pop[unitIndex].attack+'</span><br>');
    $('#unitInfos').append('<span class="paramName">Defense</span><span class="paramValue">'+defense+'&nbsp;/&nbsp;'+pop[unitIndex].defense+'</span><br>');
    $('#unitInfos').append('<span class="paramName">Power</span><span class="paramValue">'+pop[unitIndex].power+'</span><br>');
    $('#unitInfos').append('<span class="paramName">Cover</span><span class="paramValue">'+pop[unitIndex].coverAdj+'</span><br>');
};
function showTileInfos(tileId,linked) {
    $('#tileInfos').empty();
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    if (linked) {
        $('#tileInfos').append('<h3>'+capitalizeFirstLetter(world[tileIndex].terrain)+'</h3>');
    } else {
        $('#tileInfos').append('<h4>'+capitalizeFirstLetter(world[tileIndex].terrain)+'</h4>');
    }
    $('#tileInfos').append('<span class="paramName">Tile Id</span><span class="paramValue">'+world[tileIndex].id+'</span><br>');
    $('#tileInfos').append('<span class="paramName">Map square</span><span class="paramValue">'+world[tileIndex].x+'.'+world[tileIndex].y+'</span><br>');
    $('#tileInfos').append('<span class="paramName">Move cost</span><span class="paramValue">'+ter[terrainIndex].moveCost+'</span><br>');
    $('#tileInfos').append('<span class="paramName">Cover</span><span class="paramValue">'+ter[terrainIndex].cover+'</span><br>');
    $('#tileInfos').append('<span class="paramName">Defense</span><span class="paramValue">'+ter[terrainIndex].defense+'</span><br>');
    showTileUnitList(tileId);
};
function cursorSwitch(seltype,selvalue,kur) {
    let defkur = 'default';
    if (kur == 'move') {
        defkur = 'nesw-resize';
    } else if (kur == 'sword') {
        defkur = 'crosshair';
    } else if (kur == 'stop') {
        defkur = 'not-allowed';
    } else if (kur == 'freemove') {
        defkur = 'ew-resize';
    }
    $(seltype+selvalue).css('cursor','url(/static/img/'+kur+'.cur),'+defkur);
};
function cursorsToMode() {
    let kur = 'pointer';
    let defkur = 'default';
    let seltype = '.';
    let selvalue = 'grid-item';
    if (mode == 'move') {
        defkur = 'nesw-resize';
        kur = 'move';
    } else if (mode == 'attack') {
        defkur = 'crosshair';
        kur = 'sword';
    }
    zel = seltype+selvalue;
    $(zel).css('cursor','url(/static/img/'+kur+'.cur),'+defkur);
};
function adjacentTileInfos(tileId,moveOK) {
    let here = false;
    let ownUnitsHere = false;
    let popHere = _.filter(pop, function(unit) {
        return (unit.tileId == tileId);
    });
    popHere.forEach(function(unit) {
        if (unit.id == selectedUnit.id) {
            here = true;
        }
        if (unit.player == pseudo) {
            ownUnitsHere = true;
        }
    });
    if (mode == 'move') {
        if (here) {
            cursorSwitch('#',tileId,'pointer');
        } else if (!moveOK) {
            cursorSwitch('#',tileId,'stop');
        } else {
            cursorSwitch('#',tileId,'move');
        }
    } else if (mode == 'attack') {
        cursorSwitch('#',tileId,'sword');
    } else {
        if (!here) {
            if (ownUnitsHere === true) {
                cursorSwitch('#',tileId,'pointer');
            } else {
                cursorSwitch('#',tileId,'freemove');
            }
        } else {
            cursorSwitch('#',tileId,'pointer');
        }
    }
};
function showMovesLeft(tileId,unitId) {
    if (mode == 'free') {
        showUnitMovesLeft(tileId, unitId);
    } else {
        let popToMove = _.filter(pop, function(unit) {
            return (unit.follow == selectedUnit.follow && unit.player === pseudo && unit.tileId == selectedUnit.tileId);
        });
        let numToMove = 0;
        popToMove.forEach(function(unit) {
            if (unit.follow !== null || unit.id == selectedUnit.id) {
                numToMove = numToMove + 1;
            }
        });
        if (numToMove >= 2) {
            showGroupMovesLeft(tileId, popToMove);
        } else {
            showUnitMovesLeft(tileId, unitId);
        }
    }
};
function showUnitMovesLeft(tileId,unitId) {
    cursorsToMode();
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let myTileX = world[tileIndex].x;
    let myTileY = world[tileIndex].y;
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let move = pop[unitIndex].move;
    let fatigue = pop[unitIndex].fatigue;
    if (fatigue < 0) {fatigue = 0;};
    let movesLeft = move-fatigue;
    let movesLeftAfter = 0;
    let moveCost = 999;
    let titleString = '';
    let moveOK = true;
    world.forEach(function(tile) {
        $("#"+tile.id).attr("title", "");
        if (tile.x == myTileX+1 || tile.x == myTileX || tile.x == myTileX-1) {
            if (tile.y == myTileY+1 || tile.y == myTileY || tile.y == myTileY-1) {
                if (tile.y == myTileY && tile.x == myTileX) {
                    moveCost = 0;
                } else {
                    moveCost = calcMoveCost(tile.id,unitId);
                }
                if (moveCost > movesLeft*3) {
                    moveOK = false;
                } else {
                    moveOK = true;
                }
                movesLeftAfter = movesLeft-moveCost;
                titleString = Math.round(movesLeftAfter/10)+' moves left';
                // if (!moveOK) {
                //     titleString = titleString+' | NO WAY';
                // }
                $("#"+tile.id).attr("title", titleString);
                adjacentTileInfos(tile.id,moveOK);
            }
        }
    });
};
function showGroupMovesLeft(tileId,popToMove) {
    cursorsToMode();
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let myTileX = world[tileIndex].x;
    let myTileY = world[tileIndex].y;
    let unitIndex = 0;
    let move = 0;
    let fatigue = 0;
    let movesLeft = 0;
    let movesLeftAfter = 0;
    let moveCost = 999;
    let worstML = 999;
    let titleString = '';
    let moveOK = true;
    world.forEach(function(tile) {
        worstML = 999;
        $("#"+tile.id).attr("title", "");
        if (tile.x == myTileX+1 || tile.x == myTileX || tile.x == myTileX-1) {
            if (tile.y == myTileY+1 || tile.y == myTileY || tile.y == myTileY-1) {
                if (tile.y == myTileY && tile.x == myTileX) {
                    moveCost = 0;
                } else {
                    popToMove.forEach(function(unit) {
                        if (unit.follow !== null || unit.id == selectedUnit.id) {
                            unitIndex = pop.findIndex((obj => obj.id == unit.id));
                            move = pop[unitIndex].move;
                            fatigue = pop[unitIndex].fatigue;
                            if (fatigue < 0) {fatigue = 0;};
                            movesLeft = move-fatigue;
                            moveCost = calcMoveCost(tile.id,unit.id);
                            if (moveCost > movesLeft*3) {
                                moveOK = false;
                            } else {
                                moveOK = true;
                            }
                            movesLeftAfter = movesLeft-moveCost;
                            if (movesLeftAfter < worstML) {
                                worstML = movesLeftAfter;
                            }
                        }
                    });
                }
                if (moveCost >= 1) {
                    titleString = Math.round(worstML/10)+' moves left';
                    // if (!moveOK) {
                    //     titleString = titleString+' | NO WAY';
                    // }
                } else {
                    titleString = '';
                }
                $("#"+tile.id).attr("title", titleString);
                adjacentTileInfos(tile.id,moveOK);
            }
        }
    });
};
