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
    unitsCRUDbuttons();
};
function unitsCRUDbuttons() {
    let options = [];
    options = fieldOptions('skills');
    $('#selectSkills').empty();
    $('#selectSkills').append('<option value="" selected>tous</option>');
    options.forEach(function(option) {
        $('#selectSkills').append('<option value="'+option.value+'">'+option.value+'</option>');
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
function tableShowUnitsSelect(select) {
    tableShowUnits(select.name,select.value);
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
        newValue = prompt(unit.type+' : '+field,unitTypes[unitIndex][field]);
        if (newValue == '' || newValue === null) {
            ok = false;
        } else {
            newValue = newValue.trim().toLowerCase();
        }
    } else {
        let minMax = '';
        if (min > Number.NEGATIVE_INFINITY && max < Number.POSITIVE_INFINITY) {
            minMax = ' ('+min+'-'+max+')';
        }
        newValue = Number(prompt(unit.type+' : '+field+minMax,unitTypes[unitIndex][field]));
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
    let options = fieldOptions(field);
    numOpt = options.length;
    if (options.length > 1) {
        if (field == 'skills' || field == 'categorie') {
            unitCheckboxEdit(field,unitId,options);
            return;
        } else {
            unitSelectEdit(field,unitId,options);
            return;
        }
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
