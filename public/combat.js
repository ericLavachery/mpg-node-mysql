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
function calcFightBasePrec(unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let prec = pop[unitIndex].prec;
    // effects of moveCost
    let tileId = pop[unitIndex].tileId;
    let mcAdj = calcMCAdj(tileId,unitId);
    prec = Math.round(prec*(100-mcAdj)/100);
    return prec;
};
function calcShapeEffects(field,shape) {
    field = Math.round(field*shape/100);
    return field;
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
function calcOrg(unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let org = pop[unitIndex].org;
    let group = pop[unitIndex].follow;
    let player = pop[unitIndex].player;
    let deso = 3;
    if (group >= 1) {
        let groupNumber = 0;
        let groupOrg = 0;
        let bestOrg = 0;
        let unitOrg = 0;
        let groupPop = _.filter(pop, function(unit) {
            return (unit.follow == group && unit.player === player && unit.tileId == pop[unitIndex].tileId && unit.org >= 0);
        });
        groupPop.forEach(function(unit) {
            groupNumber = groupNumber+unit.number;
        });
        deso = desorganisation(groupNumber);
        groupPop.forEach(function(unit) {
            if (unit.org == 0) {
                unitOrg = 100;
            } else {
                unitOrg = unit.org;
            }
            if (unit.fatigue > Math.round(unit.move/2)) {
                unitOrg = Math.round(unitOrg/deso);
            }
            groupOrg = groupOrg+(unitOrg*unit.number);
            if (unitOrg > bestOrg) {
                bestOrg = unitOrg;
            }
        });
        org = Math.round((Math.round(groupOrg/groupNumber)+bestOrg)/2);
    } else {
        deso = desorganisation(pop[unitIndex].number);
        if (pop[unitIndex].fatigue > Math.round(pop[unitIndex].move/2)) {
            org = Math.round(org/deso);
        } else {
            org = pop[unitIndex].org;
        }
    }
    if (org < 1) {
        org = 1;
    }
    return org;
};
function calcCombatOrg(player,turn) {
    let org = 0;
    let groupNumber = 0;
    let groupOrg = 0;
    let bestOrg = 0;
    let squadOrg = 0;
    cPop.forEach(function(squad) {
        if (squad.player === player) {
            groupNumber = groupNumber+squad.number;
        }
    });
    let deso = desorganisation(groupNumber,false);
    let desoMv = desorganisation(groupNumber,true);
    if (turn < 8) {
        desoMV = Math.round((((turn-1)*deso)+((7-turn)*desoMv))/6);
    }
    cPop.forEach(function(squad) {
        if (squad.player === player) {
            if (squad.org == 0) {
                squadOrg = 100;
            } else {
                squadOrg = squad.org;
            }
            if (squad.fatigue > Math.round(squad.move/2)) {
                squadOrg = Math.round(squadOrg/desoMv);
            } else {
                squadOrg = Math.round(squadOrg/deso);
            }
            groupOrg = groupOrg+(squadOrg*squad.number);
            if (squadOrg > bestOrg) {
                bestOrg = squadOrg;
            }
        }
    });
    org = Math.round((Math.round(groupOrg/groupNumber)+bestOrg)/2);
    if (org < 1) {
        org = 1;
    }
    return org;
};
function desorganisation(number,mvmt) {
    let deso = 1;
    if (mvmt) {
        deso = Math.round(Math.sqrt(number+40)*10/8);
    } else {
        deso = Math.round(Math.sqrt(number+376)*10/20);
    }
    deso = deso/10;
    if (deso < 1) {
        deso = 1;
    }
    return deso;
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
    return Math.round(percCovering*percCovering/72);
};
function calcProtFortif(fortif) {
    return Math.round(Math.sqrt(Math.sqrt(fortif+10))*47);
};
function calcProtection(org,numToCover,numCovering,fortif,numOwn,numOpp) {
    let rapport = Math.round(Math.sqrt(numOwn*100/numOpp));
    let protection = Math.round(org*calcProtPercCovering(numToCover,numCovering)*calcProtFortif(fortif)/rapport/500);
    protection = Math.round(protection*protectFac/100);
    if (protection > 100) {
        protection = 100;
    }
    return protection;
};
function calcPriority(ownAppui,ownProtection,ownResist,ownPower,prioType,prioRoll) {
    // prioType = melee : calc prioMelee
    // prioType = range : calc prioRange
    // prioType = none : calc prioNone
    // prioType = assa : calc prioAssa
    let basePrio = 150;
    let noProtPrio = 200;
    if (prioType == 'assa') {
        if (ownAppui == 0) {
            basePrio = 150;
            noProtPrio = 150;
        } else if (ownAppui == 1) {
            basePrio = 120;
            noProtPrio = 185;
        } else if (ownAppui == 2) {
            basePrio = 100;
            noProtPrio = 200;
        } else if (ownAppui == 3) {
            basePrio = 80;
            noProtPrio = 215;
        } else if (ownAppui == 4) {
            basePrio = 60;
            noProtPrio = 230;
        }
    } else if (prioType == 'range') {
        if (ownAppui == 0) {
            basePrio = 150;
            noProtPrio = 150;
        } else if (ownAppui == 1) {
            basePrio = 120;
            noProtPrio = 185;
        } else if (ownAppui == 2) {
            basePrio = 100;
            noProtPrio = 200;
        } else if (ownAppui == 3) {
            basePrio = 70;
            noProtPrio = 215;
        } else if (ownAppui == 4) {
            basePrio = 40;
            noProtPrio = 230;
        }
    } else {
        if (ownAppui == 0) {
            basePrio = 150;
            noProtPrio = 150;
        } else if (ownAppui == 1) {
            basePrio = 100;
            noProtPrio = 185;
        } else if (ownAppui == 2) {
            basePrio = 50;
            noProtPrio = 200;
        } else if (ownAppui == 3) {
            basePrio = 30;
            noProtPrio = 215;
        } else if (ownAppui == 4) {
            basePrio = 10;
            noProtPrio = 230;
        }
    }
    if (ownAppui < 3) {
        if (prioType == 'assa') {
            basePrio = Math.round(basePrio*calcGlassCanon(ownPower,ownResist)/100);
        } else if (prioType != 'none') {
            basePrio = Math.round(basePrio*calcGlassCanon(ownResist,ownPower)/100);
        }
    }
    if (prioType == 'none') {
        noProtPrio = basePrio;
    }
    basePrio = Math.round(((ownProtection*basePrio)+((100-ownProtection)*noProtPrio))/100);
    return basePrio-50+prioRoll;
};
function calcGlassCanon(ownResist,ownPower) {
    let glassCanon = Math.round((15*ownPower/ownResist)+85);
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
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    if (pop[unitIndex].moveType == 'air' || pop[unitIndex].moveType == 'alt') {
        adjRap = adjRap-30;
    }
    return rapidite-adjRap;
}
function rollChoiceDice(mcRap) {
    let rollRap = mcRap+rand.rand(1,choiceDice);
    return rollRap;
}
function calcDamage(hitRes,puissance,penetration,degNatures,armure,nature) {
    let boom = {};
    if (hitRes == 'crit') {
        puissance = Math.round(puissance*critFac);
    }
    boom.baseDamage = puissance;
    let penArmure = Math.round(armure*penetration/100);
    let damage = Math.round(puissance-(penArmure*puissance/100));
    boom.armorReduct = boom.baseDamage-damage;
    let damageDice = damage*2;
    if (damageDice < 1) {
        damageDice = 1;
    }
    damage = Math.round((damage+rand.rand(0,damageDice))/2);
    boom.damageCheck = damage;
    if (!degNatures.includes(nature)) {
        damage = Math.round(damage/4);
    }
    boom.dnReduct = boom.damageCheck-damage;
    boom.damage = damage;
    return boom;
};
function calcHit(attPrecision,defEsquive,defParade,attStature,defStature,attPuissance,defHP,attSkills,defSkills,degDomaines,domaine) {
    let hit = {};
    let att = attPrecision;
    if (!degDomaines.includes(domaine)) {
        att = Math.round(att/4);
        if (att < 1) {
            att = 1;
        }
    }
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
        hit.ep = 'parade';
    } else {
        def = defEsquive;
        hit.ep = 'esquive';
    }
    def = Math.round(def*defenseFac);
    let critical = 0;
    if (attSkills.includes('crit_')) {
        critical = Math.round((att-def)/2);
        if (critical < 1) {
            critical = 1;
        }
    }
    let checkHit = rand.rand(1,att+def);
    hit.check = checkHit;
    hit.chance = att;
    hit.dice = att+def;
    hit.perc = Math.round(att*100/(att+def));
    if (checkHit <= critical) {
        hit.text = 'critique!';
        hit.res = 'crit';
        hit.col = 'rose';
    } else if (checkHit <= att) {
        hit.text = 'touché';
        hit.res = 'hit';
        hit.col = 'blanc';
    } else {
        if (hit.ep == 'parade') {
            hit.text = 'parré';
        } else {
            hit.text = 'esquivé';
        }
        hit.res = 'miss';
        hit.col = 'gris';
    }
    return hit;
};
function calcSize(stature) {
    switch (stature) {
        case 1: return 2.5;
        case 2: return 3;
        case 3: return 4;
        case 4: return 5;
        case 5: return 6;
        case 6: return 8;
        case 7: return 11;
        case 8: return 15;
    }
};
function calcOppSlot(size) {
    let slot = Math.round(size/4*10);
    return slot/10;
};
function calcMaxOpp(size,org,fortif) {
    return Math.round(size/(Math.sqrt(org+15))/calcProtFortif(fortif)*550);
};
function calcPAtarg(squad,target) {
    let pa = {};
    // RESISTANCE
    let esquive = 100-Math.round(target.prec*100/(squad.esquive+target.prec));
    let parade = 100-Math.round(target.prec*100/(squad.parade+target.prec));
    pa.resist = Math.round(squad.hp*esquive*parade*squad.armure/divPAres);
    // POWER
    let prec = Math.round(squad.prec*100/(squad.prec+((target.parade+target.esquive)/2)));
    let penetration = 100-Math.round(target.armure*squad.penetration/100);
    pa.power = Math.round(squad.actions*squad.puissance*prec*penetration/divPApow);
    // PA
    pa.pa = Math.round(pa.resist*pa.power/divPA);
    return pa;
};
function calcPA(squad) {
    let pa = {};
    let target = {};
    target.hp = 12;
    target.esquive = 9;
    target.parade = 11;
    target.stature = 3;
    target.armure = 25;
    target.actions = 2;
    target.portee = 0;
    target.puissance = 6;
    target.penetration = 100;
    target.prec = 10;
    let pa1 = calcPAtarg(squad,target);
    target.hp = 18;
    target.esquive = 15;
    target.parade = 18;
    target.stature = 3;
    target.armure = 40;
    target.actions = 2;
    target.portee = 0;
    target.puissance = 8;
    target.penetration = 75;
    target.prec = 18;
    let pa2 = calcPAtarg(squad,target);
    pa.resist = Math.round((pa1.resist+pa2.resist)/2);
    pa.power = Math.round((pa1.power+pa2.power)/2);
    pa.pa = Math.round((pa1.pa+pa2.pa)/2);
    return pa;
};
