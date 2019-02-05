function fightInit() {
    let fightPopHere = _.filter(pop, function(squad) {
        return (squad.tileId == tileId && (squad.player === pseudo || squad.player === fightOpp));
    });
    fightPopHere.forEach(function(squad) {
        
    });
};
function calcTerDefense(tileId) {
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let terIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let terDefense = 0;
    let vegetAdj = 0;
    let escarpAdj = 0;
    let innondAdj = 0;
    // vegetation
    vegetAdj = Math.round(ter[terIndex].vegetation*ter[terIndex].vegetation/123);
    terDefense = terDefense+vegetAdj;
    // escarpement
    if (ter[terIndex].escarpement >= 15) {
        escarpAdj = Math.round((ter[terIndex].escarpement-10)*5/4);
    }
    terDefense = terDefense+escarpAdj;
    // innondation
    if (ter[terIndex].innondation >= 10) {
        innondAdj = Math.round((ter[terIndex].innondation-5)*4/5);
    }
    terDefense = terDefense+innondAdj;
    terDefense = Math.round(terDefense*biomeCoverFac/100);
    if (terDefense < 10) {
        terDefense = 10;
    }
    return terDefense;
};
function calcTerCover(tileId) {
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let terIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let terCover = 0;
    let vegetAdj = 0;
    let escarpAdj = 0;
    // vegetation
    if (ter[terIndex].vegetation >= 35) {
        vegetAdj = ter[terIndex].vegetation+15;
    } else if (ter[terIndex].vegetation >= 15) {
        vegetAdj = Math.round((ter[terIndex].vegetation+5)*(ter[terIndex].vegetation+5)/32);
    }
    terCover = terCover+vegetAdj;
    // escarpement
    if (ter[terIndex].escarpement >= 15) {
        escarpAdj = Math.round(Math.sqrt(ter[terIndex].escarpement-15)*5);
    }
    terCover = terCover+escarpAdj;
    terCover = Math.round(terCover*biomeCoverFac/100);
    return terCover;
};
function calcBasePrec(unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let prec = pop[unitIndex].prec;
    // effects of moveCost
    let tileId = pop[unitIndex].tileId;
    let mcAdj = calcMCAdj(tileId,unitId);
    prec = Math.round(prec*(100-mcAdj)/100);
    // effects of fatigue
    let shape = calcShape(unitId);
    prec = Math.round(prec*shape/100);
    return prec;
};
function calcMCAdj(tileId,unitId) {
    let moveCost = calcMoveCost(tileId,unitId,false,false);
    let adjRap = 0;
    if (moveCost > 600) {
        adjRap = 35;
    } else {
        adjRap = Math.round((Math.sqrt(moveCost)-5)*2);
        if (adjRap < 0) {
            adjRap = 0;
        }
        if (adjRap > 35) {
            adjRap = 35;
        }
    }
    return adjRap;
};
function calcShape(unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let move = pop[unitIndex].move;
    let fatigue = pop[unitIndex].fatigue;
    let endurance = pop[unitIndex].endurance;
    let movesLeft = move+endurance-fatigue;
    let shape = Math.round((movesLeft/3)+75);
    if (shape > 100) {shape = 100;};
    if (shape < 75) {shape = 75;};
    return shape;
};
function calcFortif(terDefense,wallsDefense,fortifie) {
    let fortif = 0;
    let appliedTerDef = 0;
    if (fortifie) {
        appliedTerDef = terDefense;
    }
    if (wallsDefense > terDefense) {
        fortif = wallsDefense+(appliedTerDef/2);
    } else {
        fortif = appliedTerDef+(wallsDefense/2);
    }
    return Math.round(fortif);
};
function calcProtPercCovering(numToCover,numCovering) {
    let percCovering = Math.round((numCovering*100)/(numToCover+numCovering));
    return Math.round(100*percCovering*percCovering/6400);
};
function calcProtFortif(fortif) {
    return Math.round(Math.sqrt(Math.sqrt(fortif+10))*47);
};
function calcProtection(org,numToCover,numCovering,fortif,numOwn,numOpp) {
    let protection = Math.round(org*calcProtPercCovering(numToCover,numCovering)*calcProtFortif(fortif)/numOpp*numOwn/5000);
    if (protection > 100) {
        protection = 100;
    }
    return protection;
};
function calcPriority(oppAppui,oppProtection,oppResist,oppPower,prioType) {
    // prioType = melee : calc prioMelee
    // prioType = range : calc prioRange
    // prioType = none : calc prioNone
    let basePrio = 150;
    let noProtPrio = 200;
    if (prioType == 'range') {
        if (oppAppui = 0) {
            basePrio = 150;
            noProtPrio = 150;
        } else if (oppAppui == 1) {
            basePrio = 120;
            noProtPrio = 185;
        } else if (oppAppui == 2) {
            basePrio = 100;
            noProtPrio = 200;
        } else if (oppAppui == 3) {
            basePrio = 70;
            noProtPrio = 215;
        } else if (oppAppui == 4) {
            basePrio = 40;
            noProtPrio = 230;
        }
    } else {
        if (oppAppui = 0) {
            basePrio = 150;
            noProtPrio = 150;
        } else if (oppAppui == 1) {
            basePrio = 100;
            noProtPrio = 185;
        } else if (oppAppui == 2) {
            basePrio = 50;
            noProtPrio = 200;
        } else if (oppAppui == 3) {
            basePrio = 30;
            noProtPrio = 215;
        } else if (oppAppui == 4) {
            basePrio = 10;
            noProtPrio = 230;
        }
    }
    if (oppAppui < 3 && prioType != 'none') {
        basePrio = Math.round(basePrio*calcGlassCanon(oppResist,oppPower)/100);
    }
    if (prioType == 'none') {
        noProtPrio = basePrio;
    }
    basePrio = Math.round(((oppProtection*basePrio)+((100-oppProtection)*noProtPrio))/100);
    return basePrio-50+rand.rand(1,prioDice);
};
function calcGlassCanon(oppResist,oppPower) {
    let glassCanon = Math.round((15*oppPower/oppResist)+75);
    if (glassCanon > 120) {
        glassCanon = 120;
    } else if (glassCanon < 80) {
        glassCanon = 80;
    }
    return glassCanon;
};
function calcMCRap(rapidite,portee,tileId,unitId) {
    let adjRap = calcMCAdj(tileId,unitId);
    if (portee >= 2) {
        adjRap = Math.round(adjRap/2);
    } else if (portee >=1) {
        adjRap = Math.round(adjRap/3*2);
    }
    return rapidite-adjRap;
}
function rollChoiceDice(mcRap) {
    let rollRap = mcRap+rand.rand(1,rapiditeDice);
    return rollRap;
}
function calcDamage(crit,puissance,penetration,degNatures,degDomaines,armure,nature,domaine) {
    if (crit) {
        puissance = Math.round(puissance*critFac);
    }
    let penArmure = Math.round(armure*penetration/100);
    let damage = Math.round(puissance-(penArmure*puissance/100));
    let damageDice = damage*2;
    if (damageDice < 1) {
        damageDice = 1;
    }
    damage = Math.round((damage+rand.rand(0,damageDice))/2);
    if (!degNatures.includes(nature+'_')) {
        if (!degDomaines.includes(domaine+'_')) {
            // nature KO, domaine KO
            damage = Math.round(damage/7);
        } else {
            // nature KO
            damage = Math.round(damage/4);
        }
    } else {
        if (!degDomaines.includes(domaine+'_')) {
            // domaine KO
            damage = Math.round(damage/3);
        }
    }
    return damage;
};
function calcHit(attPrecision,defEsquive,defParade,attStature,defStature,attPuissance,defHP,attSkills,defSkills) {
    let att = attPrecision;
    let def = 0;
    if (attStature >= defStature+3 && attPuissance >= defHP) {
        defParade = 0;
    } else if (attStature >= defStature+2) {
        defParade = Math.round(defParade*2/3);
    }
    if (attSkills.includes('noesq_')) {
        defEsquive = 0;
    }
    if (attSkills.includes('nopar_')) {
        defParade = 0;
    }
    if (attSkills.includes('shpar_')) {
        if (!defSkills.includes('shield_')) {
            defParade = 0;
        }
    }
    if (defParade > defEsquive) {
        def = defParade;
    } else {
        def = defEsquive;
    }
    let critical = 0;
    if (attSkills.includes('crit_')) {
        critical = Math.round((att-def)/2);
        if (critical < 1) {
            critical = 1;
        }
    }
    let checkHit = rand.rand(1,att+def);
    if (checkHit <= critical) {
        return 'crit';
    } else if (checkHit <= att) {
        return 'hit';
    } else {
        return 'miss';
    }
};
