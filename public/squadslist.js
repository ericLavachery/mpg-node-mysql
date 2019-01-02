function showTileUnitList(tileId) {
    $('#tileUnitList').empty();
    $('#tileUnitList').append('<span class="blockTitle"><h3>Bataillons</h3></span>');
    $('#tileUnitList').append('<br>');
    let ownerShort = '';
    let squadsHere = 0;
    let ownSquadsHere = 0;
    let ownNonBldSquadsHere = 0;
    let numSameType = 1;
    let gfollow = null;
    // OWN SQUADS
    let ownPopHere = _.filter(pop, function(unit) {
        return (unit.tileId == tileId && unit.player === pseudo);
    });
    let sortedOwnPopHere = _.sortBy(_.sortBy(_.sortBy(ownPopHere,'id'),'type'),'follow');
    sortedOwnPopHere.forEach(function(unit) {
        squadsHere = squadsHere+1;
        ownerShort = unit.player.substring(0,4);
        if (unit.cat != 'bld' && unit.cat != 'bsp') {
            ownNonBldSquadsHere = ownNonBldSquadsHere+1;
        }
        ownSquadsHere = ownSquadsHere+1;
        if (unit.follow >= 1) {
            gfollow = unit.follow;
        } else {
            gfollow = '';
        }
        if (selectedUnit.id == unit.id) {
            uListSelected(selectedUnit,ownerShort,gfollow);
        } else {
            if (unit.type == selectedUnit.type && unit.onTrack == selectedUnit.onTrack && unit.follow == selectedUnit.follow) {
                numSameType = numSameType+1;
            }
            if (unit.follow >= 1 && unit.follow == selectedUnit.follow) {
                uListSelectedGroup(unit,ownerShort,gfollow);
            } else {
                uListOwner(unit,ownerShort,gfollow);
            }
        }
        if (unit.onTrack >= 1) {
            // $("#uc"+unit.id).addClass("bleu");
            $('#tileUnitList').append('<span class="unitTrack" title="'+unit.onTrack+'"><i class="fas fa-lock"></i></span>');
        }
        $('#tileUnitList').append('<br>');
    });
    // OTHER SQUADS
    let otherPopHere = _.filter(pop, function(unit) {
        return (unit.tileId == tileId && unit.player !== pseudo);
    });
    let sortedOtherPopHere = _.sortBy(_.sortBy(_.sortBy(otherPopHere,'type'),'player'),'follow');
    sortedOtherPopHere.forEach(function(unit) {
        if (perso.unitView.includes(unit.id) || perso.bldView.includes(unit.id)) {
            squadsHere = squadsHere+1;
            ownerShort = unit.player.substring(0,4);
            if (perso.unitIdent.includes(unit.id) || perso.bldIdent.includes(unit.id)) {
                uListOthersIdentified(unit,ownerShort,gfollow);
            } else {
                uListOthers(unit,ownerShort,gfollow);
            }
        }
    });
    // all active group in yellow when in move mode
    if (mode == 'g_move') {
        $('.inGroup').addClass('jaune');
    }
    // buttons ACTIONS
    $('#tileUnitList').append('<div class="espace"></div>');
    actionsButtons();
    $('#tileUnitList').append('<div class="espace"></div>');
    let isSpace = false;
    // bouton JOIN
    if (numSameType >= 2 && selectedUnit.id >= 1 && selectedUnit.cat != 'bld' && selectedUnit.cat != 'bsp') {
        joinButton();
        isSpace = true;
    }
    // bouton SPLIT
    if (selectedUnit.number >= 2 && selectedUnit.id >= 1 && selectedUnit.cat != 'bld' && selectedUnit.cat != 'bsp') {
        if (isSpace) {$('#tileUnitList').append('<span class="butSpace"></span>');}
        splitButton(selectedUnit.id);
        isSpace = true;
    }
    // bouton NEW GROUP
    if (ownSquadsHere >= 2 && selectedUnit.id >= 1) {
        if (isSpace) {$('#tileUnitList').append('<span class="butSpace"></span>');}
        newGroupButton();
    }
};
function unitTooltip(unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let unit = pop[unitIndex];
    let dossier = 'icon-other';
    if (unit.player == pseudo) {
        dossier = 'icon-player';
    }
    let pic = 'def.svg';
    let play = 'Inconnu';
    if (perso.unitIdent.includes(unit.id) || perso.bldIdent.includes(unit.id) || unit.player == pseudo) {
        pic = unit.pic;
        play = unit.player;
    }
    let illu = unit.illu;
    let ttip = '<span><img src="/static/img/'+dossier+'/'+pic+'" width="42"><br>'+play+'<img src="/static/img/units/'+illu+'" width="300"></span>'
    return ttip;
};
function uListSelected(unit,ownerShort,gfollow) {
    let ttip = unitTooltip(unit.id);
    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'" onclick="selectUnit('+unit.id+')"><span class="unitNum jaune">'+unit.number+'</span> <span class="unitType jaune tooltip">'+xType(unit.id)+ttip+'</span><span class="unitOwner jaune">'+ownerShort+'</span></a>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="groupSwitch('+unit.id+','+selectedUnit.follow+')"><span class="unitGroup jaune"><i class="fas fa-check-circle"></i> '+gfollow+' <i class="fas fa-ruler-horizontal"></i></span></a><span class="unitMove">'+displayMove(unit.move,unit.fatigue)+'</span>');
};
function uListSelectedGroup(unit,ownerShort,gfollow) {
    let ttip = unitTooltip(unit.id);
    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'" onclick="selectUnit('+unit.id+')"><span class="unitNum inGroup">'+unit.number+'</span> <span class="unitType inGroup tooltip">'+xType(unit.id)+ttip+'</span><span class="unitOwner">'+ownerShort+'</span></a>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="groupSwitch('+unit.id+','+selectedUnit.follow+')"><span class="unitGroup"><i class="fas fa-check-circle"></i> '+gfollow+'</span></a><span class="unitMove">'+displayMove(unit.move,unit.fatigue)+'</span>');
};
function uListOwner(unit,ownerShort,gfollow) {
    let ttip = unitTooltip(unit.id);
    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'" onclick="selectUnit('+unit.id+')"><span class="unitNum">'+unit.number+'</span> <span class="unitType tooltip" id="uc'+unit.id+'">'+xType(unit.id)+ttip+'</span><span class="unitOwner">'+ownerShort+'</span></a>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="groupSwitch('+unit.id+','+selectedUnit.follow+')"><span class="unitGroup"><i class="far fa-circle"></i> '+gfollow+'</span></a><span class="unitMove">'+displayMove(unit.move,unit.fatigue)+'</span>');
};
function uListOthers(unit,ownerShort,gfollow) {
    let ttip = unitTooltip(unit.id);
    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'"><span class="unitNum grisf">'+unit.number+'</span> <span class="unitType grisf tooltip">'+xType(unit.id)+ttip+'</span></a><br>');
};
function uListOthersIdentified(unit,ownerShort,gfollow) {
    let ttip = unitTooltip(unit.id);
    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'"><span class="unitNum grisf">'+unit.number+'</span> <span class="unitType grisf tooltip">'+xType(unit.id)+ttip+'</span><span class="unitOwner grisf">'+ownerShort+'</span></a><br>');
};
function newGroupButton() {
    $('#tileUnitList').append('<button type="button" name="newGroup" title="Créer un nouveau groupe et y mettre le bataillon sélectionné" id="newGroup" onclick="createGroup('+selectedUnit.id+')">Nv. Groupe</button>');
};
