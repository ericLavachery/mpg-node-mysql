// SHOW INFOS
function showUnitInfos(unitId) {
    $('#unitInfos').empty();
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let move = pop[unitIndex].move;
    let moveAdj = pop[unitIndex].moveAdj;
    let fatigue = pop[unitIndex].fatigue;
    if (fatigue < 0) {fatigue = 0;};
    let movesLeft = move-fatigue;
    let shape = Math.round(movesLeft/(move/2)*100);
    if (shape > 100) {shape = 100;};
    let hpLeft = pop[unitIndex].hp-pop[unitIndex].blessures;
    let defense = calcBaseDefense(unitId);
    let attaque = calcBaseAttaque(unitId);
    $('#unitInfos').append('<h3>'+pop[unitIndex].number+' '+pop[unitIndex].type+'</h3>');
    $('#unitInfos').append('<span class="paramName">Propriétaire</span><span class="paramValue">'+pop[unitIndex].player+'</span><br>');
    if (shape >= 100) {
        $('#unitInfos').append('<span class="paramName">Mouvements</span><span id="infosMovesLeft" class="paramValue">'+Math.round(movesLeft/10)+'</span><span class="paramValue">&nbsp;/&nbsp;'+Math.round(move/10)+'</span><br>');
    } else {
        $('#unitInfos').append('<span class="paramName">Mouvements</span><span id="infosMovesLeft" class="paramValue rouge">'+Math.round(movesLeft/10)+'</span><span class="paramValue">&nbsp;/&nbsp;'+Math.round(move/10)+'</span><br>');
    }
    if (hpLeft >= pop[unitIndex].hp) {
        $('#unitInfos').append('<span class="paramName">PDV</span><span class="paramValue">'+hpLeft+'</span><span class="paramValue">&nbsp;/&nbsp;'+pop[unitIndex].hp+'</span><br>');
    } else {
        $('#unitInfos').append('<span class="paramName">PDV</span><span class="paramValue rouge">'+hpLeft+'</span><span class="paramValue">&nbsp;/&nbsp;'+pop[unitIndex].hp+'</span><br>');
    }
    $('#unitInfos').append('<span class="paramName">Attaque</span><span class="paramValue">'+attaque+'&nbsp;/&nbsp;'+pop[unitIndex].attaque+'</span><br>');
    $('#unitInfos').append('<span class="paramName">Défense</span><span class="paramValue">'+defense+'&nbsp;/&nbsp;'+pop[unitIndex].defense+'</span><br>');
    $('#unitInfos').append('<span class="paramName">Puissance</span><span class="paramValue">'+pop[unitIndex].puissance+'</span><br>');
    $('#unitInfos').append('<span class="paramName">Couverture</span><span class="paramValue">'+pop[unitIndex].coverAdj+'%</span><br>');
};
function showTileInfos(tileId,linked) {
    $('#tileInfos').empty();
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let terMvCost = ter[terrainIndex].moveCost;
    let terMvCostRoad = ter[terrainIndex].moveCostRoad;
    let terCover = ter[terrainIndex].cover;
    let terDefense = ter[terrainIndex].defense;
    if (perso.mapCarto.includes(tileId)) {
        if (world[tileIndex].flags.includes('river_')) {
            terMvCost = terMvCost+20;
        }
        terMvCost = Math.round(terMvCost*80/100);
        terCover = Math.round((terCover*110/100)+10);
        terDefense = Math.round((terDefense*110/100)+10);
    } else {
        if (world[tileIndex].flags.includes('river_')) {
            terMvCost = terMvCost+40;
        }
    }
    if (linked) {
        $('#tileInfos').append('<h3>'+capitalizeFirstLetter(world[tileIndex].terrain)+'</h3>');
    } else {
        $('#tileInfos').append('<h4>'+capitalizeFirstLetter(world[tileIndex].terrain)+'</h4>');
    }
    if (perso.mapCarto.includes(tileId)) {
        $('#tileInfos').append('<span class="paramName">Cartographié</span><span class="paramValue">Oui</span><br>');
    }
    $('#tileInfos').append('<span class="paramName">Id</span><span class="paramValue">'+world[tileIndex].id+'</span><br>');
    $('#tileInfos').append('<span class="paramName">Coordonnées</span><span class="paramValue">'+world[tileIndex].x+'.'+world[tileIndex].y+'</span><br>');
    if (world[tileIndex].flags.includes('road_')) {
        $('#tileInfos').append('<span class="paramName">Coûts Mvmt</span><span class="paramValue">'+Math.round(terMvCost*10)/100+' ('+Math.round(terMvCostRoad*10)/100+')</span><br>');
    } else {
        $('#tileInfos').append('<span class="paramName">Coûts Mvmt</span><span class="paramValue">'+Math.round(terMvCost*10)/100+'</span><br>');
    }
    $('#tileInfos').append('<span class="paramName">Couverture</span><span class="paramValue">'+terCover+'%</span><br>');
    $('#tileInfos').append('<span class="paramName">Défense</span><span class="paramValue">'+terDefense+'%</span><br>');
};
