function showTileUnitList(tileId) {
    $('#tileUnitList').empty();
    let ownUnitsHere = 0;
    let numSameType = 1;
    let gfollow = null;
    pop.forEach(function(unit) {
        if (unit.tileId == tileId) {
            if (unit.player == pseudo) {
                ownUnitsHere = ownUnitsHere+1;
                if (unit.follow >= 1) {
                    gfollow = unit.follow;
                } else {
                    gfollow = '';
                }
                if (selectedUnit.id == unit.id) {
                    $('#tileUnitList').append('<span class="paramName mauve">'+unit.number+' '+unit.type+'</span><span class="paramValue mauve">'+unit.player+'</span>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="followSwitch(this)"><span class="paramValue"><b>&laquo;&laquo;&laquo; '+gfollow+'</b></span></a><br>');
                } else {
                    if (unit.type == selectedUnit.type) {
                        numSameType = numSameType+1;
                    }
                    if (unit.follow >= 1 && unit.follow == selectedUnit.follow) {
                        $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'" onclick="selectUnitFromTileInfoList(this)"><span class="paramName">'+unit.number+' '+unit.type+'</span><span class="paramValue">'+unit.player+'</span></a>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="followSwitch(this)"><span class="paramValue"><b>&laquo; '+gfollow+'</b></span></a><br>');
                    } else {
                        $('#tileUnitList').append('<a href="#" id="tileUnitListId'+unit.id+'" onclick="selectUnitFromTileInfoList(this)"><span class="paramName">'+unit.number+' '+unit.type+'</span><span class="paramValue">'+unit.player+'</span></a>&nbsp;&nbsp;<a href="#" id="followerId'+unit.id+'" onclick="followSwitch(this)"><span class="paramValue"><b>&#8212;</b></span></a><br>');
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
};
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
};
function splitUnits(sel,splitedUnitId) {
    socket.emit('split_unit', {splitedUnitId: splitedUnitId, splitValue: sel.value});
};
function createGroup(unitInGroupId) {
    // find a free number
    let freeNumber = 0;
    let i = 0;
    let sortedGroups = _.sortBy(mygroups,'number');
    sortedGroups.forEach(function(group) {
        i = i+1;
        if (group.number != i && freeNumber == 0) {
            freeNumber = i;
        }
    });
    if (freeNumber == 0) {
        freeNumber = i+1;
    }
    // create group and add it to mygroups
    let newGroup = {};
    newGroup.number = freeNumber;
    newGroup.player = pseudo;
    newGroup.type = 'group';
    mygroups.push(newGroup);
    // put the unit in it
    let unitIndex = pop.findIndex((obj => obj.id == unitInGroupId));
    pop[unitIndex].follow = freeNumber;
    showTileInfos(selectedUnit.tileId,true);
    // ON SAUVE QUAND? CHAQUE FOIS?
};

// A CHANGER => SYSTEME DE GROUPES !!!!!!!!!!!!!!!!!!
function followSwitch(listItem) {
    let followerId = listItem.id.substring(10);
    let followerUnitIndex = pop.findIndex((obj => obj.id == followerId));
    let selUnitIndex = pop.findIndex((obj => obj.id == selectedUnit.id));
    if (selectedUnit.id >= 1) {
        if (selectedUnit.follow == 0) {
            selectedUnit.follow = selectedUnit.id;
        }
        if (pop[followerUnitIndex].follow == 0 || pop[followerUnitIndex].follow != selectedUnit.follow) {
            if (pop[followerUnitIndex].follow != 0) {
                // guru removed from another group : elect new guru
                followShift(pop[followerUnitIndex].follow);
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
