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
    return terCover;
};
function calcBaseDefense(unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let defense = pop[unitIndex].defense;
    let tileIndex = world.findIndex((obj => obj.id == pop[unitIndex].tileId));
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let terCover = calcTerCover(pop[unitIndex].tileId);
    let terDefense = calcTerDefense(pop[unitIndex].tileId);
    // ajustement carto
    if (perso.mapCarto.includes(pop[unitIndex].tileId)) {
        terCover = Math.round((terCover*110/100)+10);
        terDefense = Math.round((terDefense*110/100)+10);
    }
    let cover = Math.round(terCover*pop[unitIndex].coverAdj/100);
    defense = Math.round((defense*terDefense/100)+defense);
    defense = Math.round((defense*cover/100)+defense);
    // effects of fatigue
    let move = pop[unitIndex].move;
    let fatigue = pop[unitIndex].fatigue;
    if (fatigue < 0) {fatigue = 0;};
    let movesLeft = move-fatigue;
    let shape = Math.round(movesLeft/(move/2)*100);
    if (shape > 100) {shape = 100;};
    defense = Math.round(defense*(shape+300)/400);
    return defense;
};
function calcBaseAttaque(unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let attaque = pop[unitIndex].attaque;
    let tileIndex = world.findIndex((obj => obj.id == pop[unitIndex].tileId));
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let terCover = calcTerCover(pop[unitIndex].tileId);
    // ajustement carto
    if (perso.mapCarto.includes(pop[unitIndex].tileId)) {
        terCover = Math.round((terCover*110/100)+10);
    }
    let cover = Math.round(terCover*pop[unitIndex].coverAdj/100);
    attaque = Math.round((attaque*cover/100)+attaque);
    // effects of fatigue
    let move = pop[unitIndex].move;
    let fatigue = pop[unitIndex].fatigue;
    if (fatigue < 0) {fatigue = 0;};
    let movesLeft = move-fatigue;
    let shape = Math.round(movesLeft/(move/2)*100);
    if (shape > 100) {shape = 100;};
    attaque = Math.round(attaque*(shape+300)/400);
    return attaque;
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
    return basePrio-50+rand.rand(1,100);
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
