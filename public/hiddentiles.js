function defineUnhiddenTiles() {
    world.forEach(function(tile) {
        if (perso.mapCarto.includes(tile.id)) {
            unhideTiles(tile.id,false,false);
        }
    });
};
function showOccupiedTiles() {
    let occupiedTiles = myOccupiedTiles();
    world.forEach(function(tile) {
        if (occupiedTiles.includes(tile.id)) {
            unhideTiles(tile.id,true,true);
        }
    });
};
function unhideTiles(tileId,single,show) {
    // gués 77(83)
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    myTileX = world[tileIndex].x;
    myTileY = world[tileIndex].y;
    world.forEach(function(tile) {
        if (tile.x == myTileX && tile.y == myTileY) {
            // pour tous
            if (!unhiddenTiles.includes(tile.id)) {
                if (show) {
                    // changement pendant le jeu : montrer le tile
                    if (tile.terrainId == 83) { // gués
                        unhiddenTiles.push(tile.id);
                        tileIndex = world.findIndex((obj => obj.id == tile.id));
                        world[tileIndex].terrainId = 77;
                        $('#'+tile.id).removeClass('ter83a').removeClass('ter83b').removeClass('ter83c').addClass('ter77a');
                        showTile(tile.id,77,'a');
                    }
                    if (tile.terrainId == 133) { // gués subarctique
                        unhiddenTiles.push(tile.id);
                        tileIndex = world.findIndex((obj => obj.id == tile.id));
                        world[tileIndex].terrainId = 132;
                        $('#'+tile.id).removeClass('ter133a').removeClass('ter133b').removeClass('ter133c').addClass('ter132a');
                        showTile(tile.id,132,'a');
                    }
                    if (tile.terrainId == 87) { // mer récifs
                        unhiddenTiles.push(tile.id);
                        tileIndex = world.findIndex((obj => obj.id == tile.id));
                        world[tileIndex].terrainId = 55;
                        $('#'+tile.id).removeClass('ter87a').removeClass('ter87b').removeClass('ter87c').addClass('ter55a');
                        showTile(tile.id,55,tile.seed);
                    }
                    if (tile.terrainId == 88) { // océan brisants
                        unhiddenTiles.push(tile.id);
                        tileIndex = world.findIndex((obj => obj.id == tile.id));
                        world[tileIndex].terrainId = 61;
                        $('#'+tile.id).removeClass('ter88a').removeClass('ter88b').removeClass('ter88c').addClass('ter61a');
                        showTile(tile.id,61,tile.seed);
                    }
                    if (tile.terrainId == 86) { // lac étocs
                        unhiddenTiles.push(tile.id);
                        tileIndex = world.findIndex((obj => obj.id == tile.id));
                        world[tileIndex].terrainId = 60;
                        $('#'+tile.id).removeClass('ter86a').removeClass('ter86b').removeClass('ter86c').addClass('ter60a');
                        showTile(tile.id,60,tile.seed);
                    }
                    if (tile.terrainId == 85) { // fleuve étocs
                        unhiddenTiles.push(tile.id);
                        tileIndex = world.findIndex((obj => obj.id == tile.id));
                        world[tileIndex].terrainId = 84;
                        $('#'+tile.id).removeClass('ter85a').removeClass('ter85b').removeClass('ter85c').addClass('ter84a');
                        showTile(tile.id,84,tile.seed);
                    }
                } else {
                    if (tile.terrainId == 77 || tile.terrainId == 60 || tile.terrainId == 61 || tile.terrainId == 55 || tile.terrainId == 84 || tile.terrainId == 132) {
                        unhiddenTiles.push(tile.id);
                    }
                }
            }
        } else if (((tile.x == myTileX+1 && tile.y == myTileY) || (tile.x == myTileX-1 && tile.y == myTileY) || (tile.x == myTileX && tile.y == myTileY-1) || (tile.x == myTileX && tile.y == myTileY+1)) && !single) {
            // pour les gués etc... (vu si carto adj)
            if (!unhiddenTiles.includes(tile.id)) {
                if (show) {
                    if (tile.terrainId == 83) {
                        unhiddenTiles.push(tile.id);
                        tileIndex = world.findIndex((obj => obj.id == tile.id));
                        world[tileIndex].terrainId = 77;
                        $('#'+tile.id).removeClass('ter83a').removeClass('ter83b').removeClass('ter83c').addClass('ter77a');
                        showTile(tile.id,77,'a');
                    }
                    if (tile.terrainId == 133) {
                        unhiddenTiles.push(tile.id);
                        tileIndex = world.findIndex((obj => obj.id == tile.id));
                        world[tileIndex].terrainId = 132;
                        $('#'+tile.id).removeClass('ter133a').removeClass('ter133b').removeClass('ter133c').addClass('ter132a');
                        showTile(tile.id,132,'a');
                    }
                } else {
                    if (tile.terrainId == 77 || tile.terrainId == 132) {
                        unhiddenTiles.push(tile.id);
                    }
                }
            }
        }
    });
};
function hideHidden() {
    // terrains cachés
    let tileIndex = 0;
    world.forEach(function(tile) {
        if (!unhiddenTiles.includes(tile.id)) {
            // gués
            if (tile.terrainId == 77) {
                tileIndex = world.findIndex((obj => obj.id == tile.id));
                world[tileIndex].terrainId = 83;
            }
            // gués sub
            if (tile.terrainId == 132) {
                tileIndex = world.findIndex((obj => obj.id == tile.id));
                world[tileIndex].terrainId = 133;
            }
            // océan brisants
            if (tile.terrainId == 61) {
                tileIndex = world.findIndex((obj => obj.id == tile.id));
                world[tileIndex].terrainId = 88;
            }
            // mer récifs
            if (tile.terrainId == 55) {
                tileIndex = world.findIndex((obj => obj.id == tile.id));
                world[tileIndex].terrainId = 87;
            }
            // lac étocs
            if (tile.terrainId == 60) {
                tileIndex = world.findIndex((obj => obj.id == tile.id));
                world[tileIndex].terrainId = 86;
            }
            // fleuve étocs
            if (tile.terrainId == 84) {
                tileIndex = world.findIndex((obj => obj.id == tile.id));
                world[tileIndex].terrainId = 85;
            }
        }
    });
};
