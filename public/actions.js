function explore(free) {
    let exploredTiles = perso.exploredTiles;
    let tileId = selectedUnit.tileId;
    let unitId = selectedUnit.id;
    let unitIndex = 0;
    let uMoveLoss = 0;
    // détermine la détection
    let groupDetection = 0;
    if (free) {
        groupDetection = 70;
    } else {
        let numDetectUnits = 0;
        if (mode == 'g_move' && selectedUnit.follow >= 1) {
            let totalDetect = 0;
            let bestDetect = 0;
            let totalMove = 0;
            let ownPopHere = _.filter(pop, function(unit) {
                return (unit.tileId == tileId && unit.player == pseudo);
            });
            ownPopHere.forEach(function(unit) {
                if (unit.follow == selectedUnit.follow && unit.move > unit.fatigue) {
                    numDetectUnits = numDetectUnits+unit.number;
                    totalDetect = totalDetect+(unit.detection*unit.number);
                    totalMove = totalMove+(unit.move*unit.number);
                    if (unit.detection > bestDetect) {
                        bestDetect = unit.detection;
                    }
                    // moveLoss en fonction du moveCost, si trop élevé, réduit numDetectUnits!
                    uMoveLoss = calcMoveCost(unit.tileId,unit.id,true,false)*exploMLfactor;
                    if (uMoveLoss > unit.move*(exploMLfactor+1)) {
                        uMoveLoss = unit.move*(exploMLfactor+1);
                        numDetectUnits = numDetectUnits - Math.round(unit.number/2);
                        if (numDetectUnits < 1) {
                            numDetectUnits = 1;
                        }
                    }
                    moveLoss(unit.id,uMoveLoss);
                    unitIndex = pop.findIndex((obj => obj.id == unit.id));
                    emitSinglePopChange(unit.id,'fatigue',pop[unitIndex].fatigue);
                    pop[unitIndex].time = 0;
                    emitSinglePopChange(unit.id,'time',0);
                }
            });
            groupDetection = Math.round((totalDetect+(bestDetect*4))/(numDetectUnits+4));
            let avMove = Math.round(totalMove/numDetectUnits);
            groupDetection = Math.round(groupDetection*(avMove+50)/120);
        } else {
            numDetectUnits = selectedUnit.number;
            groupDetection = Math.round(selectedUnit.detection*(selectedUnit.move+50)/120);
            // moveLoss en fonction du moveCost, si trop élevé, réduit numDetectUnits!
            uMoveLoss = calcMoveCost(selectedUnit.tileId,selectedUnit.id,true,false)*exploMLfactor;
            if (uMoveLoss > selectedUnit.move*(exploMLfactor+1)) {
                uMoveLoss = selectedUnit.move*(exploMLfactor+1);
                numDetectUnits = numDetectUnits - Math.round(selectedUnit.number/2);
                if (numDetectUnits < 1) {
                    numDetectUnits = 1;
                }
            }
            moveLoss(selectedUnit.id,uMoveLoss);
            unitIndex = pop.findIndex((obj => obj.id == selectedUnit.id));
            emitSinglePopChange(selectedUnit.id,'fatigue',pop[unitIndex].fatigue);
            pop[unitIndex].time = 0;
            emitSinglePopChange(selectedUnit.id,'time',0);
        }
        let numAdj = Math.round((Math.sqrt(numDetectUnits)-5)*8);
        if (numAdj >= 75) {
            numAdj = 75;
        }
        groupDetection = groupDetection+numAdj;
    }
    if (perso.mapCarto.includes(tileId)) {
        groupDetection = Math.round(groupDetection*115/100);
    }
    // détecte les unités sur place
    let unitView = perso.unitView;
    let bldView = perso.bldView;
    let new_unitView = [];
    let new_bldView = [];
    let unitIdent = perso.unitIdent;
    let bldIdent = perso.bldIdent;
    let new_unitIdent = [];
    let new_bldIdent = [];
    let detList = [];
    let detItem = '';
    let lastDetItem = 'rien';
    let thisGroup = 'xxx';
    let bonus = 0;
    let adjDetection = 0;
    let otherPopHere = _.filter(pop, function(unit) {
        return (unit.tileId == tileId && unit.player !== pseudo);
    });
    let sortedOtherPopHere = _.sortBy(_.sortBy(_.sortBy(otherPopHere,'type'),'follow'),'player');
    // détection séparée de chaque groupe
    sortedOtherPopHere.forEach(function(unit) {
        if (unit.follow >= 1) {
            thisGroup = unit.follow;
        } else {
            thisGroup = 'xxx';
        }
        detItem = unit.player+thisGroup+unit.icon;
        if (detItem == lastDetItem && !detItem.includes('xxx')) {
            bonus = bonus+10;
        } else {
            bonus = 0;
        }
        if (!detList.includes(detItem)) {
            adjDetection = groupDetection+bonus;
            if (isDetected(free,adjDetection,unit)) {
                detList.push(detItem);
            }
        }
        lastDetItem = detItem;
    });
    // console.log(detList);
    sortedOtherPopHere.forEach(function(unit) {
        if (unit.follow >= 1) {
            thisGroup = unit.follow;
        } else {
            thisGroup = 'xxx';
        }
        detItem = unit.player+thisGroup+unit.icon;
        if (unit.icon == 'bld') {
            new_bldView.push(unit.id);
            if (unit.skills.includes('regu_')) {
                new_bldIdent.push(unit.id);
            } else if (!unit.skills.includes('spy_') && !unit.skills.includes('cland_') && perso.allies.includes(unit.player)) {
                // identifie les alliés
                new_bldIdent.push(unit.id);
            }
        } else if (unit.icon == 'bsp' || unit.icon == 'ssp' || unit.icon == 'spy') {
            if (isDetected(free,groupDetection,unit)) {
                new_unitView.push(unit.id);
            }
        } else {
            if (detList.includes(detItem)) {
                if (!detItem.includes('xxx')) {
                    new_unitView.push(unit.id);
                    if (unit.skills.includes('regu_')) {
                        new_unitIdent.push(unit.id);
                    } else if (!unit.skills.includes('spy_') && !unit.skills.includes('cland_') && perso.allies.includes(unit.player)) {
                        // identifie les alliés
                        new_unitIdent.push(unit.id);
                    }
                } else {
                    if (isDetected(free,groupDetection,unit)) {
                        new_unitView.push(unit.id);
                        if (unit.skills.includes('regu_')) {
                            new_unitIdent.push(unit.id);
                        } else if (!unit.skills.includes('spy_') && !unit.skills.includes('cland_') && perso.allies.includes(unit.player)) {
                            // identifie les alliés
                            new_unitIdent.push(unit.id);
                        }
                    }
                }
            }
        }
    });
    // rajoute les unités détectées dans la liste (sauf celles qui y sont déjà)
    let toPush;
    if (unitView === null) {
        unitView = [];
    }
    for (var i = 0; i < new_unitView.length; i++) {
        toPush = Number(new_unitView[i]);
        if (!unitView.includes(toPush)) {
            unitView.push(toPush);
        }
    }
    if (bldView === null) {
        bldView = [];
    }
    for (var i = 0; i < new_bldView.length; i++) {
        toPush = Number(new_bldView[i]);
        if (!bldView.includes(toPush)) {
            bldView.push(toPush);
        }
    }

    if (bldIdent === null) {
        bldIdent = [];
    }
    for (var i = 0; i < new_bldIdent.length; i++) {
        toPush = Number(new_bldIdent[i]);
        if (!bldIdent.includes(toPush)) {
            bldIdent.push(toPush);
        }
    }
    if (unitIdent === null) {
        unitIdent = [];
    }
    for (var i = 0; i < new_unitIdent.length; i++) {
        toPush = Number(new_unitIdent[i]);
        if (!unitIdent.includes(toPush)) {
            unitIdent.push(toPush);
        }
    }
    if (!free) {
        // console.log(exploredTiles);
        exploredTiles.push(tileId);
        perso.exploredTiles = exploredTiles;
    }
    perso.unitView = unitView;
    perso.bldView = bldView;
    perso.unitIdent = unitIdent;
    perso.bldIdent = bldIdent;
    if (!free) {
        unfogAround(tileId);
        emitPlayersChange(perso);
        showMovesLeft(tileId, unitId);
    } else {
        unfogTile(tileId,true,true);
    }
    showUnitInfos(selectedUnit.id);
    showTileInfos(selectedUnit.tileId,true);
    showTileUnitList(tileId);
};
function isDetected(free,detect,unit) {
    // console.log(free+' det'+detect+' dis'+unit.discretion);
    // bonus disc CITY !!!
    // malus disc ROAD !!!
    let discretion = unit.discretion;
    // console.log(unit.number+' '+unit.type);
    // console.log('disc base '+unit.discretion);
    // TERRAIN COVER ----------------------------------
    let tileIndex = world.findIndex((obj => obj.id == unit.tileId));
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let terCover = calcTerCover(unit.tileId);
    let cover = Math.round(unit.coverAdj*terCover/100);
    discretion = discretion+(Math.round(discretion*cover/100));
    // console.log(adj terrain '+discretion);
    // CARTO ------------------------------------------
    if (perso.mapCarto.includes(unit.tileId)) {
        discretion = Math.round(discretion*115/100);
    }
    // ROAD -------------------------------------------
    let prevTileIndex = world.findIndex((obj => obj.id == unit.prevTileId));
    let prevTileFlags = world[prevTileIndex].flags;
    let tileFlags = world[tileIndex].flags;
    if (tileFlags.includes('road_') && prevTileFlags.includes('road_')) {
        // le bataillon est sur la route
        discretion = Math.round(discretion/2);
    }
    // NUMBER -----------------------------------------
    let adjDisc = Math.round(Math.sqrt(unit.number)*10)-10;
    discretion = discretion-adjDisc;
    // console.log(adj num '+discretion);
    if (discretion < 0) {
        discretion = 0;
    }
    let chances = discretion+detect;
    if (discretion*3 <= detect) {
        return true;
    } else {
        if (free) {
            return false;
        } else {
            let roll = Math.floor((Math.random() * chances) + 1);
            if (detect >= roll) {
                return true;
            } else {
                return false;
            }
        }
    }
};
function identify() {
    let tileId = selectedUnit.tileId;
    let unitId = selectedUnit.id;
    let unitIndex = 0;
    let searchSkills = selectedUnit.skills;
    let numToIdent = 0;
    let unitIdent = perso.unitIdent;
    let bldIdent = perso.bldIdent;
    let new_unitIdent = [];
    let new_bldIdent = [];
    let lastGroup = 'xxx';
    let otherPopHere = _.filter(pop, function(unit) {
        return (unit.tileId == tileId && unit.player !== pseudo);
    });
    let sortedOtherPopHere = _.sortBy(_.sortBy(_.sortBy(otherPopHere,'type'),'follow'),'player');
    sortedOtherPopHere.forEach(function(unit) {
        if (perso.unitView.includes(unit.id) || perso.bldView.includes(unit.id)) {
            if (!perso.unitIdent.includes(unit.id) && !perso.bldIdent.includes(unit.id)) {
                if (unit.follow != lastGroup || unit.follow === null || unit.follow == '') {
                    numToIdent = numToIdent+1;
                }
                lastGroup = unit.follow;
            }
            if (isIdentified(searchSkills,unit.skills)) {
                if (unit.icon == 'bld' || unit.icon == 'bsp') {
                    new_bldIdent.push(unit.id);
                } else {
                    new_unitIdent.push(unit.id);
                }
            }
        }
    });
    // move loss
    let numDetUnits = selectedUnit.number;
    if (numDetUnits >= 12) {numDetUnits = 12;};
    let moveLossFactor = Math.round((numToIdent+4)*75/(numDetUnits+4));
    moveLossPerc(selectedUnit.id,moveLossFactor);
    unitIndex = pop.findIndex((obj => obj.id == selectedUnit.id));
    emitSinglePopChange(selectedUnit.id,'fatigue',pop[unitIndex].fatigue);
    pop[unitIndex].time = 0;
    emitSinglePopChange(selectedUnit.id,'time',0);
    // rajoute les unités détectées dans la liste (sauf celles qui y sont déjà)
    let toPush;
    if (bldIdent === null) {
        bldIdent = [];
    }
    for (var i = 0; i < new_bldIdent.length; i++) {
        toPush = Number(new_bldIdent[i]);
        if (!bldIdent.includes(toPush)) {
            bldIdent.push(toPush);
        }
    }
    if (unitIdent === null) {
        unitIdent = [];
    }
    for (var i = 0; i < new_unitIdent.length; i++) {
        toPush = Number(new_unitIdent[i]);
        if (!unitIdent.includes(toPush)) {
            unitIdent.push(toPush);
        }
    }
    perso.unitIdent = unitIdent;
    perso.bldIdent = bldIdent;
    emitPlayersChange(perso);
    showMovesLeft(tileId, unitId);
    showUnitInfos(selectedUnit.id);
    showTileInfos(selectedUnit.tileId,true);
    showTileUnitList(tileId);
};
function isIdentified(searchSkills,targetSkills) {
    let free = false;
    if (targetSkills.includes('regu_')) {
        return true;
    } else {
        if (free) {
            return false;
        } else {
            if (targetSkills.includes('spy_')) {
                if (searchSkills.includes('spy_')) {
                    return true;
                } else {
                    return false;
                }
            } else if (targetSkills.includes('cland_')) {
                if (searchSkills.includes('spy_') || searchSkills.includes('info_')) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
    }
};
function cartography() {
    let cm = cartoMoveLoss();
    // console.log(cm.loss);
    if (!perso.mapCarto.includes(selectedUnit.tileId) && selectedUnit.move > selectedUnit.fatigue && selectedUnit.move*4 >= cm.loss) {
        moveLoss(selectedUnit.id,cm.loss);
        unitIndex = pop.findIndex((obj => obj.id == selectedUnit.id));
        emitSinglePopChange(selectedUnit.id,'fatigue',pop[unitIndex].fatigue);
        pop[unitIndex].time = 0;
        emitSinglePopChange(selectedUnit.id,'time',0);
        cartoTile(selectedUnit.tileId,true);
        drawUnit(selectedUnit.id, selectedUnit.tileId, selectedUnit.pic, 'icon-selected');
        showMovesLeft(selectedUnit.tileId, selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
        showTileUnitList(selectedUnit.tileId);
    }
};
function cartoMoveLoss() {
    let cm = {loss:0,message:''}
    let ml = 25*cartoMLfactor;
    let ml36 = 25*cartoMLfactor;
    let message = "";
    let moveCost = calcMoveCost(selectedUnit.tileId,selectedUnit.id,true,false);
    let tileIndex = world.findIndex((obj => obj.id == selectedUnit.tileId));
    let terIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let vegetation = ter[terIndex].vegetation;
    if (vegetation >= 30) {
        // pas facile, la forêt!
        moveCost = moveCost+((vegetation-15)*4);
    }
    let number = selectedUnit.number;
    if (number > 36) {
        number = 36;
    }
    ml = Math.round((ml*moveCost/50)/(number+(Math.sqrt(number)*3))*10000/selectedUnit.detection);
    if (selectedUnit.skills.includes('carto_')) {
        ml = Math.round(ml/16);
    } else if (selectedUnit.skills.includes('explo_')) {
        ml = Math.round(ml/4);
    } else if (selectedUnit.number < 24 && ml < 300) {
        // pas de carto à moins de 24 sans habileté spéciale
        ml = 300;
    } else {
        if (ml < minCartoML*3) {
            ml = minCartoML*3;
        }
    }
    if (ml < minCartoML) {
        ml = minCartoML;
    }
    // détermine le message
    if (ml > selectedUnit.move*4) {
        ml36 = Math.round((ml36*moveCost/50)/(36+(Math.sqrt(36)*3))*10000/selectedUnit.detection);
        if (ml36 > selectedUnit.move*4) {
            message = "Vous ne pouvez pas cartographier ce terrain avec ces unités";
        } else {
            message = "Vous manquez d'unités";
        }
    }
    cm.loss = ml;
    cm.message = message;
    return cm;
};
function cartoTile(tileId,save) {
    if (!perso.mapCarto.includes(tileId)) {
        perso.mapCarto.push(tileId);
        let tileIndex = world.findIndex((obj => obj.id == tileId));
        showTile(tileId,world[tileIndex].terrainId,world[tileIndex].seed);
        unfogAround(tileId);
        unhideTiles(tileId,false,true);
        // save
        if (save) {
            emitPlayersChange(perso);
        }
    }
};
function autoUnfog(tileId) {
    if (perso.mapCarto.includes(tileId)) {
        unfogAround(tileId);
    }
};
function unfogAround(tileId) {
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let myTileX = world[tileIndex].x;
    let myTileY = world[tileIndex].y;
    world.forEach(function(tile) {
        if (tile.x == myTileX+1 || tile.x == myTileX || tile.x == myTileX-1) {
            if (tile.y == myTileY+1 || tile.y == myTileY || tile.y == myTileY-1) {
                if (tile.y != myTileY || tile.x != myTileX) {
                    unfogTile(tile.id,false,false);
                }
            }
        }
    });
};
function unfogTile(tileId,save,fromMove) {
    // unfog adjacent tiles if road or river (if fromMove=true)
    let someChanges = false;
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let myTileX = world[tileIndex].x;
    let myTileY = world[tileIndex].y;
    let myTileFlags = world[tileIndex].flags;
    if (fromMove) {
        if (myTileFlags.includes('road_') || myTileFlags.includes('river_')) {
            world.forEach(function(tile) {
                if (tile.x == myTileX+1 || tile.x == myTileX || tile.x == myTileX-1) {
                    if (tile.y == myTileY+1 || tile.y == myTileY || tile.y == myTileY-1) {
                        if (tile.y != myTileY || tile.x != myTileX) {
                            if (myTileFlags.includes('road_') && tile.flags.includes('road_')) {
                                someChanges = true;
                                unfogTile(tile.id,false,false);
                            } else if (myTileFlags.includes('river_') || myTileFlags.includes('navig_')) {
                                if (tile.flags.includes('river_') || tile.flags.includes('navig_')) {
                                    someChanges = true;
                                    unfogTile(tile.id,false,false);
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    if (!perso.mapView.includes(tileId)) {
        perso.mapView.push(tileId);
        someChanges = true;
        showTile(tileId,world[tileIndex].terrainId,world[tileIndex].seed);
    }
    if (save && someChanges) {
        emitPlayersChange(perso);
    }
};
function attack() {

};
function fortif() {

};
function barrage() {

};
