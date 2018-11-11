function showTileUnitList(tileId) {
    $('#tileUnitList').empty();
    let ownerShort = '';
    let unitsHere = 0;
    let ownUnitsHere = 0;
    let ownNonBldUnitsHere = 0;
    let numSameType = 1;
    let gfollow = null;
    let popHere = _.filter(pop, function(unit) {
        return (unit.tileId == tileId);
    });
    let sortedPopHere = _.sortBy(_.sortBy(_.sortBy(_.sortBy(popHere,'number'),'type'),'follow'),'player');
    sortedPopHere.forEach(function(unit) {
        unitsHere = unitsHere+1;
        ownerShort = unit.player.substring(0,4);
        if (unit.player == pseudo) {
            if (unit.cat != 'bld' && unit.cat != 'bsp') {
                ownNonBldUnitsHere = ownNonBldUnitsHere+1;
            }
            ownUnitsHere = ownUnitsHere+1;
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
        } else {
            uListOthers(unit,ownerShort,gfollow);
        }
    });
    // all active group in yellow when in move mode
    if (mode == 'g_move') {
        $('.inGroup').addClass('jaune');
    }
    $('#tileUnitList').append('<div class="espace"></div>');
    // bouton JOIN
    if (numSameType >= 2 && selectedUnit.id >= 1 && selectedUnit.cat != 'bld' && selectedUnit.cat != 'bsp') {
        let groupInfo = '';
        if (selectedUnit.follow >= 1) {
            groupInfo = ' of group '+selectedUnit.follow
        } else {
            groupInfo = ' not in groups';
        }
        $('#tileUnitList').append('<button type="button" name="join" id="joinButton" onclick="joinUnits('+selectedUnit.id+',`'+selectedUnit.type+'`,'+selectedUnit.tileId+',`'+pseudo+'`)" title="Join all '+selectedUnit.type+' units'+groupInfo+'">Join Units</button>');
    }
    // bouton SPLIT
    if (selectedUnit.number >= 2 && selectedUnit.id >= 1 && selectedUnit.cat != 'bld' && selectedUnit.cat != 'bsp') {
        splitButtons(selectedUnit.id);
    }
    // bouton NEW GROUP
    if (ownUnitsHere >= 2 && selectedUnit.id >= 1) {
        $('#tileUnitList').append('<button type="button" name="newGroup" id="newGroup" onclick="createGroup('+selectedUnit.id+')">New Group</button>');
    }
};
function uListSelected(unit,ownerShort,gfollow) {
    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'" onclick="selectUnit('+unit.id+')"><span class="unitNum jaune">'+unit.number+'</span> <span class="unitType jaune">'+unit.type+'</span><span class="unitOwner jaune">'+ownerShort+'</span></a>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="groupSwitch('+unit.id+','+selectedUnit.follow+')"><span class="paramValue jaune"><b><i class="fas fa-check-circle"></i> '+gfollow+' <i class="fas fa-ruler-horizontal"></i></b></span></a><br>');
};
function uListSelectedGroup(unit,ownerShort,gfollow) {
    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'" onclick="selectUnit('+unit.id+')"><span class="unitNum inGroup">'+unit.number+'</span> <span class="unitType inGroup">'+unit.type+'</span><span class="unitOwner">'+ownerShort+'</span></a>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="groupSwitch('+unit.id+','+selectedUnit.follow+')"><span class="paramValue"><b><i class="fas fa-check-circle"></i> '+gfollow+'</b></span></a><br>');
};
function uListOwner(unit,ownerShort,gfollow) {
    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'" onclick="selectUnit('+unit.id+')"><span class="unitNum">'+unit.number+'</span> <span class="unitType">'+unit.type+'</span><span class="unitOwner">'+ownerShort+'</span></a>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="groupSwitch('+unit.id+','+selectedUnit.follow+')"><span class="paramValue"><b><i class="far fa-circle"></i> '+gfollow+'</b></span></a><br>');
};
function uListOthers(unit,ownerShort,gfollow) {
    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'"><span class="unitNum grisf">'+unit.number+'</span> <span class="unitType grisf">'+unit.type+'</span></a><br>');
};
function uListOthersIdentified(unit,ownerShort,gfollow) {
    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'"><span class="unitNum grisf">'+unit.number+'</span> <span class="unitType grisf">'+unit.type+'</span><span class="unitOwner grisf">'+ownerShort+'</span></a><br>');
};
