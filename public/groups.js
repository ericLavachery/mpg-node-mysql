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
    newGroup.type = 'group';
    mygroups.push(newGroup);
    // put the unit in it
    selectedUnit.follow = freeNumber;
    putInGroup(unitInGroupId,freeNumber);
};
function putInGroup(unitId, groupNumber) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    pop[unitIndex].follow = groupNumber;
    showTileInfos(selectedUnit.tileId,true);
    showTileUnitList(selectedUnit.tileId);
    showMovesLeft(selectedUnit.tileId,selectedUnit.id)
    socket.emit('group_change', {unitId: unitId, groupNumber: groupNumber});
};
function removeFromGroup(unitId, groupNumber) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    pop[unitIndex].follow = null;
    showTileInfos(selectedUnit.tileId,true);
    showTileUnitList(selectedUnit.tileId);
    showMovesLeft(selectedUnit.tileId,selectedUnit.id)
    socket.emit('group_change', {unitId: unitId, groupNumber: null});
};
function groupSwitch(unitId, groupNumber) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    if (pop[unitIndex].follow == selectedUnit.follow) {
        removeFromGroup(unitId, groupNumber);
    } else {
        putInGroup(unitId, groupNumber);
    }
};
function purgeGroups(tileId) {
    lastUnitId = 0;
    lastGroupNumber = 0;
    lastGroupSize = 1;
    let trackIndex = 0;
    let ownPopHere = _.filter(pop, function(unit) {
        return (unit.tileId == tileId && unit.player === pseudo);
    });
    let sortedPopHere = _.sortBy(ownPopHere,'follow');
    sortedPopHere.forEach(function(unit) {
        if (unit.follow >= 1) {
            if (unit.follow == lastGroupNumber) {
                lastGroupSize = lastGroupSize+1;
            } else {
                if (lastGroupSize <= 1 && lastGroupNumber != 0) {
                    removeFromGroup(lastUnitId,lastGroupNumber);
                }
                lastGroupSize = 1;
            }
            lastUnitId = unit.id;
            lastGroupNumber = unit.follow;
        }
        if (unit.onTrack >= 1) {
            trackIndex = myTracks.findIndex((obj => obj.id == unit.onTrack));
            if (!myTracks[trackIndex].tiles.includes(tileId)) {
                unGoTo(unit.id);
            }
        }
    });
    if (lastGroupSize <= 1 && lastGroupNumber != 0) {
        removeFromGroup(lastUnitId,lastGroupNumber);
    }
};
