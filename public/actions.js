function actionsButtons() {
    let buttonInfos = '';
    // EXPLORE
    if (!perso.exploredTiles.includes(selectedUnit.tileId)) {
        if (selectedUnit.move > selectedUnit.fatigue) {
            buttonInfos = 'Explore : Search whole area for units (with ';
            if (mode == 'g_move' && selectedUnit.follow >= 1) {
                buttonInfos = buttonInfos+'GROUP '+selectedUnit.follow+')';
            } else {
                buttonInfos = buttonInfos+selectedUnit.number+' '+selectedUnit.type+')';
            }
            $('#tileUnitList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="explore" onclick="explore(false)"><i class="far fa-eye"></i></button>');
        } else {
            buttonInfos = 'Explore : Units with no moves left cannot explore !';
            $('#tileUnitList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="explore"><i class="far fa-eye-slash"></i></button>');
        }
    } else {
        buttonInfos = 'Explore : You cannot explore more than once per day !';
        $('#tileUnitList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="explore"><i class="far fa-eye-slash"></i></button>');
    }
    // IDENTIFY
    buttonInfos = 'Identify units owners (with ';
    buttonInfos = buttonInfos+selectedUnit.number+' '+selectedUnit.type+')';
    $('#tileUnitList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="identify" onclick="identify()"><i class="fas fa-fingerprint"></i></button>');
    // ATTACK
    $('#tileUnitList').append('<button type="button" class="iconButtons" title="Attack" id="attack" onclick="attack('+selectedUnit.id+')"><i class="fas fa-haykal"></i></button>');
    // GUARD
    $('#tileUnitList').append('<button type="button" class="iconButtons" title="Guard" id="guard" onclick="guard('+selectedUnit.id+')"><i class="fas fa-shield-alt"></i></button>');
    // EAT
    $('#tileUnitList').append('<button type="button" class="iconButtons" title="Eat" id="eat" onclick="eat('+selectedUnit.id+')"><i class="fas fa-drumstick-bite"></i></button>');
};
function explore(free) {
    let exploredTiles = perso.exploredTiles;
    let tileId = selectedUnit.tileId;
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
    // console.log('groupDetection '+groupDetection);
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
                    }
                } else {
                    if (isDetected(free,groupDetection,unit)) {
                        new_unitView.push(unit.id);
                        if (unit.skills.includes('regular_')) {
                            new_unitIdent.push(unit.id);
                        }
                    }
                }
            }
        }
    });
    // rajoute les unités détectées dans la liste (sauf celles qui y sont déjà)
    if (unitView === null) {
        unitView = new_unitView;
    } else {
        for (var i = 0; i < new_unitView.length; i++) {
            if (!unitView.includes(new_unitView[i])) {
                unitView.push(new_unitView[i]);
            }
        }
    }
    if (bldView === null) {
        bldView = new_bldView;
    } else {
        for (var i = 0; i < new_bldView.length; i++) {
            if (!bldView.includes(new_bldView[i])) {
                bldView.push(new_bldView[i]);
            }
        }
    }
    if (bldIdent === null) {
        bldIdent = new_bldIdent;
    } else {
        for (var i = 0; i < new_bldIdent.length; i++) {
            if (!bldIdent.includes(new_bldIdent[i])) {
                bldIdent.push(new_bldIdent[i]);
            }
        }
    }
    if (unitIdent === null) {
        unitIdent = new_unitIdent;
    } else {
        for (var i = 0; i < new_unitIdent.length; i++) {
            if (!unitIdent.includes(new_unitIdent[i])) {
                unitIdent.push(new_unitIdent[i]);
            }
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
    }
    showUnitInfos(selectedUnit.id);
    showTileInfos(selectedUnit.tileId,true);
    showTileUnitList(tileId);
};
function isDetected(free,detect,unit) {
    // bonus disc CITY !!!
    // console.log(unit.number+' '+unit.type);
    // console.log('disc base '+unit.discretion);
    let adjDisc = Math.round(Math.sqrt(unit.number)*10)-10;
    let discretion = unit.discretion-adjDisc;
    // console.log(dadj num '+discretion);
    let tileIndex = world.findIndex((obj => obj.id == unit.tileId));
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let cover = Math.round(unit.coverAdj*ter[terrainIndex].cover/100);
    discretion = discretion+(Math.round(discretion*cover/100));
    // console.log(adj terrain '+discretion);
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
    let unitIndex = 0;
    let searchSkills = selectedUnit.skills;
    let numToIdent = 0;
    let unitIdent = perso.unitIdent;
    let bldIdent = perso.bldIdent;
    let new_unitIdent = [];
    let new_bldIdent = [];
    let otherPopHere = _.filter(pop, function(unit) {
        return (unit.tileId == tileId && unit.player !== pseudo);
    });
    let sortedOtherPopHere = _.sortBy(_.sortBy(_.sortBy(otherPopHere,'type'),'follow'),'player');
    sortedOtherPopHere.forEach(function(unit) {
        if (perso.unitView.includes(unit.id) || perso.bldView.includes(unit.id)) {
            if (!perso.unitIdent.includes(unit.id) && !perso.bldIdent.includes(unit.id)) {
                numToIdent = numToIdent+1;
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
    let moveLossFactor = Math.round((numToIdent+4)*65/(selectedUnit.number+4));
    moveLossPerc(selectedUnit.id,moveLossFactor);
    unitIndex = pop.findIndex((obj => obj.id == selectedUnit.id));
    emitSinglePopChange(selectedUnit.id,'fatigue',pop[unitIndex].fatigue);
    // rajoute les unités détectées dans la liste (sauf celles qui y sont déjà)
    if (bldIdent === null) {
        bldIdent = new_bldIdent;
    } else {
        for (var i = 0; i < new_bldIdent.length; i++) {
            if (!bldIdent.includes(new_bldIdent[i])) {
                bldIdent.push(new_bldIdent[i]);
            }
        }
    }
    if (unitIdent === null) {
        unitIdent = new_unitIdent;
    } else {
        for (var i = 0; i < new_unitIdent.length; i++) {
            if (!unitIdent.includes(new_unitIdent[i])) {
                unitIdent.push(new_unitIdent[i]);
            }
        }
    }
    perso.unitIdent = unitIdent;
    perso.bldIdent = bldIdent;
    emitPlayersChange(perso);
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
function attack() {

};
function guard() {

};
function eat() {

};
