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
    putInGroup(unitInGroupId,freeNumber);
};
function putInGroup(unitId, groupNumber) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    pop[unitIndex].follow = groupNumber;
    showTileInfos(selectedUnit.tileId,true);
    socket.emit('group_change', {unitId: unitId, groupNumber: groupNumber});
};
function removeFromGroup(unitId, groupNumber) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    pop[unitIndex].follow = null;
    showTileInfos(selectedUnit.tileId,true);
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
    // console.log('purging...');
    lastUnitId = 0;
    lastGroupNumber = 0;
    lastGroupSize = 1;
    let sortedPop = _.sortBy(pop,'follow');
    sortedPop.forEach(function(unit) {
        if (unit.follow >= 1 && unit.player === pseudo && unit.tileId == tileId) {
            if (unit.follow == lastGroupNumber) {
                lastGroupSize = lastGroupSize+1;
            } else {
                // console.log('group '+lastGroupNumber+' size is '+lastGroupSize);
                if (lastGroupSize <= 1 && lastGroupNumber != 0) {
                    removeFromGroup(lastUnitId,lastGroupNumber);
                    // console.log('purged!');
                }
                lastGroupSize = 1;
            }
            lastUnitId = unit.id;
            lastGroupNumber = unit.follow;
        }
    });
    // console.log('group '+lastGroupNumber+' size is '+lastGroupSize);
    if (lastGroupSize <= 1 && lastGroupNumber != 0) {
        removeFromGroup(lastUnitId,lastGroupNumber);
        // console.log('purged!');
    }
};
