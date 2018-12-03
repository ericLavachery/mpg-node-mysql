// SHOW INFOS
// TILE DETAIL ---------------------------------------------------------------------------------------------------------
function showTileInfos(tileId,linked) {
    showTracksList(tileId);
    $('#tileInfos').empty();
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    selectedTile = world[tileIndex];
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    selectedTile.terrain = ter[terrainIndex].name;
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
    if (world[tileIndex].tileName != '') {
        let lieu = world[tileIndex].tileName;
        $('#tileInfos').append('<span class="blockTitle"><h3 class="vert">'+capitalizeFirstLetter(lieu)+'</h3></span>');
    }
    $('#tileInfos').append('<span class="blockTitle"><'+linkH+'>'+capitalizeFirstLetter(ter[terrainIndex].name)+'<span class="detailIcons">'+showCarto+'</span></'+linkH+'></span>');
    $('#tileInfos').append('<span class="loupe klik" id="expTile" onclick="toggleExpandTileDetail('+tileId+','+linked+')"></span><br>');
    if (expTileDetail) {
        $('#expTile').empty().append('<i class="fas fa-search-minus"></i>');
    } else {
        $('#expTile').empty().append('<i class="fas fa-search-plus"></i>');
    }
    $('#tileInfos').append('<span class="paramName">Coordonnées</span><span class="paramValue">'+world[tileIndex].x+'.'+world[tileIndex].y+'</span><br>');
    if (expTileDetail) {
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
        $('#tileInfos').append('<span class="paramName">Id</span><span class="paramValue">'+world[tileIndex].id+'</span><br>');
        let renameLink = 'Nommer';
        if (world[tileIndex].tileName != '') {
            renameLink = 'Renommer';
        }
        $('#tileInfos').append('<span class="paramName"><a href="#" onclick="renameTile('+tileId+')">'+renameLink+'</a></span><br>');
    }
};
function toggleExpandTileDetail(tileId,linked) {
    if (expTileDetail) {
        expTileDetail = false;
    } else {
        expTileDetail = true;
    }
    showTileInfos(tileId,linked);
}
function renameTile(tileId) {
    let newName = prompt('Donnez un nom à cet emplacement :');
    if (newName != null) {
        if (newName.length >= 3 && newName.length <= 24) {
            let tileIndex = world.findIndex((obj => obj.id == tileId));
            world[tileIndex].tileName = newName;
            // XXXXX emit / save / broadcast !!!!
            emitSingleWorldChange(tileId,'tileName',newName);
            showTileInfos(tileId,true);
        } else {
            // message d'erreur
        }
    }
};
// SQUAD DETAIL ---------------------------------------------------------------------------------------------------------
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
    $('#unitInfos').append('<span class="blockTitle"><h3>'+pop[unitIndex].number+' '+xType(unitId)+'</h3></span>');
    $('#unitInfos').append('<span class="loupe klik" id="expSquad" onclick="toggleExpandSquadDetail('+unitId+')"><i class="fas fa-search-plus"></i></span><br>');
    if (expSquadDetail) {
        $('#expSquad').empty().append('<i class="fas fa-search-minus"></i>');
    } else {
        $('#expSquad').empty().append('<i class="fas fa-search-plus"></i>');
    }
    $('#unitInfos').append('<span class="paramName">Propriétaire</span><span class="paramValue">'+pop[unitIndex].player+'</span><br>');
    if (shape >= 100) {
        $('#unitInfos').append('<span class="paramName">Mouvements</span><span id="infosMovesLeft" class="paramValue">'+Math.round(movesLeft/10)+'</span><span class="paramValue">&nbsp;/&nbsp;'+Math.round(move/10)+'</span><br>');
    } else {
        $('#unitInfos').append('<span class="paramName">Mouvements</span><span id="infosMovesLeft" class="paramValue rouge">'+Math.round(movesLeft/10)+'</span><span class="paramValue">&nbsp;/&nbsp;'+Math.round(move/10)+'</span><br>');
    }
    if (expSquadDetail) {
        if (hpLeft >= pop[unitIndex].hp) {
            $('#unitInfos').append('<span class="paramName">PDV</span><span class="paramValue">'+hpLeft+'</span><span class="paramValue">&nbsp;/&nbsp;'+pop[unitIndex].hp+'</span><br>');
        } else {
            $('#unitInfos').append('<span class="paramName">PDV</span><span class="paramValue rouge">'+hpLeft+'</span><span class="paramValue">&nbsp;/&nbsp;'+pop[unitIndex].hp+'</span><br>');
        }
        $('#unitInfos').append('<span class="paramName">Attaque</span><span class="paramValue">'+attaque+'&nbsp;/&nbsp;'+pop[unitIndex].attaque+'</span><br>');
        $('#unitInfos').append('<span class="paramName">Défense</span><span class="paramValue">'+defense+'&nbsp;/&nbsp;'+pop[unitIndex].defense+'</span><br>');
        $('#unitInfos').append('<span class="paramName">Puissance</span><span class="paramValue">'+pop[unitIndex].puissance+'</span><br>');
        $('#unitInfos').append('<span class="paramName">Couverture</span><span class="paramValue">'+pop[unitIndex].coverAdj+'%</span><br>');
        $('#unitInfos').append('<span class="paramName">Sur</span><span class="paramValue">'+pop[unitIndex].tileId+'</span><br>');
        $('#unitInfos').append('<span class="paramName">Vient de</span><span class="paramValue">'+pop[unitIndex].prevTileId+'</span><br>');
    }
};
function toggleExpandSquadDetail(unitId) {
    if (expSquadDetail) {
        expSquadDetail = false;
    } else {
        expSquadDetail = true;
    }
    showUnitInfos(unitId);
}
