function showTileUnitList(tileId) {
    $('#tileUnitList').empty();
    let numSameType = 1;
    pop.forEach(function(unit) {
        if (unit.tileId == tileId) {
            if (selectedUnit.id == unit.id) {
                $('#tileUnitList').append('<span class="paramName">'+unit.number+' '+unit.type+' '+unit.id+'</span><span class="paramValue">'+unit.player+'&nbsp;&nbsp;<span class="mauve"><b>&laquo;&laquo;&laquo; '+unit.follow+'</b></span></span><br>');
            } else {
                if (unit.type == selectedUnit.type) {
                    numSameType = numSameType+1;
                }
                if (unit.follow >= 1 && unit.follow == selectedUnit.follow) {
                    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'" onclick="selectUnitFromTileInfoList(this)"><span class="paramName">'+unit.number+' '+unit.type+' '+unit.id+'</span><span class="paramValue">'+unit.player+'</span></a>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="followSwitch(this)"><span class="paramValue"><b>&laquo; '+unit.follow+'</b></span></a><br>');
                } else {
                    $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'" onclick="selectUnitFromTileInfoList(this)"><span class="paramName">'+unit.number+' '+unit.type+' '+unit.id+'</span><span class="paramValue">'+unit.player+'</span></a>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="followSwitch(this)"><span class="paramValue"><b>&#8212;</b></span></a><br>');
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
};
// JOIN UNITS
function joinUnits(joinToId,unitType,tileId,owner) {
    let unitIndex = pop.findIndex((obj => obj.id == joinToId));
    let thisMoves = pop[unitIndex].number*(pop[unitIndex].move-pop[unitIndex].fatigue);
    let totalUnits = pop[unitIndex].number;
    let totalMoves = thisMoves;
    let joinToThisUnitMove = pop[unitIndex].move;
    let idsToDelete = '';
    pop.slice().reverse().forEach(function(unit) {
        if (unit.type == unitType && unit.player == owner && unit.tileId == tileId && unit.id != joinToId) {
            if (idsToDelete == '') {
                idsToDelete = unit.id;
            } else {
                idsToDelete = idsToDelete+','+unit.id;
            }
            totalUnits = totalUnits+unit.number;
            thisMoves = unit.number*(unit.move-unit.fatigue);
            totalMoves = totalMoves+thisMoves;
            unitIndex = pop.findIndex((obj => obj.id == unit.id));
            pop.splice(unitIndex,1);
        }
    });
    let movesLeft = Math.round(totalMoves/totalUnits);
    let fatigue = joinToThisUnitMove-movesLeft;
    unitIndex = pop.findIndex((obj => obj.id == joinToId));
    pop[unitIndex].fatigue = fatigue;
    pop[unitIndex].number = totalUnits;
    showUnitInfos(joinToId);
    showTileInfos(pop[unitIndex].tileId,true);
    console.log(idsToDelete);
    socket.emit('join_units', {joinToId: joinToId, fatigue: fatigue, totalUnits: totalUnits, idsToDelete: idsToDelete});
}
// SPLIT UNITS
function splitButtons(unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let unitNumber = pop[unitIndex].number;
    $('#tileUnitList').append('<br><select name="split" id="splitDrop" onchange="splitUnits(this,'+selectedUnit.id+');"><option value="">&nbsp;Split</option></select>');
    let i = 1;
    let sa = 1;
    let sb = unitNumber-sa;
    while (sa <= unitNumber-1) {
        sb = unitNumber-sa;
        $('#splitDrop').append('<option value="'+sa+'">&nbsp;'+sa+':'+sb+'</option>');
        if (sa >= 48) {
            sa = sa+24;
        } else {
            if (sa >= 24) {
                sa = sa+6;
            } else {
                sa = sa+1;
            }
        }
        i = i+1;
        if (i >= 100) {break;}
    }
}
function splitUnits(sel,splitedUnitId) {
    socket.emit('split_unit', {splitedUnitId: splitedUnitId, splitValue: sel.value});
}
function followSwitch(listItem) {
    let followerId = listItem.id.substring(10);
    let followerUnitIndex = pop.findIndex((obj => obj.id == followerId));
    let selUnitIndex = pop.findIndex((obj => obj.id == selectedUnit.id));
    if (selectedUnit.id >= 1) {
        if (selectedUnit.follow == 0) {
            selectedUnit.follow = selectedUnit.id;
        }
        if (pop[followerUnitIndex].follow == 0 || pop[followerUnitIndex].follow != selectedUnit.follow) {
            if (pop[followerUnitIndex].follow == followerId) {
                // guru removed from another group : elect new guru
                followShift(followerId);
            }
            pop[followerUnitIndex].follow = selectedUnit.follow;
        } else {
            if (pop[followerUnitIndex].id == selectedUnit.follow) {
                // guru removed from the group : elect new guru
                followShift(selectedUnit.follow);
            }
            pop[followerUnitIndex].follow = 0;
        }
        pop[selUnitIndex].follow = selectedUnit.follow;
        showTileInfos(selectedUnit.tileId,true);
    }
};
function followShift(oldFollowId) {
    let newFollowId = 0;
    pop.forEach(function(unit) {
        if (unit.follow == oldFollowId) {
            if (newFollowId == 0) {
                newFollowId = unit.id;
            }
            unit.follow = newFollowId;
        }
    });
};
