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
    // let uType = xType(unitId);
    $('#unitInfos').append('<h3>'+pop[unitIndex].number+' '+xType(unitId)+'</h3><br>');
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
    showTracksList(tileId);
    $('#tileInfos').empty();
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    selectedTile = world[tileIndex];
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let terMvCost = terMoveCost(tileId,0);
    let terMvCostRoad = roadMoveCost(tileId,0);
    let waterMvCost = waterMoveCost(tileId,0);
    let terCover = calcTerCover(tileId);
    let terDefense = calcTerDefense(tileId);
    if (perso.mapCarto.includes(tileId)) {
        if (world[tileIndex].flags.includes('river_')) {
            terMvCost = terMvCost+20;
        }
        terMvCost = Math.round(terMvCost*80/100);
        terCover = Math.round((terCover*110/100)+10);
        terDefense = Math.round((terDefense*110/100)+10);
    } else {
        if (world[tileIndex].flags.includes('river_')) {
            terMvCost = terMvCost+30;
        }
    }
    let showCarto = '&nbsp;'
    if (perso.mapCarto.includes(tileId)) {
        showCarto = showCarto+' <i class="far fa-map"></i>'
    }
    if (world[tileIndex].flags.includes('road_')) {
        showCarto = showCarto+' <i class="fas fa-grip-vertical"></i>'
    }
    if (world[tileIndex].flags.includes('river_') || world[tileIndex].flags.includes('navig_')) {
        showCarto = showCarto+' <i class="fas fa-water"></i>'
    }
    let linkH = 'h4'
    if (linked) {
        linkH = 'h3';
    }
    $('#tileInfos').append('<'+linkH+'>'+capitalizeFirstLetter(ter[terrainIndex].name)+'<span class="detailIcons">'+showCarto+'</span></'+linkH+'><br>');
    $('#tileInfos').append('<span class="paramName">Id</span><span class="paramValue">'+world[tileIndex].id+'</span><br>');
    $('#tileInfos').append('<span class="paramName">Coordonnées</span><span class="paramValue">'+world[tileIndex].x+'.'+world[tileIndex].y+'</span><br>');
    $('#tileInfos').append('<span class="paramName">Escarpement</span><span class="paramValue">'+ter[terrainIndex].escarpement+'</span><br>');
    $('#tileInfos').append('<span class="paramName">Végétation</span><span class="paramValue">'+ter[terrainIndex].vegetation+'</span><br>');
    $('#tileInfos').append('<span class="paramName">Innondation</span><span class="paramValue">'+ter[terrainIndex].innondation+'</span><br>');
    if (world[tileIndex].flags.includes('road_')) {
        $('#tileInfos').append('<span class="paramName">Coûts Mvmt</span><span class="paramValue">'+Math.round(terMvCost*10)/100+' ('+Math.round(terMvCostRoad*10)/100+')</span><br>');
    } else if (ter[terrainIndex].innondation >= 60) {
        $('#tileInfos').append('<span class="paramName">Coûts Mvmt</span><span class="paramValue">'+Math.round(waterMvCost*10)/100+'</span><br>');
    } else {
        $('#tileInfos').append('<span class="paramName">Coûts Mvmt</span><span class="paramValue">'+Math.round(terMvCost*10)/100+'</span><br>');
    }
    $('#tileInfos').append('<span class="paramName">Couverture</span><span class="paramValue">'+terCover+'%</span><br>');
    $('#tileInfos').append('<span class="paramName">Défense</span><span class="paramValue">'+terDefense+'%</span><br>');
};
