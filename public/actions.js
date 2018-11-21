function explore(free) {
    let exploredTiles = perso.exploredTiles;
    let tileId = selectedUnit.tileId;
    let unitId = selectedUnit.id;
    let unitIndex = 0;
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
                    moveLossPerc(unit.id,75);
                    unitIndex = pop.findIndex((obj => obj.id == unit.id));
                    emitSinglePopChange(unit.id,'fatigue',pop[unitIndex].fatigue);
                }
            });
            groupDetection = Math.round((totalDetect+(bestDetect*4))/(numDetectUnits+4));
            let avMove = Math.round(totalMove/numDetectUnits);
            groupDetection = Math.round(groupDetection*(avMove+50)/120);
        } else {
            numDetectUnits = selectedUnit.number;
            groupDetection = Math.round(selectedUnit.detection*(selectedUnit.move+50)/120);
            moveLossPerc(selectedUnit.id,75);
            unitIndex = pop.findIndex((obj => obj.id == selectedUnit.id));
            emitSinglePopChange(selectedUnit.id,'fatigue',pop[unitIndex].fatigue);
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
        detItem = unit.player+thisGroup+unit.cat;
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
        detItem = unit.player+thisGroup+unit.cat;
        if (unit.cat == 'bld') {
            new_bldView.push(unit.id);
            if (unit.skills.includes('regular_')) {
                new_bldIdent.push(unit.id);
            } else if (!unit.skills.includes('spy_') && !unit.skills.includes('undercover_') && perso.allies.includes(unit.player)) {
                // identifie les alliés
                new_bldIdent.push(unit.id);
            }
        } else if (unit.cat == 'bsp' || unit.cat == 'ssp' || unit.cat == 'spy') {
            if (isDetected(free,groupDetection,unit)) {
                new_unitView.push(unit.id);
            }
        } else {
            if (detList.includes(detItem)) {
                if (!detItem.includes('xxx')) {
                    new_unitView.push(unit.id);
                    if (unit.skills.includes('regular_')) {
                        new_unitIdent.push(unit.id);
                    } else if (!unit.skills.includes('spy_') && !unit.skills.includes('undercover_') && perso.allies.includes(unit.player)) {
                        // identifie les alliés
                        new_unitIdent.push(unit.id);
                    }
                } else {
                    if (isDetected(free,groupDetection,unit)) {
                        new_unitView.push(unit.id);
                        if (unit.skills.includes('regular_')) {
                            new_unitIdent.push(unit.id);
                        } else if (!unit.skills.includes('spy_') && !unit.skills.includes('undercover_') && perso.allies.includes(unit.player)) {
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
        emitPlayersChange(perso);
        showMovesLeft(tileId, unitId);
    } else {
        unfogTile(tileId,true);
    }
    showUnitInfos(selectedUnit.id);
    showTileInfos(selectedUnit.tileId,true);
    showTileUnitList(tileId);
};
function isDetected(free,detect,unit) {
    // bonus disc CITY !!!
    let discretion = unit.discretion;
    // console.log(unit.number+' '+unit.type);
    // console.log('disc base '+unit.discretion);
    let tileIndex = world.findIndex((obj => obj.id == unit.tileId));
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let cover = Math.round(unit.coverAdj*ter[terrainIndex].cover/100);
    discretion = discretion+(Math.round(discretion*cover/100));
    // console.log(adj terrain '+discretion);
    if (perso.mapCarto.includes(unit.tileId)) {
        discretion = Math.round(discretion*115/100);
    }
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
                if (unit.cat == 'bld' || unit.cat == 'bsp') {
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
    if (targetSkills.includes('regulars')) {
        return true;
    } else {
        if (free) {
            return false;
        } else {
            if (targetSkills.includes('spy')) {
                if (searchSkills.includes('spy')) {
                    return true;
                } else {
                    return false;
                }
            } else if (targetSkills.includes('undercover')) {
                if (searchSkills.includes('spy') || searchSkills.includes('informer')) {
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
    let ml = cartoMoveLoss();
    // console.log(ml);
    if (!perso.mapCarto.includes(selectedUnit.tileId) && selectedUnit.move > selectedUnit.fatigue && selectedUnit.move*4 >= ml) {
        moveLoss(selectedUnit.id,ml);
        unitIndex = pop.findIndex((obj => obj.id == selectedUnit.id));
        emitSinglePopChange(selectedUnit.id,'fatigue',pop[unitIndex].fatigue);
        cartoTile(selectedUnit.tileId,true);
        drawUnit(selectedUnit.id, selectedUnit.tileId, selectedUnit.pic, 'icon-selected');
        showMovesLeft(selectedUnit.tileId, selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
        showTileUnitList(selectedUnit.tileId);
    }
};
function cartoMoveLoss() {
    let ml = 110;
    let moveCost = calcMoveCost(selectedUnit.tileId, selectedUnit.id);
    ml = Math.round((ml*moveCost/50)/(selectedUnit.number+(Math.sqrt(selectedUnit.number)*3))*10000/selectedUnit.detection);
    if (selectedUnit.skills.includes('carto_')) {
        ml = Math.round(ml/16);
    } else if (selectedUnit.skills.includes('explo_')) {
        ml = Math.round(ml/4);
    }
    if (ml < selectedUnit.move) {
        ml = selectedUnit.move;
    }
    return ml;
};
function cartoTile(tileId,save) {
    // montrer les terrains adjacents !!!
    if (!perso.mapCarto.includes(tileId)) {
        perso.mapCarto.push(tileId);
        let tileIndex = world.findIndex((obj => obj.id == tileId));
        let tileTerrain = world[tileIndex].terrain;
        showTile(tileId,tileTerrain);
        // unfog adjacent tiles
        let myTileX = world[tileIndex].x;
        let myTileY = world[tileIndex].y;
        world.forEach(function(tile) {
            if (tile.x == myTileX+1 || tile.x == myTileX || tile.x == myTileX-1) {
                if (tile.y == myTileY+1 || tile.y == myTileY || tile.y == myTileY-1) {
                    if (tile.y != myTileY || tile.x != myTileX) {
                        unfogTile(tile.id,false);
                    }
                }
            }
        });
        // save
        if (save) {
            emitPlayersChange(perso);
        }
    }
};
function unfogTile(tileId,save) {
    // montrer les routes et rivières adjacentes !!!
    if (!perso.mapView.includes(tileId)) {
        perso.mapView.push(tileId);
        if (save) {
            emitPlayersChange(perso);
        }
        let tileIndex = world.findIndex((obj => obj.id == tileId));
        let tileTerrain = world[tileIndex].terrain;
        showTile(tileId,tileTerrain);
    }
};
function attack() {

};
function guard() {

};
function eat() {

};
