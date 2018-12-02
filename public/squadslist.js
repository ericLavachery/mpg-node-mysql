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
            if (unit.type == selectedUnit.type) {
                numSameType = numSameType+1;
            }
            if (unit.follow >= 1 && unit.follow == selectedUnit.follow) {
                uListSelectedGroup(unit,ownerShort,gfollow);
            } else {
                uListOwner(unit,ownerShort,gfollow);
            }
        }
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
        if (isSpace) {$('#tileUnitList').append('<span class="butSpace"></span><span class="butSpace"></span>');}
        splitButton(selectedUnit.id);
        isSpace = true;
    }
    // bouton NEW GROUP
    if (ownSquadsHere >= 2 && selectedUnit.id >= 1) {
        if (isSpace) {$('#tileUnitList').append('<span class="butSpace"></span><span class="butSpace"></span>');}
        newGroupButton();
    }
};
function uListSelected(unit,ownerShort,gfollow) {
    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'" onclick="selectUnit('+unit.id+')"><span class="unitNum jaune">'+unit.number+'</span> <span class="unitType jaune">'+xType(unit.id)+'</span><span class="unitOwner jaune">'+ownerShort+'</span></a>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="groupSwitch('+unit.id+','+selectedUnit.follow+')"><span class="paramValue jaune"><b><i class="fas fa-check-circle"></i> '+gfollow+' <i class="fas fa-ruler-horizontal"></i></b></span></a><br>');
};
function uListSelectedGroup(unit,ownerShort,gfollow) {
    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'" onclick="selectUnit('+unit.id+')"><span class="unitNum inGroup">'+unit.number+'</span> <span class="unitType inGroup">'+xType(unit.id)+'</span><span class="unitOwner">'+ownerShort+'</span></a>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="groupSwitch('+unit.id+','+selectedUnit.follow+')"><span class="paramValue"><b><i class="fas fa-check-circle"></i> '+gfollow+'</b></span></a><br>');
};
function uListOwner(unit,ownerShort,gfollow) {
    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'" onclick="selectUnit('+unit.id+')"><span class="unitNum">'+unit.number+'</span> <span class="unitType">'+xType(unit.id)+'</span><span class="unitOwner">'+ownerShort+'</span></a>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="groupSwitch('+unit.id+','+selectedUnit.follow+')"><span class="paramValue"><b><i class="far fa-circle"></i> '+gfollow+'</b></span></a><br>');
};
function uListOthers(unit,ownerShort,gfollow) {
    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'"><span class="unitNum grisf">'+unit.number+'</span> <span class="unitType grisf">'+xType(unit.id)+'</span></a><br>');
};
function uListOthersIdentified(unit,ownerShort,gfollow) {
    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'"><span class="unitNum grisf">'+unit.number+'</span> <span class="unitType grisf">'+xType(unit.id)+'</span><span class="unitOwner grisf">'+ownerShort+'</span></a><br>');
};
function newGroupButton() {
    $('#tileUnitList').append('<button type="button" name="newGroup" title="Créer un nouveau groupe et y mettre le bataillon sélectionné" id="newGroup" onclick="createGroup('+selectedUnit.id+')">Grouper</button>');
};
