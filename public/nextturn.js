// NEXT TURN
$('#nextButton').click(nextTurn);
function nextTurn() {
    pop.forEach(function(unit) {
        if (unit.player === pseudo) {
            if (unit.fatigue-unit.move >= 0) {
                unit.fatigue = unit.fatigue-unit.move;
            } else {
                unit.fatigue = 0;
            }
        }
    });
    socket.emit('next_turn', { pseudo: pseudo, turns: 1 });
    world.forEach(function(tile) {
        $("#"+tile.id).attr("title", "");
    });
    if (selectedUnit.id >= 0) {
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
    };
}
