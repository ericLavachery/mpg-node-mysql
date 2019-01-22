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
    $('#unitInfos').append('<span class="paramName">Propriétaire</span><span class="paramIcon"></span><span class="paramValue">'+pop[unitIndex].player+'</span><br>');
    if (pop[unitIndex].move >= 1) {
        // Move
        $('#unitInfos').append('<span class="paramName">Mouvements</span><span class="paramIcon"><i class="fas fa-walking"></i></span><span id="infosMovesLeft" class="paramValue">'+displayMove(pop[unitIndex].move,pop[unitIndex].fatigue)+'</span><br>');
    }
    // track follow
    if (pop[unitIndex].onTrack >= 1) {
        let trackIndex = myTracks.findIndex((obj => obj.id == pop[unitIndex].onTrack));
        $('#unitInfos').append('<span class="paramName bleu">Mouvement auto</span><span class="paramIcon"><i class="fas fa-shoe-prints"></i></span><span class="paramValue bleu">'+myTracks[trackIndex].name+'</span><br>');
    }
    // EXPAND ONLY
    if (expSquadDetail) {
        if (pop[unitIndex].attitude != 'i') {
            // attitude
            let attitude = displayAttitude(pop[unitIndex].attitude);
            $('#unitInfos').append('<span class="paramName">Attitude</span><span class="paramIcon"></span><span class="paramValue" title="'+attitude.expl+'">'+attitude.name+'</span><br>');
            // Organisation
            let org = calcOrg(unitId);
            $('#unitInfos').append('<span class="paramName">Organisation</span><span class="paramIcon"></span><span class="paramValue">'+org+'/'+pop[unitIndex].org+'</span><br>');
        }
        if (pop[unitIndex].puissance >= 1) {
            // HP
            $('#unitInfos').append('<span class="paramName">PDV</span><span class="paramIcon"><i class="far fa-heart"></i></span><span class="paramValue">'+pop[unitIndex].hp+'</span><br>');
            // armure
            $('#unitInfos').append('<span class="paramName">Armure</span><span class="paramIcon"><i class="ra ra-vest"></i></span><span class="paramValue">'+pop[unitIndex].armure+'</span><br>');
            // esquive
            $('#unitInfos').append('<span class="paramName">Esquive</span><span class="paramIcon"><i class="ra ra-player-dodge"></i></span><span class="paramValue">'+pop[unitIndex].esquive+'</span><br>');
            // parade
            $('#unitInfos').append('<span class="paramName">Parade</span><span class="paramIcon"><i class="fas fa-shield-alt"></i></span><span class="paramValue">'+pop[unitIndex].parade+'</span><br>');
            if (pop[unitIndex].portee >= 1) {
                // portee
                $('#unitInfos').append('<span class="paramName">Portée</span><span class="paramIcon"></span><span class="paramValue">'+pop[unitIndex].portee+'</span><br>');
            }
            // actions
            $('#unitInfos').append('<span class="paramName">Actions</span><span class="paramIcon"></span><span class="paramValue">'+pop[unitIndex].actions+'</span><br>');
            // attaque
            let attaque = calcBaseAttaque(unitId);
            $('#unitInfos').append('<span class="paramName">Précision (attaque)</span><span class="paramIcon"><i class="ra ra-sword"></i></span><span class="paramValue">'+attaque+'/'+pop[unitIndex].attaque+'</span><br>');
            // défense
            let defense = calcBaseDefense(unitId);
            $('#unitInfos').append('<span class="paramName">Précision (défense)</span><span class="paramIcon"><i class="ra ra-sword"></i></span><span class="paramValue">'+defense+'/'+pop[unitIndex].defense+'</span><br>');
            // puissance
            $('#unitInfos').append('<span class="paramName">Puissance</span><span class="paramIcon"><i class="fas fa-fist-raised"></i></span><span class="paramValue">'+pop[unitIndex].puissance+'</span><br>');
            // couverture
            $('#unitInfos').append('<span class="paramName">Couverture</span><span class="paramIcon"></span><span class="paramValue">'+pop[unitIndex].coverAdj+'%</span><br>');
        }
        if (pop[unitIndex].detection >= 1) {
            // detection
            $('#unitInfos').append('<span class="paramName">Détection</span><span class="paramIcon"><i class="far fa-eye"></i></span><span class="paramValue">'+pop[unitIndex].detection+'</span><br>');
            // discretion
            $('#unitInfos').append('<span class="paramName">Discrétion</span><span class="paramIcon"><i class="ra ra-hood"></i></span><span class="paramValue">'+pop[unitIndex].discretion+'</span><br>');
        }
        if (pop[unitIndex].charge >= 1) {
            // charge
            $('#unitInfos').append('<span class="paramName">Charge</span><span class="paramIcon"></span><span class="paramValue" title="Nombre de Enk transportable (sans réduction de mouvement)">'+pop[unitIndex].charge+' ('+pop[unitIndex].charge*pop[unitIndex].number+')</span><br>');
        }
        if (pop[unitIndex].contenu >= 1) {
            // contenu
            $('#unitInfos').append('<span class="paramName">Contenu</span><span class="paramIcon"></span><span class="paramValue" title="Nombre de Enk (en ressources uniquement) pouvant être contenu">'+pop[unitIndex].contenu+' ('+pop[unitIndex].contenu*pop[unitIndex].number+')</span><br>');
        }
        if (pop[unitIndex].fardeau >= 1) {
            // fardeau
            $('#unitInfos').append('<span class="paramName">Fardeau</span><span class="paramIcon"><i class="fas fa-people-carry"></i></span><span class="paramValue" title="Nombre de Enk transportable (avec réduction de mouvement)">'+pop[unitIndex].fardeau+' ('+pop[unitIndex].fardeau*pop[unitIndex].number+')</span><br>');
        }
        // enk
        $('#unitInfos').append('<span class="paramName">Encombrement (Enk)</span><span class="paramIcon"><i class="ra ra-kettlebell"></i></span><span class="paramValue" title="Unité de mesure comprenant poids et taille">'+pop[unitIndex].enk+' ('+pop[unitIndex].enk*pop[unitIndex].number+')</span><br>');
        // direction
        $('#unitInfos').append('<span class="paramName low">Direction</span><span class="paramIcon"></span><span class="paramValue low"><span title="id terrain précédent">#'+pop[unitIndex].prevTileId+'</span> &nbsp;<i class="fas fa-caret-right"></i><i class="fas fa-caret-right"></i> <span title="id terrain actuel">#'+pop[unitIndex].tileId+'</span></span><br>');
        // id
        $('#unitInfos').append('<span class="paramName low">id</span><span class="paramIcon"></span><span class="paramValue low" title="id bataillon">#'+pop[unitIndex].id+'</span><br>');
    }
};
function calcOrg(unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let org = pop[unitIndex].org;
    let group = pop[unitIndex].follow;
    if (group >= 1) {
        let groupNumber = 0;
        let groupOrg = 0;
        let bestOrg = 0;
        let unitOrg = 0;
        let groupPop = _.filter(pop, function(unit) {
            return (unit.follow == group && unit.player === pseudo && unit.tileId == pop[unitIndex].tileId && unit.org >= 0);
        });
        groupPop.forEach(function(unit) {
            groupNumber = groupNumber+unit.number;
            if (unit.org == 0) {
                unitOrg = 100;
            } else {
                unitOrg = unit.org;
            }
            if (unit.fatigue > Math.round(unit.move/2)) {
                unitOrg = Math.round(unitOrg/3);
            }
            groupOrg = groupOrg+(unitOrg*unit.number);
            if (unitOrg > bestOrg) {
                bestOrg = unitOrg;
            }
        });
        org = Math.round((Math.round(groupOrg/groupNumber)+bestOrg)/2);
    } else {
        if (pop[unitIndex].fatigue > Math.round(pop[unitIndex].move/2)) {
            org = Math.round(org/3);
        } else {
            org = pop[unitIndex].org;
        }
    }
    if (org < 1) {
        org = 1;
    }
    return org;
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
function displayAttitude(att) {
    let attitude = {name:'',expl:''};
    switch (att) {
        case 'at':
        attitude.name = 'AT';
        attitude.expl = "Attitude face à l'ennemi : Attaque";
        break;
        case 'ass':
        attitude.name = 'ASS';
        attitude.expl = "Attitude face à l'ennemi : Attaque sauf si c'est du suicide";
        break;
        case 'amn':
        attitude.name = 'AMN';
        attitude.expl = "Attitude face à l'ennemi : Attaque si est supérieur en nombre";
        break;
        case 'af':
        attitude.name = 'AF';
        attitude.expl = "Attitude face à l'ennemi : Attaque si est supérieur";
        break;
        case 'd':
        attitude.name = 'FD';
        attitude.expl = "Attitude face à l'ennemi : Essaie de fuir, sinon se défend";
        break;
        case 'f':
        attitude.name = 'FR';
        attitude.expl = "Attitude face à l'ennemi : Essaie de fuir, sinon se rend";
        break;
        case 'i':
        attitude.name = 'NA';
        attitude.expl = "Attitude face à l'ennemi : Sans objet";
        break;
    }
    return attitude;
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
    // BLOCK NOM et VILLES
    $('#tileName').empty();
    if (world[tileIndex].tileName != '' || world[tileIndex].flags.includes('city_') || world[tileIndex].flags.includes('village_')) {
        $('#tileName').append('<div class="woodBlock" id="nameInfos"></div>');
    }
    // NOM
    let lieu = 'Inconnu';
    if (world[tileIndex].tileName != '') {
        lieu = world[tileIndex].tileName;
    }
    $('#nameInfos').empty().append('<span class="blockTitle"><h3 class="vert">'+capitalizeFirstLetter(lieu)+'</h3></span>');
    // VILLE?
    if (world[tileIndex].flags.includes('city_') || world[tileIndex].flags.includes('village_')) {
        let vType = 'village';
        let vFlag = 'village';
        if (world[tileIndex].flags.includes('city_')) {
            vType = 'ville';
            vFlag = 'city';
        }
        let vNation = '';
        let disTown = '';
        towns.forEach(function(town) {
            disTown = vFlag+'_'+town.icon.replace('-v','').replace('-c','')+'_';
            if (world[tileIndex].flags.includes(disTown)) {
                vNation = town.nation;
            }
        });
        $('#nameInfos').append('<span class="paramName vert">'+capitalizeFirstLetter(vType)+'</span><span class="paramValue vert">'+capitalizeFirstLetter(vNation)+'</span><br>');
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
    }
    if (ter[terrainIndex].illu != '') {
        $(cssi).append('<span class="loupe infoBiome klik"><i class="fas fa-image"></i><span><img src="/static/img/biomes/'+ter[terrainIndex].illu+'.jpg" width="600"></span></span><span class="bigSpace"></span>');
    }
    if (linked) {
        // RENOMMER LE TERRAIN
        let renameLink = 'Nommer';
        if (world[tileIndex].tileName != '') {
            renameLink = 'Renommer';
        }
        $(cssi).append('<span class="loupe klik" onclick="renameTile('+tileId+')" title="'+renameLink+' ce lieu"><i class="ra ra-wooden-sign"></i></span><span class="bigSpace"></span>');
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
