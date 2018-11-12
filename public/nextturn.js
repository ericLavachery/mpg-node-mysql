// NEXT TURN
$('#nextButton').click(nextTurn);
function nextTurn() {
    // perd de vue les unités adverses
    perso.unitView = [];
    perso.unitIdent = [];
    // récup fatigue
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
    // map
    world.forEach(function(tile) {
        $("#"+tile.id).attr("title", ""); // erase "moves left" infos
        purgeGroups(tile.id); // purge unused groups
    });
    if (selectedUnit.id >= 1) {
        showUnitMovesLeft(selectedUnit.tileId, selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
        showTileUnitList(selectedUnit.tileId);
    };
}
