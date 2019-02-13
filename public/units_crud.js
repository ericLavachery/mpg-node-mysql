function unitsCRUD() {
    $('#unitsTable').empty();
    $('#unitsTable').append('<tr id="uTableFieldsRow"></tr>');
    Object.keys(unitTypes[0]).forEach(function(key,index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        $('#uTableFieldsRow').append('<td class="colTitle">'+key+'</td>');
    });
    let rowStyle = 0;
    let rowClass = 'colData';
    let sortedUnits = _.sortBy(unitTypes,'type');
    sortedUnits.forEach(function(unit) {
        rowStyle = rowStyle+1;
        rowClass = 'colData';
        if (rowStyle > 1) {
            rowStyle = 0;
            rowClass = 'colDataBG';
        }
        $('#unitsTable').append('<tr id="uTableValues'+unit.id+'"></tr>');
        Object.keys(unitTypes[0]).forEach(function(key,index) {
            $('#uTableValues'+unit.id).append('<td class="'+rowClass+' klik" onclick="unitEdit(`'+key+'`,`'+unit.id+'`)">'+unit[key]+'</td>');
        });
    });
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
    }
};
