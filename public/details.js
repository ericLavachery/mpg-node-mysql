// SHOW INFOS
function showUnitInfos(unitId) {
    $('#unitInfos').empty();
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let move = pop[unitIndex].move;
    let moveAdj = pop[unitIndex].moveAdj;
    let fatigue = pop[unitIndex].fatigue;
    if (fatigue < 0) {fatigue = 0;};
    let movesLeft = move-fatigue;
    let hpLeft = pop[unitIndex].hp-pop[unitIndex].damage;
    let tileIndex = world.findIndex((obj => obj.id == pop[unitIndex].tileId));
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let terCover = ter[terrainIndex].cover;
    let terDefense = ter[terrainIndex].defense;
    let defense = pop[unitIndex].defense;
    defense = Math.round((defense*terDefense/100)+defense);
    let cover = Math.round(terCover*pop[unitIndex].coverAdj/100);
    defense = Math.round((defense*cover/100)+defense);
    let attack = Math.round((pop[unitIndex].attack*cover/100)+pop[unitIndex].attack);
    // effects of fatigue
    let shape = Math.round(movesLeft/(move/2)*100);
    if (shape > 100) {shape = 100;};
    defense = Math.round(defense*(shape+300)/400);
    attack = Math.round(attack*(shape+300)/400);
    $('#unitInfos').append('<h3>'+pop[unitIndex].number+' '+pop[unitIndex].type+'</h3>');
    $('#unitInfos').append('<span class="paramName">Owner</span><span class="paramValue">'+pop[unitIndex].player+'</span><br>');
    if (shape >= 100) {
        $('#unitInfos').append('<span class="paramName">Moves</span><span id="infosMovesLeft" class="paramValue">'+Math.round(movesLeft/10)+'</span><span class="paramValue">&nbsp;/&nbsp;'+Math.round(move/10)+'</span><br>');
    } else {
        $('#unitInfos').append('<span class="paramName">Moves</span><span id="infosMovesLeft" class="paramValue rouge">'+Math.round(movesLeft/10)+'</span><span class="paramValue">&nbsp;/&nbsp;'+Math.round(move/10)+'</span><br>');
    }
    if (hpLeft >= pop[unitIndex].hp) {
        $('#unitInfos').append('<span class="paramName">HP</span><span class="paramValue">'+hpLeft+'</span><span class="paramValue">&nbsp;/&nbsp;'+pop[unitIndex].hp+'</span><br>');
    } else {
        $('#unitInfos').append('<span class="paramName">HP</span><span class="paramValue rouge">'+hpLeft+'</span><span class="paramValue">&nbsp;/&nbsp;'+pop[unitIndex].hp+'</span><br>');
    }
    $('#unitInfos').append('<span class="paramName">Attack</span><span class="paramValue">'+attack+'&nbsp;/&nbsp;'+pop[unitIndex].attack+'</span><br>');
    $('#unitInfos').append('<span class="paramName">Defense</span><span class="paramValue">'+defense+'&nbsp;/&nbsp;'+pop[unitIndex].defense+'</span><br>');
    $('#unitInfos').append('<span class="paramName">Power</span><span class="paramValue">'+pop[unitIndex].power+'</span><br>');
    $('#unitInfos').append('<span class="paramName">Cover</span><span class="paramValue">'+pop[unitIndex].coverAdj+'%</span><br>');
};
function showTileInfos(tileId,linked) {
    $('#tileInfos').empty();
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    if (linked) {
        $('#tileInfos').append('<h3>'+capitalizeFirstLetter(world[tileIndex].terrain)+'</h3>');
    } else {
        $('#tileInfos').append('<h4>'+capitalizeFirstLetter(world[tileIndex].terrain)+'</h4>');
    }
    $('#tileInfos').append('<span class="paramName">Tile Id</span><span class="paramValue">'+world[tileIndex].id+'</span><br>');
    $('#tileInfos').append('<span class="paramName">Map square</span><span class="paramValue">'+world[tileIndex].x+'.'+world[tileIndex].y+'</span><br>');
    $('#tileInfos').append('<span class="paramName">Move cost</span><span class="paramValue">'+ter[terrainIndex].moveCost+'</span><br>');
    $('#tileInfos').append('<span class="paramName">Cover</span><span class="paramValue">'+ter[terrainIndex].cover+'%</span><br>');
    $('#tileInfos').append('<span class="paramName">Defense</span><span class="paramValue">'+ter[terrainIndex].defense+'%</span><br>');
    showTileUnitList(tileId);
};
