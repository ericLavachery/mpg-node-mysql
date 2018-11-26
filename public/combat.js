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
        escarpAdj = Math.round((ter[terIndex].escarpement-10)*5/4)+1;
    }
    terDefense = terDefense+escarpAdj;
    // innondation
    if (ter[terIndex].innondation >= 10) {
        innondAdj = Math.round((ter[terIndex].innondation-5)*4/5);
    }
    terDefense = terDefense+innondAdj;
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
