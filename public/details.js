// SHOW INFOS

// SQUAD DETAIL ---------------------------------------------------------------------------------------------------------
function showUnitInfos(unitId) {
    $('#unitInfos').empty();
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let move = pop[unitIndex].move;
    let moveAdj = pop[unitIndex].moveAdj;
    let fatigue = pop[unitIndex].fatigue;
    let endurance = pop[unitIndex].endurance;
    if (fatigue+endurance < 0) {fatigue = 0-endurance;};
    let movesLeft = move-fatigue;
    let defense = calcBaseDefense(unitId);
    let attaque = calcBaseAttaque(unitId);
    // Number + Type
    $('#unitInfos').append('<span class="blockTitle"><h3 id="squadTitle">'+pop[unitIndex].number+' '+xType(unitId,false)+'</h3></span>');
    if (pop[unitIndex].onTrack >= 1) {
        $("#squadTitle").addClass("bleu");
    }
    // LOUPE EXPAND
    $('#unitInfos').append('<span class="loupe klik" id="expSquad" onclick="toggleExpandSquadDetail('+unitId+')"><i class="fas fa-search-plus"></i></span><br>');
    if (expSquadDetail) {
        $('#expSquad').empty().append('<i class="fas fa-search-minus"></i>');
    } else {
        $('#expSquad').empty().append('<i class="fas fa-search-plus"></i>');
    }
    // Player
    $('#unitInfos').append('<span class="paramName">Propriétaire</span><span class="paramValue">'+pop[unitIndex].player+'</span><br>');
    // Move
    $('#unitInfos').append('<span class="paramName">Mouvements</span><span id="infosMovesLeft" class="paramValue">'+displayMove(pop[unitIndex].move,pop[unitIndex].fatigue)+'</span><br>');
    // track follow
    if (pop[unitIndex].onTrack >= 1) {
        let trackIndex = myTracks.findIndex((obj => obj.id == pop[unitIndex].onTrack));
        $('#unitInfos').append('<span class="paramName bleu">Mouvement auto</span><span class="paramValue bleu">'+myTracks[trackIndex].name+'</span><br>');
    }
    // EXPAND ONLY
    if (expSquadDetail) {
        // HP
        $('#unitInfos').append('<span class="paramName">PDV</span><span class="paramValue">'+pop[unitIndex].hp+'</span><br>');
        // attaque
        $('#unitInfos').append('<span class="paramName">Attaque</span><span class="paramValue">'+attaque+'&nbsp;/&nbsp;'+pop[unitIndex].attaque+'</span><br>');
        // défense
        $('#unitInfos').append('<span class="paramName">Défense</span><span class="paramValue">'+defense+'&nbsp;/&nbsp;'+pop[unitIndex].defense+'</span><br>');
        // puissance
        $('#unitInfos').append('<span class="paramName">Puissance</span><span class="paramValue">'+pop[unitIndex].puissance+'</span><br>');
        // couverture
        $('#unitInfos').append('<span class="paramName">Couverture</span><span class="paramValue">'+pop[unitIndex].coverAdj+'%</span><br>');
        // direction
        $('#unitInfos').append('<span class="paramName low">Direction</span><span class="paramValue low">#'+pop[unitIndex].prevTileId+' &nbsp;<i class="fas fa-caret-right"></i><i class="fas fa-caret-right"></i> #'+pop[unitIndex].tileId+'</span><br>');
        // id
        $('#unitInfos').append('<span class="paramName low">id</span><span class="paramValue low">#'+pop[unitIndex].id+'</span><br>');
    }
};
function displayMove(move,fatigue) {
    let shape = Math.round((move-fatigue)/(move/2)*100);
    if (shape > 100) {shape = 100;};
    if (shape < 100) {
        return '<span class="rouge">'+Math.round((move-fatigue)/10)+'</span>/'+Math.round(move/10);
    } else if (fatigue >= 1) {
        return '<span class="orange">'+Math.round((move-fatigue)/10)+'</span>/'+Math.round(move/10);
    } else {
        return Math.round((move-fatigue)/10)+'/'+Math.round(move/10);
    }
};
function toggleExpandSquadDetail(unitId) {
    if (expSquadDetail) {
        expSquadDetail = false;
    } else {
        expSquadDetail = true;
    }
    showUnitInfos(unitId);
    let detail = {squad:expSquadDetail,tile:expTileDetail};
    perso.prefs.detail = detail;
    emitPlayersChange(perso);
}

// TILE DETAIL ---------------------------------------------------------------------------------------------------------
function showTileInfos(tileId,linked,cssId) {
    let cssi = cssId;
    if (cssId == '' || cssId == undefined) {
        cssi = '#tileInfos';
    }
    $(cssi).empty();
    showTracksList(tileId);
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
    // NOM
    if (world[tileIndex].tileName != '') {
        let lieu = world[tileIndex].tileName;
        $(cssi).append('<span class="blockTitle"><h3 class="vert">'+capitalizeFirstLetter(lieu)+'</h3></span>');
    }
    // TYPE TERRAIN
    $(cssi).append('<span class="blockTitle"><'+linkH+'>'+terName(ter[terrainIndex].name)+'<span class="detailIcons">'+showCarto+'</span></'+linkH+'></span>');
    // LOUPE EXPAND
    if (cssi != '#tileDetails') {
        $(cssi).append('<span class="loupe klik" id="expTile" onclick="toggleExpandTileDetail('+tileId+','+linked+')"></span><br>');
        if (expTileDetail) {
            $('#expTile').empty().append('<i class="fas fa-search-minus"></i>');
        } else {
            $('#expTile').empty().append('<i class="fas fa-search-plus"></i>');
        }
    } else {
        $(cssi).append('<br>');
    }
    // Terrain SPEC
    let spec = terSpec(ter[terrainIndex].name);
    if (spec != '') {
        $(cssi).append('<span class="paramName">Type</span><span class="paramValue">'+spec+'</span><br>');
    }
    // Coordonnées + id
    $(cssi).append('<span class="paramName">Coordonnées</span><span class="paramValue">'+world[tileIndex].x+'&lrhar;'+world[tileIndex].y+' <span class="low">&nbsp;#'+world[tileIndex].id+'</span></span><br>');
    // EXPAND ONLY
    if (expTileDetail) {
        // escarpement, végétation, innondation
        $(cssi).append('<span class="paramName">Escarpement</span><span class="paramValue">'+ter[terrainIndex].escarpement+'</span><br>');
        $(cssi).append('<span class="paramName">Végétation</span><span class="paramValue">'+ter[terrainIndex].vegetation+'</span><br>');
        $(cssi).append('<span class="paramName">Innondation</span><span class="paramValue">'+ter[terrainIndex].innondation+'</span><br>');
        // move cost
        if (world[tileIndex].flags.includes('road_')) {
            $(cssi).append('<span class="paramName">Coûts Mvmt</span><span class="paramValue">'+Math.round(terMvCost*10)/100+' ('+Math.round(terMvCostRoad*10)/100+')</span><br>');
        } else if (ter[terrainIndex].innondation >= 70) {
            $(cssi).append('<span class="paramName">Coûts Mvmt</span><span class="paramValue">'+Math.round(waterMvCost*10)/100+'</span><br>');
        } else {
            $(cssi).append('<span class="paramName">Coûts Mvmt</span><span class="paramValue">'+Math.round(terMvCost*10)/100+'</span><br>');
        }
        // couverture
        $(cssi).append('<span class="paramName">Couverture</span><span class="paramValue">'+terCover+'%</span><br>');
        // defense
        $(cssi).append('<span class="paramName">Défense</span><span class="paramValue">'+terDefense+'%</span><br>');
        // RENOMMER LE TERRAIN
        let renameLink = 'Nommer';
        if (world[tileIndex].tileName != '') {
            renameLink = 'Renommer';
        }
        $(cssi).append('<span class="paramName"><a href="#" onclick="renameTile('+tileId+')">'+renameLink+'</a></span><br>');
    }
    if (ter[terrainIndex].illu != '') {
        $(cssi).append('<span class="loupe infoBiome klik"><i class="fas fa-image"></i><span><img src="/static/img/biomes/'+ter[terrainIndex].illu+'.jpg" width="600"></span></span><br>');
    }
};
function toggleExpandTileDetail(tileId,linked) {
    if (expTileDetail) {
        expTileDetail = false;
    } else {
        expTileDetail = true;
    }
    showTileInfos(tileId,linked);
    let detail = {squad:expSquadDetail,tile:expTileDetail};
    perso.prefs.detail = detail;
    emitPlayersChange(perso);
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
