// NEXT TURN
$('#nextButton').click(nextTurn);
function myOccupiedTiles() {
    let occupiedTiles = [];
    let ownPop = _.filter(pop, function(unit) {
        return (unit.player === pseudo);
    });
    ownPop.forEach(function(unit) {
        if (unit.player === pseudo) {
            if (!occupiedTiles.includes(unit.tileId)) {
                occupiedTiles.push(unit.tileId);
            }
        }
    });
    // console.log(occupiedTiles);
    return occupiedTiles;
};
function nextTurn() {
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
    // map
    let check = 0;
    let tileIndex = 0;
    let tileFlags = 0;
    world.forEach(function(tile) {
        // re-fog some viewed tiles
        // NOT IF : Occupied - Carto - Road - SeaRoute
        tileIndex = world.findIndex((obj => obj.id == tile.id));
        tileFlags = world[tileIndex].flags;
        if (!occupiedTiles.includes(tile.id) && !perso.mapCarto.includes(tile.id) && !tileFlags.includes('road_') && !tileFlags.includes('searoute_')) {
            check = rand.rand(1,100);
            if (check <= 5) {
                perso.mapView = _.without(perso.mapView, tile.id);
            }
        }
        $("#"+tile.id).attr("title", ""); // erase "moves left" infos
        purgeGroups(tile.id); // purge unused groups
    });
    // unfog tiles around occupied carto
    world.forEach(function(tile) {
        if (perso.mapCarto.includes(tile.id) && occupiedTiles.includes(tile.id)) {
            unfogAround(tile.id);
        }
    });
    showMap(world);
    showVisiblePop(world);
    if (selectedUnit.id >= 1) {
        drawUnit(selectedUnit.id,selectedUnit.tileId,selectedUnit.pic,'icon-selected');
        showUnitMovesLeft(selectedUnit.tileId, selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
        showTileUnitList(selectedUnit.tileId);
    };
    socket.emit('next_turn', { pseudo: pseudo, turns: 1 });
    emitPlayersChange(perso);
}
