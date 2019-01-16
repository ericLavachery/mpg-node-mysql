function moveLoss(unitId,number) {
    let anum = about(number,15);
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let moveLost = anum;
    pop[unitIndex].fatigue = pop[unitIndex].fatigue+moveLost;
};
function moveLossPerc(unitId,number) {
    let anum = about(number,15);
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let moveLost = Math.round(pop[unitIndex].move*anum/100);
    pop[unitIndex].fatigue = pop[unitIndex].fatigue+moveLost;
};
function moveHere(targetTileId) {
    if (isAdjacent(selectedUnit.tileId,targetTileId)) {
        if (mode == 'g_move' && selectedUnit.follow >= 1) {
            let groupSize = 0;
            pop.forEach(function(unit) {
                if (unit.follow == selectedUnit.follow && unit.player == pseudo && unit.tileId == selectedUnit.tileId) {
                    groupSize = groupSize+1;
                }
            });
            if (groupSize >= 2) {
                moveGroup(targetTileId);
            } else {
                moveUnit(targetTileId);
            }
        } else {
            moveUnit(targetTileId);
        }
    }
};
function calcBulk(totalEnk,totalFardeau) {
    if (totalFardeau >= totalEnk) {
        if (totalEnk > totalFardeau/10) {
            let bulk = ((totalEnk-(totalFardeau/10))*2/totalFardeau)+1.1;
            return Math.round(bulk*10)/10;
        } else {
            return 1;
        }
    } else {
        return 9; // move impossible
    }
};
function calcSpur(lazyEnk,restCharge) {
    let onChar = restCharge;
    let onFoot = lazyEnk-restCharge;
    let bulk = ((onChar*0.3)+onFoot)/lazyEnk;
    return Math.round(bulk*10)/10;
};
function calcGroupBulk(popToMove,targetTileId) {
    let groupMove = {moveOK:true,bulk:1,transUnits:[],charUnits:[]};
    let moveOK = true;
    let bulk = 1;
    let moveCost = 0;
    let noDiagMoveCost = 0;
    let movesLeft = 0;
    let totalContenu = 0;
    let totalFardeau = 0;
    let totalCharge = 0;
    let totalEnk = 0;
    let totalResEnk = 0;
    let totalUnitEnk = 0;
    let lazyEnk = 0;
    let restEnk = 0;
    let restCharge = 0;
    let transUnits = [];
    let charUnits = [];
    popToMove.forEach(function(unit) {
        // move the whole group only if not null
        if (unit.follow !== null || unit.id == selectedUnit.id) {
            moveCost = calcMoveCost(targetTileId,unit.id,false,true);
            noDiagMoveCost = calcMoveCost(targetTileId,unit.id,false,false);
            movesLeft = unit.move-unit.fatigue;
            if (noDiagMoveCost > maxMoveCost || movesLeft < 1) {
                if (unit.time < 1 && movesLeft < 1) {
                    // plus de temps !!!
                    moveOK = false;
                } else {
                    if (unit.genre == 'coffre') {
                        totalEnk = totalEnk+(unit.enk*unit.number);
                        totalContenu = totalContenu+(unit.contenu*unit.number);
                    } else if (unit.genre == 'ressource') {
                        totalResEnk = totalResEnk+(unit.enk*unit.number);
                    } else if (unit.genre == 'unité') {
                        if (unit.move >= 1) {
                            if (unit.charge >= 1) {
                                moveOK = false;
                            } else {
                                totalUnitEnk = totalUnitEnk+(unit.enk*unit.number);
                            }
                        } else {
                            totalEnk = totalEnk+(unit.enk*unit.number);
                        }
                    } else if (unit.genre == 'bâtiment') {
                        moveOK = false;
                    }
                }
            } else {
                totalFardeau = totalFardeau+(unit.fardeau*unit.number);
                totalCharge = totalCharge+(unit.charge*unit.number);
                if (unit.charge >= 1) {
                    charUnits.push(unit.id);
                } else {
                    transUnits.push(unit.id);
                    lazyEnk = lazyEnk+(unit.enk*unit.number);
                }
            }
        }
    });
    // add ressources enk if not enough place in barrels etc...
    if (totalResEnk > totalContenu) {
        totalEnk = totalEnk+totalResEnk-totalContenu;
    }
    if (totalCharge >= totalEnk) {
        // toutes les charges peuvent entrer dans les chariots
        restEnk = totalEnk-totalCharge+totalUnitEnk;
        if (restEnk >= 1) {
            // toutes les unités immobilisées ne peuvent pas rentrer dans les chariots
            if (totalFardeau >= restEnk) {
                bulk = calcBulk(restEnk,totalFardeau);
            } else {
                moveOK = false;
            }
        } else {
            // il reste de la place dans les chariots
            restCharge = totalCharge-totalEnk-totalUnitEnk;
            if (lazyEnk >= restCharge) {
                // ça se relaie dans les chariots (bulk<1)
                bulk = calcSpur(lazyEnk,restCharge);
            } else {
                // tout le monde est dans les chariots
                transUnits = [];
            }
        }
    } else {
        // les hommes/animaux doivent porter des charges
        restEnk = totalEnk-totalCharge+totalUnitEnk;
        if (totalFardeau >= restEnk) {
            bulk = calcBulk(restEnk,totalFardeau);
        } else {
            moveOK = false;
        }
    }
    groupMove.bulk = bulk;
    groupMove.moveOK = moveOK;
    groupMove.transUnits = transUnits;
    groupMove.charUnits = charUnits;
    return groupMove;
}
function moveGroup(targetTileId) {
    oldTileId = selectedUnit.tileId;
    // units to be moved
    let popToMove = _.filter(pop, function(unit) {
        return (unit.follow == selectedUnit.follow && unit.player === pseudo && unit.tileId == selectedUnit.tileId);
    });
    // check if all units can move / if yes, calc the bulk
    let fatigue = 0;
    let groupMove = calcGroupBulk(popToMove,targetTileId);
    let moveOK = groupMove.moveOK;
    let bulk = groupMove.bulk;
    let transUnits = groupMove.transUnits;
    let charUnits = groupMove.charUnits;
    // move all units
    let unitIndex = 0;
    if (moveOK) {
        // clear old tile
        $('#b'+oldTileId).empty();
        $('#s'+oldTileId).empty();
        popToMove.forEach(function(unit) {
            // move the whole group only if not null
            if (unit.follow !== null || unit.id == selectedUnit.id) {
                moveCost = calcMoveCost(targetTileId,unit.id,false,true);
                if (unit.move > 0) {
                    if (transUnits.includes(unit.id)) {
                        fatigue = unit.fatigue + about(moveCost*bulk,10);
                    } else if (charUnits.includes(unit.id)) {
                        fatigue = unit.fatigue + about(moveCost,10);
                    } else {
                        fatigue = unit.fatigue + about(moveCost*3/10,10);
                    }
                } else {
                    fatigue = 0;
                }
                movesLeft = unit.move-fatigue;
                // change infos dans pop
                unitIndex = pop.findIndex((obj => obj.id == unit.id));
                pop[unitIndex].tileId = targetTileId;
                pop[unitIndex].prevTileId = oldTileId;
                pop[unitIndex].fatigue = fatigue;
                if (unit.id == selectedUnit.id) {
                    // change infos dans selectedUnit
                    selectedUnit.tileId = targetTileId;
                    selectedUnit.prevTileId = oldTileId;
                    selectedUnit.fatigue = fatigue;
                }
                // envoi au serveur
                socket.emit('move_unit', {tileId: targetTileId, prevTileId: oldTileId, unitId: unit.id, fatigue: fatigue});
            }
        });
        unfogTile(targetTileId,true,true);
        unhideTiles(targetTileId,false,true);
        autoUnfog(selectedUnit.tileId);
        // draw on new tile
        drawUnit(selectedUnit.id, targetTileId, selectedUnit.pic, 'icon-selected');
        // réaffiche les infos
        showGroupMovesLeft(selectedUnit.tileId, popToMove);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
        showTileUnitList(selectedUnit.tileId);
        drawTileDefaultUnit(oldTileId);
        purgeGroups(targetTileId);
    }
};
// a améliorer!!
function moveUnit(targetTileId) {
    oldTileId = selectedUnit.tileId;
    // tile move cost
    let tileIndex = world.findIndex((obj => obj.id == targetTileId));
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let moveCost = ter[terrainIndex].moveCost;
    let noDiagMoveCost = ter[terrainIndex].moveCost;
    // unit move cost
    let unitIndex = pop.findIndex((obj => obj.id == selectedUnit.id));
    let move = pop[unitIndex].move;
    let moveAdj = pop[unitIndex].moveAdj;
    let fatigue = pop[unitIndex].fatigue;
    let endurance = pop[unitIndex].endurance;
    if (fatigue+endurance < 0) {
        fatigue = 0-endurance;
    };
    let movesLeft = move-fatigue;
    moveCost = calcMoveCost(targetTileId,selectedUnit.id,false,true);
    noDiagMoveCost = calcMoveCost(targetTileId,selectedUnit.id,false,false);
    // console.log(moveCost);
    if (maxMoveCost >= noDiagMoveCost && movesLeft >= 1) {
        fatigue = fatigue + about(moveCost,15);
        movesLeft = move-fatigue;
        // clear old tile
        $('#b'+selectedUnit.tileId).empty();
        $('#s'+selectedUnit.tileId).empty();
        // change infos dans pop
        pop[unitIndex].tileId = targetTileId;
        pop[unitIndex].prevTileId = oldTileId;
        pop[unitIndex].fatigue = fatigue;
        unfogTile(targetTileId,true,true);
        // unhideTiles(targetTileId,false,true);
        autoUnfog(selectedUnit.tileId);
        // draw on new tile
        drawUnit(selectedUnit.id, targetTileId, selectedUnit.pic, 'icon-selected');
        // change infos dans selectedUnit
        selectedUnit.tileId = targetTileId;
        selectedUnit.prevTileId = oldTileId;
        selectedUnit.fatigue = fatigue;
        // envoi au serveur
        socket.emit('move_unit', {tileId: targetTileId, prevTileId: oldTileId, unitId: selectedUnit.id, fatigue: fatigue});
        // affiche les infos
        showUnitMovesLeft(selectedUnit.tileId, selectedUnit.id);
        showUnitInfos(selectedUnit.id);
        showTileInfos(selectedUnit.tileId,true);
        showTileUnitList(selectedUnit.tileId);
        drawTileDefaultUnit(oldTileId);
        purgeGroups(targetTileId);
    }
};
function terMoveCost(tileId,unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let terIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let moveCost = 30;
    let vegetMoveAdj, escarpMoveAdj, innondMoveAdj;
    // ajustement terrain
    let adjCause = ter[terIndex].adjCause;
    let moveCostAdj = ter[terIndex].moveCostAdj;
    if (adjCause != 'recifs') {
        if (unitId >= 1) {
            switch (adjCause) {
                case 'neige':
                    moveCost = moveCost+Math.round(moveCostAdj*pop[unitIndex].escarpAdj/100);
                    break;
                case 'sable':
                    moveCost = moveCost+Math.round(moveCostAdj*pop[unitIndex].escarpAdj/100);
                    break;
                default:
                    moveCost = moveCost+moveCostAdj;
            }
        } else {
            moveCost = moveCost+moveCostAdj;
        }
    }
    // vegetation
    vegetMoveAdj = calcVegetMoveAdj(ter[terIndex].vegetation);
    if (unitId >= 1) {
        moveCost = moveCost+Math.round(vegetMoveAdj*pop[unitIndex].vegetAdj/100);
    } else {
        moveCost = moveCost+vegetMoveAdj;
    }
    // escarpement
    escarpMoveAdj = calcEscarpMoveAdj(ter[terIndex].escarpement);
    if (unitId >= 1) {
        moveCost = moveCost+Math.round(escarpMoveAdj*pop[unitIndex].escarpAdj/100);
    } else {
        moveCost = moveCost+escarpMoveAdj;
    }
    // innondation
    innondMoveAdj = calcInnondMoveAdj(ter[terIndex].innondation);
    if (unitId >= 1) {
        moveCost = moveCost+Math.round(innondMoveAdj*pop[unitIndex].innondAdj/100);
    } else {
        moveCost = moveCost+innondMoveAdj;
    }
    return Math.round(moveCost*baseMoveCost/30);
};
function roadMoveCost(tileId,unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let terIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let moveCostRoad = 23;
    let vegetMoveAdj, escarpMoveAdj, innondMoveAdj;
    // ajustement terrain
    moveCostRoad = moveCostRoad+Math.round(ter[terIndex].moveCostAdj*70/100);
    let adjCause = ter[terIndex].adjCause;
    let moveCostAdj = ter[terIndex].moveCostAdj;
    if (adjCause != 'recifs') {
        if (unitId >= 1) {
            switch (adjCause) {
                case 'neige':
                    moveCostRoad = moveCostRoad+Math.round(moveCostAdj*pop[unitIndex].escarpAdj*5/1000);
                    break;
                case 'sable':
                    moveCostRoad = moveCostRoad+Math.round(moveCostAdj*pop[unitIndex].escarpAdj*2/1000);
                    break;
                default:
                    moveCostRoad = moveCostRoad+Math.round(moveCostAdj*7/10);
            }
        } else {
            moveCostRoad = moveCostRoad+Math.round(moveCostAdj*7/10);
        }
    }
    // vegetation
    vegetMoveAdj = calcVegetMoveAdj(ter[terIndex].vegetation);
    if (unitId >= 1) {
        vegetMoveAdj = Math.round(vegetMoveAdj*pop[unitIndex].vegetAdj/100);
    }
    moveCostRoad = moveCostRoad+Math.round(vegetMoveAdj*20/100);
    // escarpement
    escarpMoveAdj = calcEscarpMoveAdj(ter[terIndex].escarpement);
    if (unitId >= 1) {
        escarpMoveAdj = Math.round(escarpMoveAdj*pop[unitIndex].escarpAdj/100);
    }
    if (escarpMoveAdj >= 10) {
        moveCostRoad = moveCostRoad+Math.round((escarpMoveAdj-10)*70/100);
    }
    // innondation
    innondMoveAdj = calcInnondMoveAdj(ter[terIndex].innondation);
    if (unitId >= 1) {
        innondMoveAdj = Math.round(innondMoveAdj*pop[unitIndex].innondAdj/100);
    }
    moveCostRoad = moveCostRoad+Math.round(innondMoveAdj*40/100);
    return Math.round(moveCostRoad*baseMoveCost/30);
};
function airMoveCost(tileId,unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let terIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let moveCostAir = 30;
    let vegetMoveAdj, escarpMoveAdj, innondMoveAdj;
    // vegetation
    vegetMoveAdj = calcVegetMoveAdj(ter[terIndex].vegetation);
    moveCostAir = moveCostAir+Math.round(vegetMoveAdj*10/100);
    // escarpement
    escarpMoveAdj = calcEscarpMoveAdj(ter[terIndex].escarpement);
    moveCostAir = moveCostAir+Math.round(escarpMoveAdj*40/100);
    // innondation
    innondMoveAdj = calcInnondMoveAdj(ter[terIndex].innondation);
    moveCostAir = moveCostAir+Math.round(innondMoveAdj*40/100);
    return Math.round(moveCostAir*baseMoveCost/30);
};
function waterMoveCost(tileId,unitId) {
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let tileIndex = world.findIndex((obj => obj.id == tileId));
    let terIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    let moveCostWater = 25;
    let vegetMoveAdj = 0;
    let escarpMoveAdj = 0;
    let innondMoveAdj = 0;
    let moveType = 'mix'
    if (unitId >= 1) {
        moveType = pop[unitIndex].moveType;
    }
    // ajustement terrain
    moveCostWater = moveCostWater+Math.round(ter[terIndex].moveCostAdj*70/100);
    let adjCause = ter[terIndex].adjCause;
    let moveCostAdj = ter[terIndex].moveCostAdj;
    if (adjCause == 'recifs') {
        moveCostWater = moveCostWater+moveCostAdj;
    }
    if (ter[terIndex].innondation >= 60) {
        // sea
        if (moveType == 'mix') {
            innondMoveAdj = Math.abs(ter[terIndex].innondation-100);
        } else if (moveType == 'cab') {
            innondMoveAdj = Math.abs(ter[terIndex].innondation-100);
        } else if (moveType == 'mer') {
            if (ter[terIndex].innondation >= 110) {
                innondMoveAdj = 0;
            } else {
                innondMoveAdj = 110-ter[terIndex].innondation;
            }
        }
    } else {
        // river
        moveCostWater = moveCostWater+10;
        let esc = ter[terIndex].escarpement;
        let veg = ter[terIndex].vegetation;
        if (moveType == 'mix') {
            escarpMoveAdj = Math.round(esc*esc*esc/600);
            vegetMoveAdj = Math.round(veg*veg*veg/1500);
        } else if (moveType == 'cab') {
            escarpMoveAdj = Math.round(esc*esc*esc/600);
            vegetMoveAdj = Math.round(veg*veg*veg/1500);
        } else if (moveType == 'mer') {
            escarpMoveAdj = Math.round(esc*esc*esc/200);
            vegetMoveAdj = Math.round(veg*veg*veg/750);
        }
    }
    moveCostWater = moveCostWater+innondMoveAdj;
    moveCostWater = moveCostWater+escarpMoveAdj;
    moveCostWater = moveCostWater+vegetMoveAdj;
    return Math.round(moveCostWater*baseMoveCost/30);
};
function calcVegetMoveAdj(vegetation) {
    return Math.round(vegetation*vegetation/50);
};
function calcEscarpMoveAdj(escarpement) {
    return Math.round(escarpement*escarpement/16);
};
function calcInnondMoveAdj(innondation) {
    return innondation*2;
};
function calcMoveCost(targetTileId,unitId,explo,countdiag) {
    // xxxxxxxxxx AMPHIBIENS ????
    let unitIndex = pop.findIndex((obj => obj.id == unitId));
    let oldTileIndex = world.findIndex((obj => obj.id == pop[unitIndex].tileId));
    let tileIndex = world.findIndex((obj => obj.id == targetTileId));
    let terrainIndex = ter.findIndex((obj => obj.id == world[tileIndex].terrainId));
    // tile move cost
    let moveCost = 0;
    let unitMoveType = pop[unitIndex].moveType;
    let tileFlags = world[tileIndex].flags;
    if (unitMoveType == 'ter') {
        moveCost = terMoveCost(targetTileId, unitId);
        let oldTileFlags = world[oldTileIndex].flags;
        if (tileFlags.includes('road_') && oldTileFlags.includes('road_') && !explo) {
            moveCost = roadMoveCost(targetTileId, unitId);
        } else {
            if (perso.mapCarto.includes(targetTileId)) {
                if (tileFlags.includes('river_')) {
                    moveCost = moveCost+Math.round(20*pop[unitIndex].innondAdj/100);
                }
                moveCost = Math.round(moveCost*80/100);
            } else {
                if (tileFlags.includes('river_')) {
                    moveCost = moveCost+Math.round(30*pop[unitIndex].innondAdj/100);
                }
            }
        }
    } else if (unitMoveType == 'alt') {
        if (perso.mapCarto.includes(targetTileId)) {
            moveCost = 20;
        } else {
            moveCost = 24;
        }
    } else {
        if (unitMoveType == 'air') {
            moveCost = airMoveCost(targetTileId, unitId);
        } else if (unitMoveType == 'mer') {
            moveCost = waterMoveCost(targetTileId, unitId);
        } else if (unitMoveType == 'cab') {
            moveCost = waterMoveCost(targetTileId, unitId);
        } else if (unitMoveType == 'mix') {
            moveCost = waterMoveCost(targetTileId, unitId);
        }
        if (perso.mapCarto.includes(targetTileId)) {
            moveCost = Math.round(moveCost*80/100);
        }
    }
    // unit move cost
    let move = pop[unitIndex].move;
    if (move >= 1) {
        let moveAdj = pop[unitIndex].moveAdj;
        let unitTileId = pop[unitIndex].tileId;
        if (moveCost >= 31) {
            moveCost = Math.round(((moveCost-30)*moveAdj/100)+30);
        }
        if (isDiag(unitTileId,targetTileId) && countdiag) {
            moveCost = Math.round(moveCost*1414/1000);
        }
    } else {
        moveCost = 999;
    }
    // verif water for boats
    if (unitMoveType == 'mer' || unitMoveType == 'cab' || unitMoveType == 'mix') {
        if (!tileFlags.includes('river_') && !tileFlags.includes('navig_')) {
            moveCost = 999;
        }
    }
    // verif cabbotage ???
    if (unitMoveType == 'cab') {
        if (ter[terrainIndex].innondation > 100) {
            moveCost = 999;
        }
    }
    // verif earth for others
    let uia = pop[unitIndex].innondAdj;
    if (ter[terrainIndex].innondation > 100-(Math.round(uia/2)) && ter[terrainIndex].innondation > 70) {
        if (unitMoveType != 'mer' && unitMoveType != 'cab' && unitMoveType != 'mix') {
            moveCost = 999;
        }
    }
    return moveCost;
};
function isAdjacent(myTileId, thatTileId) {
    let myTileIndex = world.findIndex((obj => obj.id == myTileId));
    let myTileX = world[myTileIndex].x;
    let myTileY = world[myTileIndex].y;
    let thatTileIndex = world.findIndex((obj => obj.id == thatTileId));
    let thatTileX = world[thatTileIndex].x;
    let thatTileY = world[thatTileIndex].y;
    if (thatTileX == myTileX+1 || thatTileX == myTileX || thatTileX == myTileX-1) {
        if (thatTileY == myTileY+1 || thatTileY == myTileY || thatTileY == myTileY-1) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
function isDiag(myTileId, thatTileId) {
    let diag = false;
    let myTileIndex = world.findIndex((obj => obj.id == myTileId));
    let myTileX = world[myTileIndex].x;
    let myTileY = world[myTileIndex].y;
    let thatTileIndex = world.findIndex((obj => obj.id == thatTileId));
    let thatTileX = world[thatTileIndex].x;
    let thatTileY = world[thatTileIndex].y;
    let tot = 0;
    if (thatTileX == myTileX+1 || thatTileX == myTileX-1) {
        tot = tot+1;
    }
    if (thatTileY == myTileY+1 || thatTileY == myTileY-1) {
        tot = tot+1;
    }
    if (tot >= 2) {
        diag = true;
    }
    return diag;
};
