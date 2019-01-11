function cursorSwitch(seltype,selvalue,kur) {
    let defkur = 'default';
    if (kur == 'progress') {
        $(seltype+selvalue).css('cursor','pointer');
    } else {
        if (kur == 'move') {
            defkur = 'nesw-resize';
        } else if (kur == 'insp') {
            defkur = 'help';
        } else if (kur == 'stop') {
            defkur = 'not-allowed';
        } else if (kur == 'freemove') {
            defkur = 'ew-resize';
        } else if (kur == 'copy') {
            defkur = 'copy';
            kur = 'writing';
        }
        $(seltype+selvalue).css('cursor','url(/static/img/'+kur+'.cur),'+defkur);
    }
};
function cursorsToMode() {
    let kur = 'pointer';
    let defkur = 'default';
    let seltype = '.';
    let selvalue = 'grid-item';
    if (mode == 'inspect') {
        defkur = 'help';
        kur = 'insp';
    } else {
        if (selectedUnit.id >= 1) {
            if (mode.includes("move")) {
                defkur = 'not-allowed';
                kur = 'stop';
            }
        } else {
            defkur = 'default';
            kur = 'pointer';
        }
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
    if (mode == 'g_move') { // GROUP MOVE
        if (here) {
            cursorSwitch('#',tileId,'pointer');
        } else if (!moveOK) {
            cursorSwitch('#',tileId,'stop');
        } else {
            cursorSwitch('#',tileId,'move');
        }
    } else if (mode == 'inspect') { // INSPECT
        cursorSwitch('#',tileId,'insp');
    } else { // SINGLE MOVE
        if (here) {
            cursorSwitch('#',tileId,'pointer');
        } else if (!moveOK) {
            cursorSwitch('#',tileId,'stop');
        } else {
            cursorSwitch('#',tileId,'freemove');
        }
    }
};
function showMovesLeft(tileId,unitId) {
    if (mode == 's_move') {
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
    let endurance = pop[unitIndex].endurance;
    if (fatigue+endurance < 0) {fatigue = 0-endurance;};
    // if (fatigue < 0) {fatigue = 0;};
    let movesLeft = move-fatigue;
    let movesLeftAfter = 0;
    let moveCost = 999;
    let noDiagMoveCost = 999;
    let titleString = '';
    let moveOK = true;
    world.forEach(function(tile) {
        $("#"+tile.id).attr("title", "#"+tile.id);
        if (tile.x == myTileX+1 || tile.x == myTileX || tile.x == myTileX-1) {
            if (tile.y == myTileY+1 || tile.y == myTileY || tile.y == myTileY-1) {
                if (tile.y == myTileY && tile.x == myTileX) {
                    moveCost = 0;
                } else {
                    moveCost = calcMoveCost(tile.id,unitId,false,true);
                    noDiagMoveCost = calcMoveCost(tile.id,unitId,false,false);
                }
                if (noDiagMoveCost > maxMoveCost || movesLeft < 1 || move <= 0 || pop[unitIndex].onTrack >=1) {
                    moveOK = false;
                } else {
                    moveOK = true;
                }
                movesLeftAfter = movesLeft-moveCost;
                if (perso.mapView.includes(tile.id)) {
                    titleString = selectedUnit.number+' '+xType(selectedUnit.id)+' ('+Math.round(movesLeftAfter/10)+' moves left) -> #'+tile.id;
                    $("#"+tile.id).attr("title", titleString);
                }
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
    let endurance = 50;
    let movesLeft = 0;
    let movesLeftAfter = 0;
    let moveCost = 999;
    let noDiagMoveCost = 999;
    let worstML = 999;
    let titleString = '';
    let groupMove = {};
    let moveOK = true;
    let bulk = 1;
    let transUnits = [];
    let charUnits = [];
    world.forEach(function(tile) {
        worstML = 999;
        $("#"+tile.id).attr("title", "#"+tile.id);
        if (tile.x == myTileX+1 || tile.x == myTileX || tile.x == myTileX-1) {
            if (tile.y == myTileY+1 || tile.y == myTileY || tile.y == myTileY-1) {
                moveOK = true;
                if (tile.y == myTileY && tile.x == myTileX) {
                    moveCost = 0;
                } else {
                    groupMove = calcGroupBulk(popToMove,tile.id);
                    moveOK = groupMove.moveOK;
                    bulk = groupMove.bulk;
                    transUnits = groupMove.transUnits;
                    charUnits = groupMove.charUnits;
                    if (moveOK) {
                        popToMove.forEach(function(unit) {
                            if (unit.follow !== null || unit.id == selectedUnit.id) {
                                moveCost = calcMoveCost(tile.id,unit.id,false,true);

                                if (unit.move > 0) {
                                    if (transUnits.includes(unit.id)) {
                                        fatigue = unit.fatigue + moveCost*bulk;
                                        movesLeftAfter = unit.move-fatigue;
                                        if (movesLeftAfter < worstML) {
                                            worstML = movesLeftAfter;
                                        }
                                    } else if (charUnits.includes(unit.id)) {
                                        fatigue = unit.fatigue + moveCost;
                                        movesLeftAfter = unit.move-fatigue;
                                        if (movesLeftAfter < worstML) {
                                            worstML = movesLeftAfter;
                                        }
                                    } else {
                                        fatigue = unit.fatigue + Math.round(unit.move/5);
                                    }
                                } else {
                                    fatigue = 0;
                                }
                            }
                        });
                    }
                }
                if (perso.mapView.includes(tile.id)) {
                    if (moveOK) {
                        if (bulk != 1) {
                            titleString = 'GROUPE : encombrement '+bulk+' ('+Math.round(worstML/10)+' moves left) -> #'+tile.id;
                        } else {
                            titleString = 'GROUPE ('+Math.round(worstML/10)+' moves left) -> #'+tile.id;
                        }
                    } else {
                        titleString = '#'+tile.id;
                    }
                    $("#"+tile.id).attr("title", titleString);
                }
                adjacentTileInfos(tile.id,moveOK);
            }
        }
    });
};
function clearMovesLeft() {
    cursorsToMode();
    world.forEach(function(tile) {
        $("#"+tile.id).attr("title", "#"+tile.id);
    });
};
