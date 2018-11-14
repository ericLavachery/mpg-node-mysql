// NEXT TURN
$('#nextButton').click(nextTurn);
function nextTurn() {
    // perd de vue les unités adverses
    // (à changer : perd de vue quand plus d'unités sur la même case)
    // perso.unitView = [];
    // perso.unitIdent = [];
    perso.exploredTiles = [];
    let occupiedTiles = [];
    pop.forEach(function(unit) {
        if (unit.player === pseudo) {
            // récup fatigue
            if (unit.fatigue-unit.move >= 0) {
                unit.fatigue = unit.fatigue-unit.move;
            } else {
                unit.fatigue = 0;
            }
            // note les tiles occupés
            if (!occupiedTiles.includes(unit.tileId)) {
                occupiedTiles.push(unit.tileId);
            }
        }
    });
    // console.log(occupiedTiles);
    // vire (de perso.unitView) les unités adverses qui ne sont pas sur des tiles occupés
    pop.forEach(function(unit) {
        if (unit.player !== pseudo) {
            if (!occupiedTiles.includes(unit.tileId)) {
                perso.unitView = _.without(perso.unitView, unit.id);
                perso.unitIdent = _.without(perso.unitIdent, unit.id);
            }
        }
    });
    socket.emit('next_turn', { pseudo: pseudo, turns: 1 });
    emitPlayersChange(perso);
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
