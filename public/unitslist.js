function showTileUnitList(tileId) {
    $('#tileUnitList').empty();
    let ownUnitsHere = 0;
    let numSameType = 1;
    let gfollow = null;
    let sortedPop = _.sortBy(_.sortBy(_.sortBy(pop,'number'),'type'),'follow');
    sortedPop.forEach(function(unit) {
        if (unit.tileId == tileId) {
            if (unit.player == pseudo) {
                ownUnitsHere = ownUnitsHere+1;
                if (unit.follow >= 1) {
                    gfollow = unit.follow;
                } else {
                    gfollow = 0;
                }
                if (selectedUnit.id == unit.id) {
                    $('#tileUnitList').append('<span class="unitNum mauve">'+unit.number+'</span> <span class="unitType mauve">'+unit.type+'</span><span class="unitOwner mauve">'+unit.player+'</span>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="groupSwitch('+unit.id+','+selectedUnit.follow+')"><span class="paramValue"><b>&laquo;&laquo;&laquo; '+gfollow+'</b></span></a><br>');
                } else {
                    if (unit.type == selectedUnit.type) {
                        numSameType = numSameType+1;
                    }
                    if (unit.follow >= 1 && unit.follow == selectedUnit.follow) {
                        $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'" onclick="selectUnitFromTileInfoList(this)"><span class="unitNum">'+unit.number+'</span> <span class="unitType">'+unit.type+'</span><span class="unitOwner">'+unit.player+'</span></a>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="groupSwitch('+unit.id+','+selectedUnit.follow+')"><span class="paramValue"><b>&laquo; '+gfollow+'</b></span></a><br>');
                    } else {
                        $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'" onclick="selectUnitFromTileInfoList(this)"><span class="unitNum">'+unit.number+'</span> <span class="unitType">'+unit.type+'</span><span class="unitOwner">'+unit.player+'</span></a>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="groupSwitch('+unit.id+','+selectedUnit.follow+')"><span class="paramValue"><b>'+gfollow+'</b></span></a><br>');
                    }
                }
            }
        }
    });
    if (numSameType >= 2) {
        $('#tileUnitList').append('<br><button type="button" name="join" id="joinButton" onclick="joinUnits('+selectedUnit.id+',`'+selectedUnit.type+'`,'+selectedUnit.tileId+',`'+pseudo+'`)">Join all '+selectedUnit.type+' units</button>');
    }
    if (selectedUnit.number >= 2) {
        splitButtons(selectedUnit.id);
    }
    if (ownUnitsHere >= 2) {
        $('#tileUnitList').append('<button type="button" name="newGroup" id="newGroup" onclick="createGroup('+selectedUnit.id+')">New Group</button>');
    }
};
