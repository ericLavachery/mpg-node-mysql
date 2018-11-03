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
