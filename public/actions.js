function actionsButtons() {
    // EXPLORE
    let buttonInfos = 'Explore : Search whole area for units (with ';
    if (mode == 'g_move' && selectedUnit.follow >= 1) {
        buttonInfos = buttonInfos+'GROUP '+selectedUnit.follow+')';
    } else {
        buttonInfos = buttonInfos+selectedUnit.number+' '+selectedUnit.type+')';
    }
    $('#tileUnitList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="explore" onclick="explore()"><i class="far fa-eye"></i></button>');
    // IDENTIFY
    $('#tileUnitList').append('<button type="button" class="iconButtons" title="Identify units owners" id="identify" onclick="identify('+selectedUnit.id+')"><i class="fas fa-fingerprint"></i></button>');
    // ATTACK
    $('#tileUnitList').append('<button type="button" class="iconButtons" title="Attack" id="attack" onclick="attack('+selectedUnit.id+')"><i class="fas fa-haykal"></i></button>');
    // GUARD
    $('#tileUnitList').append('<button type="button" class="iconButtons" title="Guard" id="guard" onclick="guard('+selectedUnit.id+')"><i class="fas fa-shield-alt"></i></button>');
    // EAT
    $('#tileUnitList').append('<button type="button" class="iconButtons" title="Eat" id="eat" onclick="eat('+selectedUnit.id+')"><i class="fas fa-drumstick-bite"></i></button>');
};
function explore() {
    // manque : perte de move / jet de détection
    let tileId = selectedUnit.tileId;
    let unitView = perso.unitView;
    let bldView = perso.bldView;
    let new_unitView = [];
    let new_bldView = [];
    // détecte les unités sur place
    let otherPopHere = _.filter(pop, function(unit) {
        return (unit.tileId == tileId && unit.player !== pseudo);
    });
    otherPopHere.forEach(function(unit) {
        if (unit.cat == 'bld' || unit.cat == 'bsp') {
            new_bldView.push(unit.id);
        } else {
            new_unitView.push(unit.id);
        }
    });
    // rajoute les unités détectées dans la liste (sauf celles qui y sont déjà)
    if (unitView === null) {
        unitView = new_unitView;
    } else {
        for (var i = 0; i < new_unitView.length; i++) {
            if (!unitView.includes(new_unitView[i])) {
                unitView.push(new_unitView[i]);
            }
        }
    }
    if (bldView === null) {
        bldView = new_bldView;
    } else {
        for (var i = 0; i < new_bldView.length; i++) {
            if (!bldView.includes(new_bldView[i])) {
                bldView.push(new_bldView[i]);
            }
        }
    }
    perso.unitView = unitView;
    perso.bldView = bldView;
    showTileUnitList(tileId);
};
function identify() {

};
function attack() {

};
function guard() {

};
function eat() {

};
