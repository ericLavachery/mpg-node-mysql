function actionsButtons() {
    let buttonInfos = '';
    // EXPLORE
    if (!perso.exploredTiles.includes(selectedUnit.tileId)) {
        if (selectedUnit.move > selectedUnit.fatigue) {
            buttonInfos = 'Exploration : Rechercher les unités présentes (avec ';
            if (mode == 'g_move' && selectedUnit.follow >= 1) {
                buttonInfos = buttonInfos+'le GROUPE '+selectedUnit.follow+')';
            } else {
                buttonInfos = buttonInfos+selectedUnit.number+' '+selectedUnit.type+')';
            }
            $('#tileUnitList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="explore" onclick="explore(false)"><i class="far fa-eye"></i></button><span class="butSpace"></span>');
        } else {
            buttonInfos = "Exploration : Vous n'avez plus assez d'unités de mouvement !";
            $('#tileUnitList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="explore"><i class="far fa-eye-slash"></i></button><span class="butSpace"></span>');
        }
    } else {
        buttonInfos = "Exploration : Vous ne pouvez explorer qu'une seule fois par jour (par terrain) !";
        $('#tileUnitList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="explore"><i class="far fa-eye-slash"></i></button><span class="butSpace"></span>');
    }
    // IDENTIFY
    if (selectedUnit.move > selectedUnit.fatigue) {
        buttonInfos = 'Identifier les propriétaires des unités (avec ';
        buttonInfos = buttonInfos+selectedUnit.number+' '+selectedUnit.type+')';
        $('#tileUnitList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="identify" onclick="identify()"><i class="fas fa-fingerprint"></i></button><span class="butSpace"></span>');
    } else {
        buttonInfos = "Identifier : Vous n'avez plus assez d'unités de mouvement !";
        $('#tileUnitList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="identify"><i class="fas fa-fingerprint"></i></button><span class="butSpace"></span>');
    }
    // CARTO
    let ml = cartoMoveLoss();
    if (!perso.mapCarto.includes(selectedUnit.tileId)) {
        if (selectedUnit.move > selectedUnit.fatigue && selectedUnit.move*4 >= ml) {
            buttonInfos = 'Cartographier ce terrain (avec ';
            buttonInfos = buttonInfos+selectedUnit.number+' '+selectedUnit.type+' : '+Math.round(ml/10)+' mv)';
            $('#tileUnitList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="carto" onclick="cartography()"><i class="far fa-map"></i></button><span class="butSpace"></span>');
        } else {
            if (selectedUnit.move <= selectedUnit.fatigue) {
                buttonInfos = "Cartographier : Vous n'avez plus assez d'unités de mouvement !";
                $('#tileUnitList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="identify"><i class="fas fa-map"></i></button><span class="butSpace"></span>');
            } else {
                buttonInfos = "Cartographier : Vous manquez d'unités ("+Math.round(ml/10)+" mv) !";
                $('#tileUnitList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="identify"><i class="fas fa-map"></i></button><span class="butSpace"></span>');
            }
        }
    } else {
        buttonInfos = "Ce terrain est déjà cartographié !";
        $('#tileUnitList').append('<button type="button" class="iconButtons" title="'+buttonInfos+'" id="identify"><i class="fas fa-map-marked-alt"></i></button><span class="butSpace"></span>');
    }
    // ATTACK
    $('#tileUnitList').append('<button type="button" class="iconButtons" title="Attaquer" id="attack" onclick="attack('+selectedUnit.id+')"><i class="fas fa-haykal"></i></button><span class="butSpace"></span>');
    // GUARD
    $('#tileUnitList').append('<button type="button" class="iconButtons" title="Garder" id="guard" onclick="guard('+selectedUnit.id+')"><i class="fas fa-shield-alt"></i></button><span class="butSpace"></span>');
    // EAT
    $('#tileUnitList').append('<button type="button" class="iconButtons" title="Manger" id="eat" onclick="eat('+selectedUnit.id+')"><i class="fas fa-drumstick-bite"></i></button>');
};
