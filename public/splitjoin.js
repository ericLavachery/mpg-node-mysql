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
    $('#tileUnitList').append('<select name="split" id="splitDrop" onchange="splitUnits(this,'+selectedUnit.id+');"><option value="">&nbsp;Split</option></select>');
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
