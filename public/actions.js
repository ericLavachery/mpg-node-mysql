function actionsButtons() {
    // EXPLORE
    if (!perso.exploredTiles.includes(selectedUnit.tileId)) {
        let buttonInfos = 'Explore : Search whole area for units (with ';
        if (mode == 'g_move' && selectedUnit.follow >= 1) {
            buttonInfos = buttonInfos+'GROUP '+selectedUnit.follow+')';
        } else {
            buttonInfos = buttonInfos+selectedUnit.number+' '+selectedUnit.type+')';
        }
        $('#tileUnitList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="explore" onclick="explore(false)"><i class="far fa-eye"></i></button>');
    } else {
        buttonInfos = 'Explore : You cannot explore more than once per day !';
        $('#tileUnitList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="explore"><i class="far fa-eye-slash"></i></button>');
    }
    // IDENTIFY
    $('#tileUnitList').append('<button type="button" class="iconButtons" title="Identify units owners" id="identify" onclick="identify('+selectedUnit.id+')"><i class="fas fa-fingerprint"></i></button>');
    // ATTACK
    $('#tileUnitList').append('<button type="button" class="iconButtons" title="Attack" id="attack" onclick="attack('+selectedUnit.id+')"><i class="fas fa-haykal"></i></button>');
    // GUARD
    $('#tileUnitList').append('<button type="button" class="iconButtons" title="Guard" id="guard" onclick="guard('+selectedUnit.id+')"><i class="fas fa-shield-alt"></i></button>');
    // EAT
    $('#tileUnitList').append('<button type="button" class="iconButtons" title="Eat" id="eat" onclick="eat('+selectedUnit.id+')"><i class="fas fa-drumstick-bite"></i></button>');
};
function explore(free) {
    // manque : perte de move / jet de détection / save DB / broadcast?
    let exploredTiles = perso.exploredTiles;
    let tileId = selectedUnit.tileId;
    // détermine la détection
    let groupDetection = 0;
    if (free) {
        groupDetection = 40;
    } else {
        if (mode == 'g_move' && selectedUnit.follow >= 1) {
            let numDetectUnits = 0;
            let totalDetect = 0;
            let bestDetect = 0;
            let ownPopHere = _.filter(pop, function(unit) {
                return (unit.tileId == tileId && unit.player == pseudo);
            });
            ownPopHere.forEach(function(unit) {
                if (unit.follow == selectedUnit.follow) {
                    numDetectUnits = numDetectUnits+unit.number;
                    totalDetect = totalDetect+(unit.detection*unit.number);
                    if (unit.detection > bestDetect) {
                        bestDetect = unit.detection;
                    }
                }
            });
            groupDetection = Math.round((totalDetect+(bestDetect*4))/(numDetectUnits+4));
        } else {
            groupDetection = selectedUnit.detection;
        }
    }
    // détecte les unités sur place
    let unitView = perso.unitView;
    let bldView = perso.bldView;
    let new_unitView = [];
    let new_bldView = [];
    let detList = [];
    let detItem = '';
    let thisGroup = 'xxx';
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
        if (!detList.includes(detItem)) {
            if (isDetected(free,groupDetection,unit.discretion,unit.number)) {
                detList.push(detItem);
            }
        }
    });
    console.log(detList);
    sortedOtherPopHere.forEach(function(unit) {
        if (unit.follow >= 1) {
            thisGroup = unit.follow;
        } else {
            thisGroup = 'xxx';
        }
        detItem = unit.player+thisGroup+unit.cat;
        if (unit.cat == 'bld') {
            new_bldView.push(unit.id);
        } else if (unit.cat == 'bsp' || unit.cat == 'ssp' || unit.cat == 'spy') {
            if (isDetected(free,groupDetection,unit.discretion,unit.number)) {
                new_unitView.push(unit.id);
            }
        } else {
            if (detList.includes(detItem)) {
                if (!detItem.includes('xxx')) {
                    new_unitView.push(unit.id);
                } else {
                    if (isDetected(free,groupDetection,unit.discretion,unit.number)) {
                        new_unitView.push(unit.id);
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
    if (!free) {
        exploredTiles.push(tileId);
        perso.exploredTiles = exploredTiles;
    }
    perso.unitView = unitView;
    perso.bldView = bldView;
    showTileUnitList(tileId);
};
function identify() {

};
function attack() {

};
function guard() {

};
function eat() {

};
function isDetected(free,detect,disc,number) {
    // bonus pour grandes bandes qui cherchent 
    let adjDisc = Math.round(Math.sqrt(number)*10)-10;
    let discretion = disc-adjDisc;
    if (discretion < 0) {
        discretion = 0;
    }
    let chances = discretion+detect;
    if (!free) {
        console.log('>>> discretion '+discretion);
        console.log('detect '+detect);
        console.log('chances '+chances);
    }
    if (discretion*3 <= detect) {
        return true;
    } else {
        if (free) {
            return false;
        } else {
            let roll = Math.floor((Math.random() * chances) + 1);
            console.log(roll+'/'+chances+' d='+detect);
            if (detect >= roll) {
                return true;
            } else {
                return false;
            }
        }
    }
};
