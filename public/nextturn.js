// NEXT TURN
$('#nextButton').click(nextTurn);
function myOccupiedTiles() {
    let occupiedTiles = [];
    let ownPop = _.filter(pop, function(unit) {
        return (unit.player === pseudo);
    });
    ownPop.forEach(function(unit) {
        if (!occupiedTiles.includes(unit.tileId)) {
            occupiedTiles.push(unit.tileId);
        }
    });
    return occupiedTiles;
};
function nextTurn() {
    perso.exploredTiles = [];
    let occupiedTiles = [];
    let ownPop = _.filter(pop, function(unit) {
        return (unit.player === pseudo);
    });
    ownPop.forEach(function(unit) {
        // récup fatigue
        if (unit.fatigue+unit.endurance-unit.move >= 0) {
            unit.fatigue = unit.fatigue-unit.move;
        } else {
            unit.fatigue = 0-unit.endurance;
        }
        // récup time
        unit.time = 1;
        // note les tiles occupés
        if (!occupiedTiles.includes(unit.tileId)) {
            occupiedTiles.push(unit.tileId);
        }
    });
    // console.log(occupiedTiles);
    // vire (de perso.unitView) les unités adverses qui ne sont pas sur des tiles occupés
    let lostViewedPop = _.filter(pop, function(unit) {
        return (unit.player !== pseudo && !occupiedTiles.includes(unit.tileId) && perso.unitView.includes(unit.id));
    });
    lostViewedPop.forEach(function(unit) {
        perso.unitView = _.without(perso.unitView, unit.id);
        perso.unitIdent = _.without(perso.unitIdent, unit.id);
    });
    // re-fogging
    // NOT IF : Occupied - Carto - Road - SeaRoute - City
    let check = 0;
    let tileIndex = 0;
    let tileFlags = 0;
    let refogableWorld = _.filter(world, function(tile) {
        return (!occupiedTiles.includes(tile.id) && !perso.mapCarto.includes(tile.id) && !tile.flags.includes('road_') && !tile.flags.includes('searoute_') && !tile.flags.includes('city_'));
    });
    refogableWorld.forEach(function(tile) {
        check = rand.rand(1,100);
        if (check <= viewOutPerc) {
            perso.mapView = _.without(perso.mapView, tile.id);
        }
        // purgeGroups(tile.id); // purge unused groups
    });
    // unfog tiles around occupied carto
    let cartoOccupiedWorld = _.filter(world, function(tile) {
        return (perso.mapCarto.includes(tile.id) && occupiedTiles.includes(tile.id));
    });
    cartoOccupiedWorld.forEach(function(tile) {
        unfogAround(tile.id);
    });
    showMap(world);
    showVisiblePop(world);
    if (selectedUnit.id >= 1) {
        drawUnit(selectedUnit.id,selectedUnit.tileId,selectedUnit.pic,'icon-selected');
        showMovesLeft(selectedUnit.tileId, selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
        showTileUnitList(selectedUnit.tileId);
    };
    socket.emit('next_turn', {pseudo:pseudo,turns:1});
    emitPlayersChange(perso);
}
