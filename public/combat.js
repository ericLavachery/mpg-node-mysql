function calcBaseDefense(unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let defense = pop[unitIndex].defense;
    let tileIndex = world.findIndex((obj => obj.id == pop[unitIndex].tileId));
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let terCover = ter[terrainIndex].cover;
    let terDefense = ter[terrainIndex].defense;
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
    let terCover = ter[terrainIndex].cover;
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
