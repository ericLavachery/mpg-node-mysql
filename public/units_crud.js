function unitsCRUD() {
    $('#unitsTable').empty();
    $('#unitsTable').append('<tr id="uTableFieldsRow"></tr>');
    Object.keys(unitTypes[0]).forEach(function(key,index) {
        if (!fieldsOut.includes(key)) {
            $('#uTableFieldsRow').append('<td class="colTitle klik" title="retirer '+key+' du tableau" onclick="removeField(`'+key+'`)">'+key+'</td>');
        }
    });
    let rowStyle = 0;
    let rowClass = 'colData';
    let sortedUnits = _.sortBy(unitTypes,'type');
    sortedUnits.forEach(function(unit) {
        if (!unitsOut.includes(unit.id)) {
            rowStyle = rowStyle+1;
            rowClass = 'colData';
            if (rowStyle > 1) {
                rowStyle = 0;
                rowClass = 'colDataBG';
            }
            $('#unitsTable').append('<tr id="uTableValues'+unit.id+'"></tr>');
            Object.keys(unitTypes[0]).forEach(function(key,index) {
                if (!fieldsOut.includes(key)) {
                    $('#uTableValues'+unit.id).append('<td class="'+rowClass+' klik" title="'+unit.type+' : '+key+'" onclick="unitEdit(`'+key+'`,`'+unit.id+'`)">'+unit[key]+'</td>');
                }
            });
        }
    });
};
function toggleAddReplace() {
    if (filterAddMode) {
        filterAddMode = false;
        $('#arToggle').empty().append('Remplacer');
    } else {
        filterAddMode = true;
        $('#arToggle').empty().append('Ajouter');
    }
};
function tableShowAllUnits() {
    unitsOut = [];
    unitsCRUD();
};
function tableShowUnits(field,value) {
    if (!filterAddMode) {
        unitsOut = [];
    }
    let filterUT = _.filter(unitTypes, function(unit) {
        return (!unit[field].includes(value));
    });
    filterUT.forEach(function(unit) {
        if (!unitsOut.includes(unit.id)) {
            unitsOut.push(unit.id);
        }
    });
    unitsCRUD();
};
function removeField(field) {
    fieldsOut.push(field);
    unitsCRUD();
};
function showAllFields() {
    // let fieldIn = ['id','type','typeSing','genre','cat','illu','attitude','appui','hp','stature','nature','domaine','categorie','armure','esquive','parade','ammo','rapidite','actions','portee','prec','puissance','maxCibles','penetration','degatsSurNatures','degatsSurDomaines','combatBoost','endurance','moral','loyaute','org','move','moveType','vegetAdj','escarpAdj','innondAdj','contenu','fardeau','charge','enk','detection','discretion','skills'];
    fieldsOut = ['coverAdj','moveAdj'];
    unitsCRUD();
};
function showBaseFields() {
    fieldsOut = ['coverAdj','moveAdj'];
    let fieldIn = ['id','type','typeSing','genre','cat','illu','attitude','appui','stature','nature','domaine','categorie','portee','combatBoost','moral','loyaute','org','moveType','enk','detection','discretion','skills'];
    Object.keys(unitTypes[0]).forEach(function(key,index) {
        if (!fieldIn.includes(key)) {
            fieldsOut.push(key);
        }
    });
    unitsCRUD();
};
function showCombatFields() {
    fieldsOut = ['coverAdj','moveAdj'];
    let fieldIn = ['id','type','genre','cat','attitude','appui','hp','stature','nature','domaine','armure','esquive','parade','ammo','rapidite','actions','portee','prec','puissance','maxCibles','penetration','degatsSurNatures','degatsSurDomaines','combatBoost','endurance','moral','loyaute','org','skills'];
    Object.keys(unitTypes[0]).forEach(function(key,index) {
        if (!fieldIn.includes(key)) {
            fieldsOut.push(key);
        }
    });
    unitsCRUD();
};
function showMoveFields() {
    fieldsOut = ['coverAdj','moveAdj'];
    let fieldIn = ['id','type','genre','cat','rapidite','endurance','move','moveType','vegetAdj','escarpAdj','innondAdj','contenu','fardeau','charge','enk','detection','discretion','skills'];
    Object.keys(unitTypes[0]).forEach(function(key,index) {
        if (!fieldIn.includes(key)) {
            fieldsOut.push(key);
        }
    });
    unitsCRUD();
};
function unitPromptEdit(field,unitId,number,min,max) {
    let ok = true;
    let unitIndex = unitTypes.findIndex((obj => obj.id == unitId));
    let unit = unitTypes[unitIndex];
    let newValue;
    if (!number) {
        newValue = prompt(field+' : ',unitTypes[unitIndex][field]);
        if (newValue == '' || newValue === null) {
            ok = false;
        } else {
            newValue = newValue.trim().toLowerCase();
        }
    } else {
        let minMax = '';
        if (min > Number.NEGATIVE_INFINITY && max < Number.POSITIVE_INFINITY) {
            minMax = '('+min+'-'+max+')';
        }
        newValue = Number(prompt(field+' : '+minMax,unitTypes[unitIndex][field]));
        if (newValue == '' || newValue === null) {
            ok = false;
        } else if (newValue > max || newValue < min) {
            ok = false;
            alert('INVALIDE : doit être compris entre '+min+' et '+max+' !!');
        }
    }
    if (ok) {
        if (unitTypes[unitIndex][field] != newValue) {
            unitTypes[unitIndex][field] = newValue;
            emitSingleChange(unitId,'unitTypes',field,newValue);
            unitsCRUD();
        }
    }
};
function unitCheckboxEdit(field,unitId,options) {
    let unitIndex = unitTypes.findIndex((obj => obj.id == unitId));
    let unit = unitTypes[unitIndex];
    let sel = '';
    $('#modalHead').empty().append(unit.typeSing+' : '+field);
    $('#modalFoot').empty();
    $('#modalBody').empty().append('<form id="'+field+'"></form>');
    let i = 0;
    options.forEach(function(option) {
        if (unit[field].includes(option.value+'_')) {sel = ' checked';} else {sel = '';}
        $('#'+field).append('<input type="checkbox" name="box'+i+'" value="'+option.value+'"'+sel+'> '+option.show+'<br>');
        i++;
    });
    $('#'+field).append('<br><button class="boutonVert" name="'+unit.id+'" type="button" id="'+field+'" onclick="unitCheckboxOut(this)">ok</button>');
    modal.style.display = "block";
};
function unitCheckboxOut(select) {
    let unitId = Number(select.name);
    let unitIndex = unitTypes.findIndex((obj => obj.id == unitId));
    let newValue = '';
    let field = select.id;
    let i = 0;
    while (i < numOpt) {
        if (select.form[i].checked) {
            console.log(select.form[i].value);
            newValue = newValue+select.form[i].value+'_'
        }
        i++;
    }
    unitTypes[unitIndex][field] = newValue;
    emitSingleChange(unitId,'unitTypes',field,newValue);
    modal.style.display = "none";
    unitsCRUD();
};
function unitSelectEdit(field,unitId,options) {
    let unitIndex = unitTypes.findIndex((obj => obj.id == unitId));
    let unit = unitTypes[unitIndex];
    let sel = '';
    $('#modalHead').empty().append(unit.typeSing+' : '+field);
    $('#modalFoot').empty();
    $('#modalBody').empty().append('<select class="boutonVert" name="'+unitId+'" id="'+field+'" onchange="unitSelectOut(this);"><option value="" selected>&nbsp;</option></select>');
    options.forEach(function(option) {
        if (unit[field] == option.value) {sel = ' selected';} else {sel = '';}
        $('#'+field).append('<option value="'+option.value+'"'+sel+'>&nbsp;'+option.show+'</option>');
    });
    modal.style.display = "block";
};
function unitSelectOut(select) {
    let unitId = Number(select.name);
    let unitIndex = unitTypes.findIndex((obj => obj.id == unitId));
    let newValue = select.value;
    let field = select.id;
    unitTypes[unitIndex][field] = newValue;
    emitSingleChange(unitId,'unitTypes',field,newValue);
    modal.style.display = "none";
    unitsCRUD();
};
function unitEdit(field,unitId) {
    // quel type d'edit pour chaque champ?
    let options = [];
    let newOpt = {};
    if (field == 'skills') {
        newOpt = {};
        newOpt.value = 'explo';
        newOpt.show = newOpt.value+'&nbsp; (explorateur)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'carto';
        newOpt.show = newOpt.value+'&nbsp; (cartographe)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'info';
        newOpt.show = newOpt.value+'&nbsp; (informateur)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'spy';
        newOpt.show = newOpt.value+'&nbsp; (espion)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'cland';
        newOpt.show = newOpt.value+'&nbsp; (clandestin)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'regu';
        newOpt.show = newOpt.value+'&nbsp; (armée régulière)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'shield';
        newOpt.show = newOpt.value+'&nbsp; (bouclier)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'shpar';
        newOpt.show = newOpt.value+'&nbsp; (parable seulement avec un bouclier)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'nopar';
        newOpt.show = newOpt.value+'&nbsp; (imparable)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'noesq';
        newOpt.show = newOpt.value+'&nbsp; (inesquivable)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'crit';
        newOpt.show = newOpt.value+'&nbsp; (coups critiques)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'noemb';
        newOpt.show = newOpt.value+'&nbsp; (pas de tir embarqué)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'insub';
        newOpt.show = newOpt.value+'&nbsp; (insubbordoné)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'medic';
        newOpt.show = newOpt.value+'&nbsp; (médecin de combat)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'armarch';
        newOpt.show = newOpt.value+'&nbsp; (arrêt marchand)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'chefchan';
        newOpt.show = newOpt.value+'&nbsp; (chef de chantier)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'produc';
        newOpt.show = newOpt.value+'&nbsp; (producteur ou récolteur)';
        options.push(newOpt);
        numOpt = 17;
        unitCheckboxEdit(field,unitId,options);
        return;
    }
    if (field == 'categorie') {
        newOpt = {};
        newOpt.value = 'civil';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'soldat';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'mage';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'religieux';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'chef';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'hll';
        newOpt.show = newOpt.value+'&nbsp; (hors-la-loi)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'espion';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'milice';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'pv';
        newOpt.show = newOpt.value+'&nbsp; (peau verte)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'orc';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'gobelin';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'nain';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'elfe';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'barbare';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'marin';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'archer';
        newOpt.show = newOpt.value+'&nbsp; (ou autre arme à distance)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'garde';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'ugenie';
        newOpt.show = newOpt.value+'&nbsp; (unité de génie)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'mortv';
        newOpt.show = newOpt.value+'&nbsp; (mort-vivant)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'batciv';
        newOpt.show = newOpt.value+'&nbsp; (bâtiment civil)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'batmil';
        newOpt.show = newOpt.value+'&nbsp; (bâtiment militaire)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'fortif';
        newOpt.show = newOpt.value+'&nbsp; (fortification)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'fdc';
        newOpt.show = newOpt.value+'&nbsp; (feu de camp)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'produc';
        newOpt.show = newOpt.value+'&nbsp; (producteur ou récolteur)';
        options.push(newOpt);
        numOpt = 24;
        unitCheckboxEdit(field,unitId,options);
        return;
    }
    if (field == 'genre') {
        newOpt = {};
        newOpt.value = 'unité';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'ressource';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'coffre';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        unitSelectEdit(field,unitId,options);
        return;
    }
    if (field == 'cat') {
        newOpt = {};
        newOpt.value = 'res';
        newOpt.show = newOpt.value+'&nbsp; (ressource)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'wrk';
        newOpt.show = newOpt.value+'&nbsp; (travailleur)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'spy';
        newOpt.show = newOpt.value+'&nbsp; (espion)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'sld';
        newOpt.show = newOpt.value+'&nbsp; (soldat)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'shp';
        newOpt.show = newOpt.value+'&nbsp; (navire)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'bsp';
        newOpt.show = newOpt.value+'&nbsp; (bâtiment furtif)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'bld';
        newOpt.show = newOpt.value+'&nbsp; (bâtiment)';
        options.push(newOpt);
        unitSelectEdit(field,unitId,options);
        return;
    }
    if (field == 'attitude') {
        newOpt = {};
        newOpt.value = 'at';
        newOpt.show = newOpt.value+'&nbsp; (attaque)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'ass';
        newOpt.show = newOpt.value+'&nbsp; (attaque sauf suicide)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'af';
        newOpt.show = newOpt.value+'&nbsp; (attaque faibles)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'amn';
        newOpt.show = newOpt.value+'&nbsp; (attaque moins nombreux)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'd';
        newOpt.show = newOpt.value+'&nbsp; (fuite ou défense)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'f';
        newOpt.show = newOpt.value+'&nbsp; (fuite ou rédition)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'i';
        newOpt.show = newOpt.value+'&nbsp; (sans objet)';
        options.push(newOpt);
        unitSelectEdit(field,unitId,options);
        return;
    }
    if (field == 'appui') {
        newOpt = {};
        newOpt.value = 0;
        newOpt.show = newOpt.value+'&nbsp; (mêlée)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 1;
        newOpt.show = newOpt.value+'&nbsp; (portée 1)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 2;
        newOpt.show = newOpt.value+'&nbsp; (portée 2+)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 3;
        newOpt.show = newOpt.value+'&nbsp; (petits chefs, éclaireurs, civils)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 4;
        newOpt.show = newOpt.value+'&nbsp; (chefs et autres unités très importantes)';
        options.push(newOpt);
        unitSelectEdit(field,unitId,options);
        return;
    }
    if (field == 'stature') {
        newOpt = {};
        newOpt.value = 1;
        newOpt.show = newOpt.value+'&nbsp; (pixie)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 2;
        newOpt.show = newOpt.value+'&nbsp; (gobelin)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 3;
        newOpt.show = newOpt.value+'&nbsp; (humain)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 4;
        newOpt.show = newOpt.value+'&nbsp; (orc)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 5;
        newOpt.show = newOpt.value+'&nbsp; (ogre)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 6;
        newOpt.show = newOpt.value+'&nbsp; (géants)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 7;
        newOpt.show = newOpt.value+'&nbsp; (mumakil)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 8;
        newOpt.show = newOpt.value+'&nbsp; (kraken)';
        options.push(newOpt);
        unitSelectEdit(field,unitId,options);
        return;
    }
    if (field == 'nature') {
        newOpt = {};
        newOpt.value = 'Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mécanique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Magique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Spécial';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        unitSelectEdit(field,unitId,options);
        return;
    }
    if (field == 'domaine') {
        newOpt = {};
        newOpt.value = 'Terrestre';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Marin';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Volant';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        unitSelectEdit(field,unitId,options);
        return;
    }
    if (field == 'portee') {
        newOpt = {};
        newOpt.value = 0;
        newOpt.show = newOpt.value+'&nbsp; (mêlée)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 1;
        newOpt.show = newOpt.value+'&nbsp; (javelots)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 2;
        newOpt.show = newOpt.value+'&nbsp; (arcs)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 3;
        newOpt.show = newOpt.value+'&nbsp; (arcs longs)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 4;
        newOpt.show = newOpt.value+'&nbsp; (engins)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 5;
        newOpt.show = newOpt.value+'&nbsp; (engins)';
        options.push(newOpt);
        unitSelectEdit(field,unitId,options);
        return;
    }
    if (field == 'moveType') {
        newOpt = {};
        newOpt.value = 'ter';
        newOpt.show = newOpt.value+'&nbsp; (terrestre)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'air';
        newOpt.show = newOpt.value+'&nbsp; (volant - bas)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'alt';
        newOpt.show = newOpt.value+'&nbsp; (volant - altitude)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'cab';
        newOpt.show = newOpt.value+'&nbsp; (cabbotage seulement)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'mix';
        newOpt.show = newOpt.value+'&nbsp; (moyen partout)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'mer';
        newOpt.show = newOpt.value+'&nbsp; (bonus haute mer, malus cabbotage)';
        options.push(newOpt);
        unitSelectEdit(field,unitId,options);
        return;
    }
    if (field == 'vegetAdj' || field == 'escarpAdj' || field == 'innondAdj') {
        newOpt = {};
        newOpt.value = 0;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 5;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 10;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 15;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 20;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 25;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 30;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 35;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 40;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 50;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 55;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 60;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 65;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 70;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 75;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 80;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 85;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 90;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 95;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 100;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 105;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 110;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 115;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 120;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 125;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 130;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 140;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 150;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 160;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 170;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 180;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 200;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 225;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 250;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 275;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 300;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 350;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 400;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 450;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 500;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 600;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 700;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 800;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 1000;
        newOpt.show = newOpt.value+'&nbsp; (xxxxx)';
        options.push(newOpt);
        unitSelectEdit(field,unitId,options);
        return;
    }
    if (field == 'degatsSurNatures') {
        newOpt = {};
        newOpt.value = 'Vivant';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mort';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Magique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mécanique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mort_Magique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mort_Mécanique';
        newOpt.show = newOpt.value+'&nbsp; (*) BASE';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Magique_Mécanique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mécanique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mort_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Magique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mort_Magique_Mécanique';
        newOpt.show = newOpt.value+'&nbsp; (*) +MAGIQUE';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mort_Magique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mort_Mécanique_Bâtiment';
        newOpt.show = newOpt.value+'&nbsp; (*) +BATIMENT';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Magique_Mécanique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Vivant_Mort_Magique_Mécanique_Bâtiment';
        newOpt.show = newOpt.value+'&nbsp; (*) TOUT';
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mécanique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mécanique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort_Magique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort_Mécanique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort_Magique_Mécanique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort_Magique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort_Mécanique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Mort_Magique_Mécanique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Magique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Magique_Mécanique';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Magique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Magique_Mécanique_Bâtiment';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        unitSelectEdit(field,unitId,options);
        return;
    }
    if (field == 'degatsSurDomaines') {
        newOpt = {};
        newOpt.value = 'Terrestre';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Terrestre_Marin_Volant';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Terrestre_Marin';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Marin';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Volant';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        newOpt = {};
        newOpt.value = 'Terrestre_Volant';
        newOpt.show = newOpt.value;
        options.push(newOpt);
        unitSelectEdit(field,unitId,options);
        return;
    }
    let unitIndex = unitTypes.findIndex((obj => obj.id == unitId));
    let unit = unitTypes[unitIndex];
    let min = Number.NEGATIVE_INFINITY;
    let max = Number.POSITIVE_INFINITY;
    if (field == 'endurance') {
        min = -1;
        max = 100;
    }
    if (field == 'armure') {
        min = 0;
        max = 300;
    }
    if (typeof unit[field] == 'number') {
        unitPromptEdit(field,unitId,true,min,max);
        return;
    } else if (typeof unit[field] == 'string') {
        unitPromptEdit(field,unitId,false,min,max);
        return;
    }
};
